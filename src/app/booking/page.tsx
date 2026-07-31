"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ROOMS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room") || "standard-cabin";
  const selectedRoom = ROOMS.find((r) => r.id === roomId) || ROOMS[0];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    guestName: "",
    mobile: "",
    email: "",
    country: "India",
    checkIn: "",
    checkOut: "",
    eta: "",
    adults: 2,
    children: 0,
    infants: 0,
    roomType: selectedRoom.id,
    numberOfRooms: 1,
    packageType: "standard",
    foodRequirements: [] as string[],
    foodAllergyDetails: "",
    specialRequests: [] as string[],
    additionalNotes: "",
    paymentPreference: "pay-at-property",
    termsAccepted: false,
    extraBed: 0,
  });

  const updateForm = (field: string, value: string | number | boolean | string[]) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-reset room type when PAX changes and current selection becomes unavailable
      if (field === "adults") {
        const pax = value as number;
        if (pax >= 4 && prev.roomType !== "standard-cabin") {
          updated.roomType = "standard-cabin";
          updated.numberOfRooms = 1;
        } else if (pax === 3 && prev.roomType === "suite-river-view") {
          updated.roomType = "standard-cabin";
          updated.numberOfRooms = 1;
        }
      }
      
      // Auto-reset numberOfRooms when room type changes
      if (field === "roomType") {
        const maxRooms = value === "standard-cabin" ? 3 : value === "double-twin-room" ? 2 : 1;
        if (prev.numberOfRooms > maxRooms) {
          updated.numberOfRooms = 1;
        }
      }
      
      return updated;
    });
    setError("");
  };

  const toggleCheckbox = (field: "foodRequirements" | "specialRequests", value: string) => {
    setFormData((prev) => {
      const arr = prev[field];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter((v) => v !== value) };
      }
      return { ...prev, [field]: [...arr, value] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Client-side validation
    if (!formData.guestName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }
    if (!formData.checkIn) {
      setError("Please select a check-in date.");
      return;
    }
    if (!formData.checkOut) {
      setError("Please select a check-out date.");
      return;
    }
    if (!formData.termsAccepted) {
      setError("Please accept the terms & conditions to proceed.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({ success: false, error: `Server error (${response.status})` }));

      if (result.success) {
        // Send email in background (don't wait for it)
        fetch("/api/send-booking-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: result.bookingId,
            guestName: formData.guestName,
            mobile: formData.mobile,
            email: formData.email,
            country: formData.country,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            eta: formData.eta,
            adults: formData.adults,
            children: formData.children,
            infants: formData.infants,
            roomType: formData.roomType,
            numberOfRooms: formData.numberOfRooms,
            foodRequirements: Array.isArray(formData.foodRequirements) ? formData.foodRequirements.join(", ") : "",
            specialRequests: Array.isArray(formData.specialRequests) ? formData.specialRequests.join(", ") : "",
            additionalNotes: formData.additionalNotes,
            paymentPreference: formData.paymentPreference,
          }),
        }).catch(() => {}); // Fire and forget
        
        // If online payment selected, redirect to PayU
        if (formData.paymentPreference === "online-payment") {
          const currentRoom = ROOMS.find(r => r.id === formData.roomType) || selectedRoom;
          const roomRate = currentRoom.price * formData.numberOfRooms;
          const packageExtra = formData.packageType === "premium" ? 1500 * formData.numberOfRooms : formData.packageType === "luxury" ? 2500 * formData.numberOfRooms : 0;
          const childrenCharge = formData.children * 1000;
          const extraBedCharge = formData.extraBed * 1000;
          const subtotal = roomRate + packageExtra + childrenCharge + extraBedCharge;
          const gst = Math.round(subtotal * 0.18);
          const total = subtotal + gst;

          router.push(`/payment?bookingId=${result.bookingId}&amount=${total}&name=${encodeURIComponent(formData.guestName)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.mobile)}&room=${encodeURIComponent(currentRoom.name)}`);
        } else if (formData.paymentPreference === "pay-at-property") {
          // 20% advance payment via PayU
          const currentRoom = ROOMS.find(r => r.id === formData.roomType) || selectedRoom;
          const roomRate = currentRoom.price * formData.numberOfRooms;
          const packageExtra = formData.packageType === "premium" ? 1500 * formData.numberOfRooms : formData.packageType === "luxury" ? 2500 * formData.numberOfRooms : 0;
          const childrenCharge = formData.children * 1000;
          const extraBedCharge = formData.extraBed * 1000;
          const subtotal = roomRate + packageExtra + childrenCharge + extraBedCharge;
          const gst = Math.round(subtotal * 0.18);
          const total = subtotal + gst;
          const advance = Math.round(total * 0.2); // 20% advance

          router.push(`/payment?bookingId=${result.bookingId}&amount=${advance}&name=${encodeURIComponent(formData.guestName)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.mobile)}&room=${encodeURIComponent(currentRoom.name)}&type=advance`);
        } else {
          // Bank transfer - go to success page
          router.push(`/booking/success?id=${result.bookingId}`);
        }
      } else {
        if (result.details) {
          const firstError = Object.values(result.details).flat()[0];
          setError(String(firstError) || "Please check your form and try again.");
        } else {
          setError(result.error || "Something went wrong. Please try again.");
        }
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const foodOptions = [
    "Vegetarian", "Non-Vegetarian", "Vegan", "Jain Food", "Halal",
    "Seafood", "No Spicy Food", "Medium Spicy", "Extra Spicy",
    "No Dairy", "No Sugar", "Food Allergies (Specify)",
  ];

  const activityOptions = [
    "Honeymoon Decoration", "Birthday / Anniversary Celebration",
    "Candlelight Dinner", "Country Boat Ride", "Other Requests",
  ];

  const paymentOptions = [
    { id: "pay-at-property", name: "20% Advance + Balance at Property", desc: "Pay 20% now, remaining at check-in", icon: "🏨" },
    { id: "online-payment", name: "Full Online Payment", desc: "UPI / Cards / Net Banking", icon: "💳" },
    { id: "bank-transfer", name: "Bank Transfer", desc: "NEFT / IMPS / RTGS", icon: "🏦" },
  ];

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/#rooms" className="flex items-center gap-2 text-gray-700 hover:text-gold-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-sm text-gray-600">Secure Booking</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Fill in your details to reserve your houseboat experience</p>
        </motion.div>

        {/* Error Banner */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
            </svg>
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-100 space-y-8">

            {/* 1. Guest Information */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-bold">1</span>
                Guest Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Guest Name *</label>
                  <input type="text" value={formData.guestName} onChange={(e) => updateForm("guestName", e.target.value)}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50" placeholder="Full Name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Mobile Number *</label>
                  <input type="tel" value={formData.mobile} onChange={(e) => updateForm("mobile", e.target.value)}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50" placeholder="+91 98950 53528" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50" placeholder="email@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <select value={formData.country} onChange={(e) => updateForm("country", e.target.value)}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none">
                    <option>India</option><option>United States</option><option>United Kingdom</option>
                    <option>Germany</option><option>Australia</option><option>Singapore</option>
                    <option>Canada</option><option>France</option><option>UAE</option><option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Stay Details */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-bold">2</span>
                Stay Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Check-in Date * 📅</label>
                  <input type="date" value={formData.checkIn} onChange={(e) => updateForm("checkIn", e.target.value)}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Check-out Date * 📅</label>
                  <input type="date" value={formData.checkOut} onChange={(e) => updateForm("checkOut", e.target.value)}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50" />
                </div>
              </div>
            </div>

            {/* 3. Number of Guests */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-bold">3</span>
                Number of Guests (PAX)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Adults *</label>
                  <select value={formData.adults} onChange={(e) => updateForm("adults", Number(e.target.value))}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none">
                    {[1,2,3,4,5,6,7,8,9,10].map((n) => (<option key={n} value={n}>{n}</option>))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Children (6–11 Years) <span className="text-xs text-gray-400">Max 2 per boat</span></label>
                  <select value={formData.children} onChange={(e) => updateForm("children", Number(e.target.value))}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none">
                    {[0,1,2].map((n) => (<option key={n} value={n}>{n}</option>))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Infants (0–5 Years)</label>
                  <select value={formData.infants} onChange={(e) => updateForm("infants", Number(e.target.value))}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none">
                    {[0,1,2,3,4].map((n) => (<option key={n} value={n}>{n}</option>))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Accommodation */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-bold">4</span>
                Accommodation
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Room / Houseboat Type *</label>
                  {/* Room availability based on PAX:
                      2 pax = all 3 boats
                      3 pax = Standard Cabin + Double/Twin only
                      4+ pax = Standard Cabin only */}
                  <div className="space-y-2">
                    {ROOMS.filter((room) => {
                      const pax = formData.adults;
                      if (pax <= 2) return true; // 2 pax: all rooms
                      if (pax === 3) return room.id === "standard-cabin" || room.id === "double-twin-room"; // 3 pax: standard + double
                      return room.id === "standard-cabin"; // 4+ pax: only standard cabin
                    }).map((room) => (
                      <label key={room.id}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.roomType === room.id ? "border-gold-500 bg-gold-50" : "border-gray-200 hover:border-gold-200"
                        }`}>
                        <input type="radio" name="roomType" value={room.id} checked={formData.roomType === room.id}
                          onChange={(e) => updateForm("roomType", e.target.value)} className="sr-only" />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.roomType === room.id ? "border-gold-500" : "border-gray-300"
                        }`}>
                          {formData.roomType === room.id && <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{room.name}</p>
                          <p className="text-xs text-gray-500">{room.beds} • {room.size} • Max {room.maxGuests} guests</p>
                        </div>
                        <span className="font-bold text-gray-900">{formatPrice(room.price)}<span className="text-xs text-gray-500 font-normal">/night</span></span>
                      </label>
                    ))}
                  </div>
                  {formData.adults >= 3 && (
                    <p className="text-xs text-orange-600 mt-2 bg-orange-50 p-2 rounded-lg">
                      ℹ️ {formData.adults >= 4 ? "For 4+ guests, only Standard Cabin on Boat is available." : "For 3 guests, Suite with River View is not available."}
                    </p>
                  )}
                </div>
                <div className="max-w-xs">
                  <label className="text-sm font-medium text-gray-700">Number of Rooms on Boat</label>
                  <select value={formData.numberOfRooms} onChange={(e) => updateForm("numberOfRooms", Number(e.target.value))}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none">
                    {formData.roomType === "standard-cabin" 
                      ? [1,2,3].map((n) => (<option key={n} value={n}>{n} Bedroom{n > 1 ? "s" : ""}</option>))
                      : formData.roomType === "double-twin-room"
                      ? [1,2].map((n) => (<option key={n} value={n}>{n} Bedroom{n > 1 ? "s" : ""}</option>))
                      : [1].map((n) => (<option key={n} value={n}>{n} Bedroom</option>))
                    }
                  </select>
                </div>
                <div className="max-w-xs">
                  <label className="text-sm font-medium text-gray-700">Extra Bed (₹1,000/bed)</label>
                  <select value={formData.extraBed} onChange={(e) => updateForm("extraBed", Number(e.target.value))}
                    className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 appearance-none">
                    {[0,1,2,3].map((n) => (<option key={n} value={n}>{n === 0 ? "No extra bed" : `${n} extra bed${n > 1 ? "s" : ""} (+₹${n * 1000})`}</option>))}
                  </select>
                </div>

                {/* Package Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Select Package *</label>
                  <div className="space-y-2">
                    {[
                      { id: "standard", name: "Standard Package", extra: 0, desc: "AC 8:30PM-6:30AM • 1 Non-Veg option • Lime Juice" },
                      { id: "premium", name: "Premium Package", extra: 1500, desc: "AC 5:30PM-7:30AM • 2 Non-Veg options • Tender Coconut" },
                      { id: "luxury", name: "Semi Luxury Package", extra: 2500, desc: "AC all the time • 2 Non-Veg options • Tender Coconut" },
                    ].map((pkg) => (
                      <label key={pkg.id}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.packageType === pkg.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-200"
                        }`}>
                        <input type="radio" name="packageType" value={pkg.id} checked={formData.packageType === pkg.id}
                          onChange={(e) => updateForm("packageType", e.target.value)} className="sr-only" />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.packageType === pkg.id ? "border-emerald-500" : "border-gray-300"
                        }`}>
                          {formData.packageType === pkg.id && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{pkg.name}</p>
                          <p className="text-xs text-gray-500">{pkg.desc}</p>
                        </div>
                        <span className="font-bold text-gray-900 text-sm">
                          {pkg.extra === 0 ? "Included" : `+₹${pkg.extra.toLocaleString()}`}
                          {pkg.extra > 0 && <span className="text-xs text-gray-500 font-normal block text-right">/room</span>}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Food Requirements */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-bold">5</span>
                Food Requirements <span className="text-sm font-normal text-gray-500">(Please Select)</span>
              </h2>
              
              {/* Food Type */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Food Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Vegetarian", "Non-Vegetarian"].map((option) => (
                    <label key={option} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                      formData.foodRequirements.includes(option) ? "border-gold-500 bg-gold-50 text-gold-800" : "border-gray-200 hover:border-gold-200 text-gray-700"
                    }`}>
                      <input type="checkbox" checked={formData.foodRequirements.includes(option)}
                        onChange={() => toggleCheckbox("foodRequirements", option)} className="sr-only" />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        formData.foodRequirements.includes(option) ? "bg-gold-500 border-gold-500" : "border-gray-300"
                      }`}>
                        {formData.foodRequirements.includes(option) && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                        )}
                      </div>
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Spice Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {["No Spicy", "Medium Spicy", "Extra Spicy"].map((option) => (
                    <label key={option} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                      formData.foodRequirements.includes(option) ? "border-gold-500 bg-gold-50 text-gold-800" : "border-gray-200 hover:border-gold-200 text-gray-700"
                    }`}>
                      <input type="checkbox" checked={formData.foodRequirements.includes(option)}
                        onChange={() => toggleCheckbox("foodRequirements", option)} className="sr-only" />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        formData.foodRequirements.includes(option) ? "bg-gold-500 border-gold-500" : "border-gray-300"
                      }`}>
                        {formData.foodRequirements.includes(option) && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                        )}
                      </div>
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Specify any remarks <span className="text-xs text-gray-400">(Allergies, cooking style, or requirements)</span>
                </label>
                <input type="text" value={formData.foodAllergyDetails} onChange={(e) => updateForm("foodAllergyDetails", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                  placeholder="E.g. No onion, no garlic, gluten free, etc." />
              </div>
            </div>

            {/* 6. Special Requests */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-bold">6</span>
                Special Requests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {activityOptions.map((option) => (
                  <label key={option} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                    formData.specialRequests.includes(option) ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-gray-200 hover:border-emerald-200 text-gray-700"
                  }`}>
                    <input type="checkbox" checked={formData.specialRequests.includes(option)}
                      onChange={() => toggleCheckbox("specialRequests", option)} className="sr-only" />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                      formData.specialRequests.includes(option) ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                    }`}>
                      {formData.specialRequests.includes(option) && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                      )}
                    </div>
                    {option}
                  </label>
                ))}
              </div>
              <p className="text-xs text-orange-600 mt-3 bg-orange-50 p-2.5 rounded-lg">
                ⚠️ <strong>Country Boat Ride</strong> is not included in the package. It will be charged extra according to requirements and depends on availability.
              </p>
            </div>

            {/* 7. Payment Preference */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-bold">7</span>
                Payment Preference
              </h2>
              <div className="space-y-2">
                {paymentOptions.map((option) => (
                  <label key={option.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentPreference === option.id ? "border-gold-500 bg-gold-50" : "border-gray-200 hover:border-gold-200"
                  }`}>
                    <input type="radio" name="paymentPreference" value={option.id} checked={formData.paymentPreference === option.id}
                      onChange={(e) => updateForm("paymentPreference", e.target.value)} className="sr-only" />
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{option.name}</p>
                      <p className="text-xs text-gray-500">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 8. Additional Notes */}
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-bold">8</span>
                Additional Notes
              </h2>
              <textarea value={formData.additionalNotes} onChange={(e) => updateForm("additionalNotes", e.target.value)}
                rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 resize-none"
                placeholder="Any other information we should know about your stay..." />
            </div>

            {/* Terms & Conditions */}
            <div className="border-t border-gray-100 pt-6">
              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.termsAccepted ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
              }`}>
                <input type="checkbox" checked={formData.termsAccepted}
                  onChange={(e) => updateForm("termsAccepted", e.target.checked)} className="sr-only" />
                <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  formData.termsAccepted ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
                }`}>
                  {formData.termsAccepted && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                  )}
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">
                  I agree to the <a href="/terms" className="text-gold-600 underline">Terms & Conditions</a>,{" "}
                  <a href="/cancellation" className="text-gold-600 underline">Cancellation Policy</a>, and{" "}
                  <a href="/privacy" className="text-gold-600 underline">Privacy Policy</a> of Kalappura Houseboats & Tours. *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting} onClick={(e) => { if (!isSubmitting) { handleSubmit(e); } }}
              className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-lg ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#25D366] hover:bg-[#20BA5A] text-white"
              }`}>
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                  Submit Booking
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-3">
              Your booking will be saved securely. Confirmation email will be sent to your email address.
              Our team will also reach out via WhatsApp/call.
            </p>
          </motion.form>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="h-fit lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
              <h3 className="font-display text-lg font-bold text-gray-900 mb-4">Booking Summary</h3>
              <div className="flex items-center gap-3 p-3 bg-sand-50 rounded-xl mb-4">
                <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden">
                  <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{selectedRoom.name}</p>
                  <p className="text-xs text-gray-500">{selectedRoom.beds} • {selectedRoom.size}</p>
                </div>
              </div>
              {(() => {
                const currentRoom = ROOMS.find(r => r.id === formData.roomType) || selectedRoom;
                const roomRate = currentRoom.price * formData.numberOfRooms;
                const packageExtra = formData.packageType === "premium" ? 1500 * formData.numberOfRooms : formData.packageType === "luxury" ? 2500 * formData.numberOfRooms : 0;
                const childrenCharge = formData.children * 1000;
                const extraBedCharge = formData.extraBed * 1000;
                const subtotal = roomRate + packageExtra + childrenCharge + extraBedCharge;
                const gst = Math.round(subtotal * 0.18);
                const total = subtotal + gst;
                return (
                  <div className="space-y-2.5 text-sm border-t border-gray-100 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Room Rate {formData.numberOfRooms > 1 ? `(₹${currentRoom.price.toLocaleString()} × ${formData.numberOfRooms} rooms)` : ""}</span>
                      <span className="font-medium">{formatPrice(roomRate)}</span>
                    </div>
                    {packageExtra > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">{formData.packageType === "premium" ? "Premium" : "Semi Luxury"} Package ({formData.numberOfRooms} × ₹{formData.packageType === "premium" ? "1,500" : "2,500"})</span>
                        <span className="font-medium">{formatPrice(packageExtra)}</span>
                      </div>
                    )}
                    {formData.children > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Children ({formData.children} × ₹1,000)</span>
                        <span className="font-medium">{formatPrice(childrenCharge)}</span>
                      </div>
                    )}
                    {formData.extraBed > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Extra Bed ({formData.extraBed} × ₹1,000)</span>
                        <span className="font-medium">{formatPrice(extraBedCharge)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-orange-600">
                      <span>GST (18%)</span>
                      <span className="font-medium">+{formatPrice(gst)}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <span className="font-bold text-gray-900">Total / Night</span>
                      <span className="font-bold text-gray-900 text-lg">{formatPrice(total)}</span>
                    </div>
                    {formData.paymentPreference === "pay-at-property" && (
                      <>
                        <div className="flex justify-between text-emerald-600 bg-emerald-50 p-2 rounded-lg mt-2">
                          <span className="font-medium">20% Advance (Pay Now)</span>
                          <span className="font-bold">{formatPrice(Math.round(total * 0.2))}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                          <span>Balance at Property</span>
                          <span className="font-medium">{formatPrice(Math.round(total * 0.8))}</span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}
              <p className="text-xs text-gray-400 mt-3 text-center">Per night • All meals included • GST inclusive</p>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
              <p className="text-xs font-medium text-gray-700 mb-3">Need help? Contact us:</p>
              <a href="https://wa.me/919895053528" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 transition-colors mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +91 98950 53528
              </a>
              <a href="tel:+919895053528" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold-600 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call: +91 98950 53528
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
      <BookingContent />
    </Suspense>
  );
}
