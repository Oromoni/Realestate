"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const footerItems = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Contact"],
    },
    {
      title: "Product",
      links: ["Features", "Pricing", "Documentation", "API"],
    },
    {
      title: "Support",
      links: ["Help Center", "Community", "Status", "Report Issue"],
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Cookies", "Licenses"],
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="bg-black text-white py-10 px-6 sm:px-10 mt-10"
    >
      {/* Responsive grid: 2 columns on mobile, 4 on md+ */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {footerItems.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="font-semibold text-lg">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 6, color: "#38bdf8" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="transition-colors duration-300">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MyCompany. All rights reserved.
      </div>
    </motion.footer>
  );
}
