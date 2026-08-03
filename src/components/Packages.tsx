"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const packages = [
  {
    id: "standard",
    name: "Standard Package",
    subtitle: "For 1 Night",
    badge: "Most Popular",
    price: 15000,
    schedule: [
      { label: "Check-in Time", value: "Around 12:00 PM" },
      { label: "Lunch Break", value: "1 Hour" },
      { label: "Evening Anchoring", value: "5:00 PM" },
      { label: "Checkout", value: "Next day 9:00 AM" },
    ],
    aircon: "Air Con available in the bedroom from 8:30 PM to 6:30 AM",
    meals: [
      "Welcome Drinks - Lime Juice",
      "Lunch - Veg or Non Veg Kerala Meals",
      "Evening Tea & Snacks",
      "Dinner",
      "Breakfast",
    ],
    cruiseRoutes: [
      "Kainakari Village",
      "Kuppappuram Village",
      "Vembanad Lake",
      "Punnamada Lake",
      "Pallathuruthi",
    ],
    menu: {
      lunch: {
        title: "Lunch - Kerala Meals",
        items: "Rice, Sambar, Pappadam, Long beans Mezhukkupuratti, Mixed veg thoran/cabbage thoran, Pickle",
        nonveg: "Pearl-spot or any full fish fry",
      },
      dinner: {
        title: "Dinner",
        items: "Chapati, dal, rice, curd, veg curry/thoran, pickle",
        nonveg: "Chicken Curry/Roast",
      },
      breakfast: {
        title: "Breakfast (Any one option)",
        options: [
          "Idly, sambar, coconut chutney, eggs, tea/coffee",
          "Puttu, Chickpeas masala/Egg curry, tea/coffee",
          "Bread Toast, Butter, Jam, Banana, eggs, tea/coffee",
        ],
        note: "",
      },
    },
  },
  {
    id: "premium",
    name: "Premium Package",
    subtitle: "For 1 Night",
    badge: "Upgrade",
    price: 19000,
    schedule: [
      { label: "Check-in Time", value: "Around 12:00 PM" },
      { label: "Lunch Break", value: "1 Hour" },
      { label: "Evening Anchoring", value: "5:00 PM" },
      { label: "Checkout", value: "Next day 9:00 AM" },
    ],
    aircon: "Air Con available in the bedroom/hall from 5:30 PM to 7:30 AM",
    meals: [
      "Welcome Drinks - Tender Coconut",
      "Lunch - Veg or Non Veg Kerala Meals",
      "Evening Tea & Snacks",
      "Dinner",
      "Breakfast",
    ],
    cruiseRoutes: [
      "Kainakari Village",
      "Kuppappuram Village",
      "Vembanad Lake",
      "Punnamada Lake",
      "Meenappally Lake",
      "Meenappally Village",
      "Pallathuruthi",
    ],
    menu: {
      lunch: {
        title: "Lunch - Kerala Meals",
        items: "Rice, Sambar, Pappadam, Long beans Mezhukkupuratti, Mixed veg thoran/cabbage thoran, Pickle",
        nonveg: "2 Non-Veg varieties: 1. Pearl-spot or any full fish fry/Pollichathu  2. Chicken Curry/Roast/65",
      },
      dinner: {
        title: "Dinner",
        items: "Chapati, dal, rice, curd, veg curry/thoran, pickle",
        nonveg: "2 Non-Veg varieties: 1. Sea food/fish roast or fry (squid/prawns/king fish/pomfret/tuna)  2. Chicken Curry/Roast/65",
      },
      breakfast: {
        title: "Breakfast",
        options: [
          "Idly, sambar, coconut chutney, eggs, tea/coffee",
          "Puttu, Chickpeas masala/Egg curry, tea/coffee",
          "AND Bread Toast, Butter, Jam, Banana, eggs, tea/coffee",
        ],
        note: "Fish & Seafood dishes based on availability",
      },
    },
  },
  {
    id: "luxury",
    name: "Semi Luxury Package",
    subtitle: "For 1 Night",
    badge: "Best Experience",
    price: 24000,
    schedule: [
      { label: "Check-in Time", value: "Around 12:00 PM" },
      { label: "Lunch Break", value: "1 Hour" },
      { label: "Evening Anchoring", value: "5:00 PM" },
      { label: "Checkout", value: "Next day 9:00 AM" },
    ],
    aircon: "Air Con available either in the bedroom or in the hall all the time",
    meals: [
      "Welcome Drinks - Tender Coconut",
      "Lunch - Veg or Non Veg Kerala Meals",
      "Evening Tea & Snacks",
      "Dinner",
      "Breakfast",
    ],
    cruiseRoutes: [
      "Kainakari Village",
      "Kuppappuram Village",
      "Vembanad Lake",
      "Punnamada Lake",
      "Meenappally Lake",
      "Meenappally Village",
      "Pallathuruthi",
    ],
    menu: {
      lunch: {
        title: "Lunch - Kerala Meals",
        items: "Rice, Sambar, Pappadam, Long beans Mezhukkupuratti, Mixed veg thoran/cabbage thoran, Pickle",
        nonveg: "2 Non-Veg varieties: 1. Pearl-spot or any full fish fry/Pollichathu  2. Chicken Curry/Roast/65",
      },
      dinner: {
        title: "Dinner",
        items: "Chapati, dal, rice, curd, veg curry/thoran, pickle",
        nonveg: "2 Non-Veg varieties: 1. Sea food/fish roast or fry (squid/prawns/king fish/pomfret/tuna)  2. Chicken Curry/Roast/65",
      },
      breakfast: {
        title: "Breakfast",
        options: [
          "Idly, sambar, coconut chutney, eggs, tea/coffee",
          "Puttu, Chickpeas masala/Egg curry, tea/coffee",
          "AND Bread Toast, Butter, Jam, Banana, eggs, tea/coffee",
        ],
        note: "Fish & Seafood dishes based on availability",
      },
    },
  },
];

export default function Packages() {
  const [activeTab, setActiveTab] = useState("standard");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activePackage = packages.find((p) => p.id === activeTab) || packages[0];

  return (
    <section id="offers" className="section-padding bg-gradient-to-b from-emerald-50 to-white" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
            What&apos;s Included
          </span>
          <h2 className="section-title">Our Special Packages</h2>
          <p className="section-subtitle mx-auto">
            Everything you need for a perfect backwater experience, all included in your stay.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-card border border-gray-100 gap-1">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setActiveTab(pkg.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === pkg.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Package Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activePackage.schedule.length === 0 ? (
            /* Coming Soon */
            <div className="bg-white rounded-3xl p-12 shadow-card border border-gray-100 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚢</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{activePackage.name}</h3>
              <p className="text-gray-500">Details coming soon. Contact us for more information.</p>
              <a
                href="https://wa.me/919895053528?text=Hi! I'd like to know about the ${activePackage.name}."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#25D366] text-white font-medium rounded-xl hover:bg-[#20BA5A] transition-colors"
              >
                Ask on WhatsApp
              </a>
            </div>
          ) : (
            /* Standard Package Content */
            <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
              {/* Package Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">{activePackage.name}</h3>
                    <p className="text-emerald-200 text-sm mt-1">{activePackage.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-2">
                      {activePackage.badge}
                    </span>
                    <p className="text-white/70 text-xs">For 3 Boats (All Rooms)</p>
                    <p className="text-3xl font-bold text-white">₹{activePackage.price?.toLocaleString("en-IN")}</p>
                    <p className="text-emerald-200 text-xs">+ 18% GST per night</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                {/* Schedule */}
                <div>
                  <h4 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm">🕐</span>
                    Schedule
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePackage.schedule.map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-sm text-gray-700"><strong>{item.label}</strong> — {item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Air Con */}
                <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl">
                  <p className="text-sm text-sky-800 flex items-center gap-2">
                    <span>❄️</span>
                    <strong>Air Con:</strong> {activePackage.aircon}
                  </p>
                </div>

                {/* Meals & Refreshments */}
                <div>
                  <h4 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-sm">🍽️</span>
                    Meals & Refreshments Included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activePackage.meals.map((meal) => (
                      <div key={meal} className="flex items-center gap-2 p-2.5 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {meal}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cruise Routes */}
                <div>
                  <h4 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 text-sm">🗺️</span>
                    Cruise Routes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activePackage.cruiseRoutes.map((route) => (
                      <span key={route} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100">
                        📍 {route}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Food Menu */}
                {activePackage.menu && (
                  <div>
                    <h4 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 text-sm">📋</span>
                      Food Menu
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Lunch */}
                      <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <h5 className="font-semibold text-gray-900 text-sm mb-2">{activePackage.menu.lunch.title}</h5>
                        <p className="text-xs text-gray-600 leading-relaxed">{activePackage.menu.lunch.items}</p>
                        <p className="text-xs text-orange-700 mt-2 font-medium">Non-Veg: {activePackage.menu.lunch.nonveg}</p>
                      </div>
                      {/* Dinner */}
                      <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                        <h5 className="font-semibold text-gray-900 text-sm mb-2">{activePackage.menu.dinner.title}</h5>
                        <p className="text-xs text-gray-600 leading-relaxed">{activePackage.menu.dinner.items}</p>
                        <p className="text-xs text-purple-700 mt-2 font-medium">Non-Veg: {activePackage.menu.dinner.nonveg}</p>
                      </div>
                      {/* Breakfast */}
                      <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                        <h5 className="font-semibold text-gray-900 text-sm mb-2">{activePackage.menu.breakfast.title}</h5>
                        <div className="space-y-1.5">
                          {activePackage.menu.breakfast.options.map((opt, i) => (
                            <p key={i} className="text-xs text-gray-600">
                              {i > 0 && !opt.startsWith("AND") && <span className="text-yellow-600 font-medium">OR </span>}
                              {opt.startsWith("AND") ? <span><span className="text-yellow-600 font-medium">AND </span>{opt.replace("AND ", "")}</span> : opt}
                            </p>
                          ))}
                        </div>
                        {activePackage.menu.breakfast.note && (
                          <p className="text-xs text-orange-600 mt-2 font-medium">Note: {activePackage.menu.breakfast.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Book CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <a
                    href="/booking?room=standard-cabin"
                    className="flex-1 text-center py-3.5 gold-gradient text-white font-semibold rounded-xl shadow-gold text-sm"
                  >
                    Book This Package
                  </a>
                  <a
                    href="https://wa.me/919895053528?text=Hi! I'd like to book the Standard Package."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3.5 bg-[#25D366] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
