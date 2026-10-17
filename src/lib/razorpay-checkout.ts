// ============================================================================
// Razorpay Standard Checkout — client helper
// Loads the checkout script, creates an order via our API, opens the modal,
// then verifies the signature server-side. KEY_SECRET never touches the client.
// ============================================================================

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type CheckoutArgs = {
  amount: number; // in rupees
  bookingId: string;
  roomType?: string;
  name: string;
  email?: string;
  phone?: string;
  description?: string;
  onSuccess: () => void; // called after server-side verification passes
  onFailure: (message: string) => void;
  onDismiss?: () => void;
};

// Minimal typing for the injected Razorpay global.
type RazorpayOptions = Record<string, unknown>;
type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (resp: unknown) => void) => void;
};
type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    const w = window as unknown as { Razorpay?: RazorpayConstructor };
    if (w.Razorpay) return resolve(true);
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function startRazorpayCheckout(args: CheckoutArgs): Promise<void> {
  const { amount, bookingId, roomType, name, email, phone, description, onSuccess, onFailure, onDismiss } = args;

  const ok = await loadRazorpayScript();
  if (!ok) {
    onFailure("Could not load the payment gateway. Please check your connection and try again.");
    return;
  }

  // 1) Create the order on our backend.
  let order: { order_id: string; amount: number; currency: string; keyId: string };
  try {
    const res = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, bookingId, roomType, receipt: bookingId }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.success) {
      onFailure(data?.error || "Could not start the payment. Please try again.");
      return;
    }
    order = data;
  } catch {
    onFailure("Network error starting the payment. Please try again.");
    return;
  }

  const w = window as unknown as { Razorpay: RazorpayConstructor };

  // 2) Open the Razorpay modal.
  const rzp = new w.Razorpay({
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    name: "Kalappura Houseboats",
    description: description || "Alleppey Houseboat Booking",
    order_id: order.order_id,
    prefill: {
      name: name || "",
      email: email || "",
      contact: phone || "",
    },
    notes: { bookingId },
    theme: { color: "#b8860b" },
    handler: async (response: unknown) => {
      // 3) Verify the signature server-side.
      const r = response as RazorpaySuccess;
      try {
        const verifyRes = await fetch("/api/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: r.razorpay_order_id,
            razorpay_payment_id: r.razorpay_payment_id,
            razorpay_signature: r.razorpay_signature,
            bookingId,
          }),
        });
        const verifyData = await verifyRes.json().catch(() => ({}));
        if (verifyRes.ok && verifyData?.success) {
          onSuccess();
        } else {
          onFailure(verifyData?.error || "Payment could not be verified. If money was debited, please contact us with your Booking ID.");
        }
      } catch {
        onFailure("Payment verification failed. If money was debited, please contact us with your Booking ID.");
      }
    },
    modal: {
      ondismiss: () => {
        if (onDismiss) onDismiss();
      },
    },
  });

  // Handle explicit payment failures.
  rzp.on("payment.failed", (resp: unknown) => {
    const err = resp as { error?: { description?: string } };
    onFailure(err?.error?.description || "Payment failed. Please try again.");
  });

  rzp.open();
}
