"use client";

import jsPDF from "jspdf";

interface InvoiceData {
  bookingId: string;
  guestName: string;
  mobile: string;
  email?: string;
  country?: string;
  checkIn: string;
  checkOut: string;
  eta?: string;
  roomType: string;
  numberOfRooms: number;
  adults: number;
  children: number;
  infants: number;
  packageType?: string;
  paymentPreference?: string;
  foodRequirements?: string;
  specialRequests?: string;
  additionalNotes?: string;
  status?: string;
  createdAt?: string;
}

const ROOM_NAMES: Record<string, string> = {
  "standard-cabin": "3 Bedroom Houseboat",
  "double-twin-room": "2 Bedroom Houseboat",
  "suite-river-view": "1 Bedroom Houseboat",
};

const PACKAGE_PRICES: Record<string, number> = {
  standard: 15000,
  premium: 19000,
  luxury: 24000,
};

const PACKAGE_NAMES: Record<string, string> = {
  standard: "Standard",
  premium: "Premium",
  luxury: "Semi Luxury",
};

export function generateInvoicePDF(data: InvoiceData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pw = 210; // page width
  const m = 18; // margin
  const cw = pw - m * 2; // content width
  let y = 0;

  // --- Colors ---
  const gold: [number, number, number] = [180, 142, 58];
  const darkGold: [number, number, number] = [140, 105, 30];
  const black: [number, number, number] = [20, 20, 20];
  const dark: [number, number, number] = [40, 40, 40];
  const med: [number, number, number] = [100, 100, 100];
  const light: [number, number, number] = [160, 160, 160];
  const vlight: [number, number, number] = [230, 230, 230];
  const cream: [number, number, number] = [252, 248, 240];

  // === TOP GOLD BAND ===
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 0, pw, 4, "F");

  // === HEADER SECTION ===
  y = 18;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text("KALAPPURA", m, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text("HOUSEBOATS & TOURS", m, y + 6);

  // Right side
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(darkGold[0], darkGold[1], darkGold[2]);
  doc.text("BOOKING RECEIPT", pw - m, 16, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(med[0], med[1], med[2]);
  const issueDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  doc.text(`Date: ${issueDate}`, pw - m, 22, { align: "right" });
  doc.text(`Ref: ${data.bookingId}`, pw - m, 27, { align: "right" });

  if (data.status) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    const statusColor: [number, number, number] = data.status === "Confirmed" ? [16, 185, 129] : data.status === "Cancelled" ? [239, 68, 68] : [217, 119, 6];
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.text(`Status: ${data.status.toUpperCase()}`, pw - m, 32, { align: "right" });
  }

  // === THIN GOLD LINE ===
  y = 36;
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.5);
  doc.line(m, y, pw - m, y);

  // === GUEST DETAILS ===
  y = 44;
  drawSectionHeader(doc, "GUEST INFORMATION", m, y, gold);
  y += 8;

  const guestRows = [
    ["Guest Name", data.guestName],
    ["Mobile", data.mobile],
    ["Email", data.email || "Not provided"],
    ["Country", data.country || "India"],
  ];
  y = drawTable(doc, guestRows, m, y, cw, dark, med);

  // === STAY DETAILS ===
  y += 6;
  drawSectionHeader(doc, "STAY DETAILS", m, y, gold);
  y += 8;

  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

  const formatDate = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

  const stayRows = [
    ["Check-in", `${formatDate(checkInDate)} • 12:00 PM`],
    ["Check-out", `${formatDate(checkOutDate)} • 9:00 AM`],
    ["Duration", `${nights} Night${nights > 1 ? "s" : ""}`],
    ["ETA (Arrival Time)", data.eta || "Not specified"],
    ["Houseboat", ROOM_NAMES[data.roomType] || data.roomType],
    ["No. of Rooms Booked", `${data.numberOfRooms}`],
    ["Guests", `${data.adults} Adult${data.adults > 1 ? "s" : ""}${data.children ? ` + ${data.children} Child${data.children > 1 ? "ren" : ""}` : ""}${data.infants ? ` + ${data.infants} Infant${data.infants > 1 ? "s" : ""}` : ""}`],
  ];
  y = drawTable(doc, stayRows, m, y, cw, dark, med);

  // === PACKAGE & PRICING ===
  y += 6;
  drawSectionHeader(doc, "PACKAGE & PRICING", m, y, gold);
  y += 8;

  const pkgName = data.packageType || "standard";
  const pricePerRoom = PACKAGE_PRICES[pkgName] || 15000;
  const displayPkg = PACKAGE_NAMES[pkgName] || "Standard";

  const roomTotal = pricePerRoom * data.numberOfRooms * nights;
  const childrenCharge = data.children * 1000 * nights;
  const subtotal = roomTotal + childrenCharge;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;
  const advance = Math.round(grandTotal * 0.2);
  const balance = grandTotal - advance;

  // Pricing box background
  doc.setFillColor(cream[0], cream[1], cream[2]);
  const boxH = data.paymentPreference === "pay-at-property" ? 62 : 50;
  doc.roundedRect(m, y - 2, cw, boxH, 2, 2, "F");
  doc.setDrawColor(vlight[0], vlight[1], vlight[2]);
  doc.roundedRect(m, y - 2, cw, boxH, 2, 2, "S");

  const px = m + 6;
  const prw = cw - 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text(`Package: ${displayPkg}`, px, y + 4);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(med[0], med[1], med[2]);
  doc.text(`₹${pricePerRoom.toLocaleString("en-IN")} × ${data.numberOfRooms} room${data.numberOfRooms > 1 ? "s" : ""} × ${nights} night${nights > 1 ? "s" : ""}`, px, y + 10);

  let py = y + 17;

  // Line items
  drawPriceLine(doc, px, py, prw, "Room Charges", `₹${roomTotal.toLocaleString("en-IN")}`, dark, med);
  py += 6;
  if (childrenCharge > 0) {
    drawPriceLine(doc, px, py, prw, `Children (${data.children} × ₹1,000 × ${nights} night${nights > 1 ? "s" : ""})`, `₹${childrenCharge.toLocaleString("en-IN")}`, dark, med);
    py += 6;
  }
  drawPriceLine(doc, px, py, prw, "GST (18%)", `₹${gst.toLocaleString("en-IN")}`, dark, med);
  py += 3;

  // Divider
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.3);
  doc.line(px, py, px + prw, py);
  py += 5;

  // Grand total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(black[0], black[1], black[2]);
  doc.text("TOTAL", px, py);
  doc.text(`₹${grandTotal.toLocaleString("en-IN")}`, px + prw, py, { align: "right" });
  py += 7;

  // Payment breakdown
  if (data.paymentPreference === "pay-at-property") {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(16, 185, 129);
    doc.text(`Advance (20%): ₹${advance.toLocaleString("en-IN")}`, px, py);
    doc.setTextColor(217, 119, 6);
    doc.text(`Balance at Property: ₹${balance.toLocaleString("en-IN")}`, px + prw / 2, py);
  }

  y += boxH + 4;

  // === PAYMENT MODE ===
  y += 4;
  drawSectionHeader(doc, "PAYMENT", m, y, gold);
  y += 8;

  const paymentMode =
    data.paymentPreference === "online-payment" ? "Full Online Payment"
    : data.paymentPreference === "bank-transfer" ? "Bank Transfer"
    : "20% Advance Online + Balance at Property";

  const payRows = [
    ["Payment Mode", paymentMode],
    ["Total Amount", `₹${grandTotal.toLocaleString("en-IN")} (incl. 18% GST)`],
    ["Advance (20%)", `₹${advance.toLocaleString("en-IN")}`],
    ["Balance at Property", `₹${balance.toLocaleString("en-IN")}`],
  ];
  if (data.paymentPreference === "online-payment") {
    // Full payment - remove advance/balance lines
    payRows.splice(2, 2);
    payRows.push(["Amount Paid", `₹${grandTotal.toLocaleString("en-IN")}`]);
  } else if (data.paymentPreference === "bank-transfer") {
    payRows.splice(2, 2);
  }
  y = drawTable(doc, payRows, m, y, cw, dark, med);

  // === FOOD & SPECIAL REQUESTS ===
  if (data.foodRequirements || data.specialRequests || data.additionalNotes) {
    y += 6;
    drawSectionHeader(doc, "PREFERENCES & REQUESTS", m, y, gold);
    y += 8;

    const prefRows: string[][] = [];
    if (data.foodRequirements) prefRows.push(["Food Preferences", data.foodRequirements]);
    if (data.specialRequests) prefRows.push(["Special Requests", data.specialRequests]);
    if (data.additionalNotes) prefRows.push(["Additional Notes", data.additionalNotes]);
    y = drawTable(doc, prefRows, m, y, cw, dark, med);
  }

  // === WHAT'S INCLUDED ===
  y += 6;

  // Check if we have space — if not, move footer down or shorten inclusions
  const spaceLeft = 265 - y;
  if (spaceLeft > 50) {
    drawSectionHeader(doc, "INCLUDED IN YOUR STAY", m, y, gold);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    const inclusions = [
      "Overnight backwater cruise (12 PM – 9 AM next day)",
      "All meals: Lunch, Tea & Snacks, Dinner, Breakfast",
      "Air-conditioned bedroom(s) • Private bathroom",
      "Onboard crew: Captain, Chef, Helper",
      "Cruise: Vembanad Lake & village canals",
      "Free parking • Free cancellation (7 days prior)",
    ];
    inclusions.forEach((item) => {
      if (y < 262) {
        doc.text(`•  ${item}`, m + 2, y);
        y += 5;
      }
    });
  }

  // === FOOTER ===
  const footerY = Math.max(y + 8, 272);
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.5);
  doc.line(m, footerY, pw - m, footerY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text("Kalappura Houseboats & Tours", m, footerY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(med[0], med[1], med[2]);
  doc.text("Mullackal Ward, Iron Bridge P.O, Thirumala East Gate Road, Alleppey, Kerala 688011, India", m, footerY + 9);
  doc.text("Phone: +91 98950 53528  •  Email: info@alleppeyhouseboat.online  •  Web: alleppeyhouseboat.online", m, footerY + 13);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text("Thank you for choosing Kalappura Houseboats. We look forward to welcoming you aboard.", pw - m, footerY + 5, { align: "right" });

  // === BOTTOM GOLD BAND ===
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 293, pw, 4, "F");

  return doc;
}

// --- Helper: Section Header ---
function drawSectionHeader(doc: jsPDF, text: string, x: number, y: number, color: [number, number, number]) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(color[0], color[1], color[2]);
  doc.text(text, x, y);
  // Underline
  const tw = doc.getTextWidth(text);
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(0.3);
  doc.line(x, y + 1, x + tw, y + 1);
}

// --- Helper: Draw table rows ---
function drawTable(doc: jsPDF, rows: string[][], x: number, y: number, width: number, darkColor: [number, number, number], medColor: [number, number, number]): number {
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(medColor[0], medColor[1], medColor[2]);
    doc.text(label, x, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    // Wrap long values
    const maxValueWidth = width - 55;
    const lines = doc.splitTextToSize(value, maxValueWidth);
    doc.text(lines, x + 55, y);
    y += Math.max(6, lines.length * 5);
  });
  return y;
}

// --- Helper: Price line ---
function drawPriceLine(doc: jsPDF, x: number, y: number, width: number, label: string, value: string, darkColor: [number, number, number], medColor: [number, number, number]) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(medColor[0], medColor[1], medColor[2]);
  doc.text(label, x, y);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(value, x + width, y, { align: "right" });
}

export function downloadInvoice(data: InvoiceData) {
  const doc = generateInvoicePDF(data);
  doc.save(`Kalappura-Receipt-${data.bookingId}.pdf`);
}
