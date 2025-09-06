"use client";

import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What is this app about?",
    answer:
      "This app provides seamless global payments, savings, and financial tools in one place.",
  },
  {
    question: "Can I send money internationally?",
    answer: "Yes, you can send money to anyone worldwide instantly with low fees.",
  },
  {
    question: "Is my money safe?",
    answer:
      "We use bank-level encryption, multi-sig wallets, and strict compliance for your safety.",
  },
  {
    question: "Does it support mobile users?",
    answer:
      "Yes, it is optimized for mobile and even supports offline access in some regions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      defaults: { duration: 2, ease: "power2.out" }, // slower and smoother
    });

    tl.fromTo(leftRef.current, { x: -35, opacity: 0 }, { x: 0, opacity: 1 });
    tl.fromTo(
      rightRef.current,
      { x: 35, opacity: 0 },
      { x: 0, opacity: 1 },
      "<" // simultaneous
    );
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-white text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left side */}
        <div ref={leftRef} className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">
            Have questions about our platform? Here are some of the most common
            ones. Click to reveal the answers.
          </p>
        </div>

        {/* Right side */}
        <div ref={rightRef} className="space-y-4 p-3 py-3 rounded-3xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-4 bg-[#181818] text-white text-left text-lg font-medium transition-colors"
              >
                {faq.question}
                <span
                  className={`transition-all duration-500 ease-in-out transform ${
                    openIndex === index
                      ? "rotate-180 scale-110 text-white delay-100"
                      : "rotate-0 scale-100 text-gray-500 delay-75"
                  }`}
                >
                  {openIndex === index ? (
                    <AiOutlineMinus className="text-xl" />
                  ) : (
                    <AiOutlinePlus className="text-xl" />
                  )}
                </span>
              </button>

              <div
                className={`px-4 text-slate-600 bg-[#181818] overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 opacity-100 delay-100 pb-4"
                    : "max-h-0 opacity-0 delay-0 pb-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
