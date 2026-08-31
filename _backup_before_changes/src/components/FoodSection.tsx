"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const menuHighlights: { category: string; items: string[] }[] = [];
    items: ["Fresh Seafood", "Chef's Special", "Tandoori", "Desserts"],
  },
];

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten Free",
  "Seafood",
  "Continental",
  "North Indian",
];

export default function FoodSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="h-72 rounded-2xl overflow-hidden">
                <img
                  src="/images/gallery/food-1.jpg"
                  alt="Kerala cuisine"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="h-72 rounded-2xl overflow-hidden mt-8">
                <img
                  src="/images/gallery/dining-1.jpg"
                  alt="Fine dining"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3 shadow-luxury border border-gray-100"
            >
              <p className="text-sm font-medium text-gray-900">
                🍽️ All Meals Included in Every Booking
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full mb-4">
              Culinary Experience
            </span>
            <h2 className="section-title mb-4">
              Traditional Kerala Cuisine
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Savor authentic Kerala flavors prepared fresh by our onboard chef.
              From traditional fish curry to continental breakfast, every meal is
              a culinary journey through Kerala&apos;s rich food heritage.
            </p>

            {/* Menu Highlights */}
            <div className="space-y-4 mb-6">
              {menuHighlights.map((menu) => (
                <div
                  key={menu.category}
                  className="p-4 bg-sand-50 rounded-xl"
                >
                  <p className="font-semibold text-gray-900 mb-2">
                    {menu.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {menu.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Dietary Options */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Dietary Options Available:
              </p>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <span
                    key={option}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium"
                  >
                    ✓ {option}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
