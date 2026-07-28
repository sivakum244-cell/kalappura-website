"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Preparing payment...");

  useEffect(() => {
    const bookingId = searchParams.get("bookingId") || "";
    const amount = searchParams.get("amount") || "0";
    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    const phone = searchParams.get("phone") || "";
    const room = searchParams.get("room") || "Houseboat Booking";

    if (!bookingId || !amount) {
      setStatus("Invalid payment request");
      return;
    }

    // Get PayU form data from our API
    fetch("/api/payu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        amount,
        firstname: name,
        email,
        phone,
        productinfo: `Kalappura Houseboats - ${room}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("Redirecting to payment gateway...");
          // Create and submit form to PayU
          const form = document.createElement("form");
          form.method = "POST";
          form.action = data.payuUrl;

          Object.entries(data.payuData).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value as string;
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
        } else {
          setStatus("Payment initialization failed. Please try again.");
        }
      })
      .catch(() => {
        setStatus("Network error. Please try again.");
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-luxury text-center">
        <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
          <svg className="animate-spin w-8 h-8 text-gold-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        </div>
        <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Processing Payment</h2>
        <p className="text-gray-600 text-sm">{status}</p>
        <p className="text-xs text-gray-400 mt-4">You will be redirected to PayU secure payment page.</p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
      <PaymentContent />
    </Suspense>
  );
}
