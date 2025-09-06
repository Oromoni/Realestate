"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import gsap from "gsap";

const Link = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const imageRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  // GSAP animations
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3 },
        { scale: 1, duration: 6, ease: "power3.out" }
      );
    }

    if (formRef.current) {
      const intro = formRef.current.querySelectorAll(".intro-extra");
      const groups = formRef.current.querySelectorAll(".form-group");
      const checkboxGroup = formRef.current.querySelectorAll(
        ".checkbox-label, input[type='checkbox']"
      );
      const extras = formRef.current.querySelectorAll(".form-animate-extra");

      gsap.set([intro, groups, checkboxGroup, extras], { opacity: 0, y: 30 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(intro, { opacity: 1, y: 0, duration: 0.8, stagger: 0.25 });
      tl.to(groups, { opacity: 1, y: 0, duration: 0.8, stagger: 0.25 }, "-=0.1");
      tl.to(checkboxGroup, { opacity: 1, y: 0, duration: 0.8 }, "-=0.1");
      tl.to(extras, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 });
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="flex h-full bg-[#d6d0d0] text-black">
        {/* Left side (form) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col w-full max-w-md transition-all duration-700 ease-in-out"
          >
            {/* Intro */}
            <p className="text-black font-bold text-3xl intro-extra">Get Started</p>
            <p className="mt-2 text-gray-600 font-light text-sm intro-extra">
              {isSignup
                ? "Welcome to Unknown - Let's create your account"
                : "Welcome back - Please sign in to continue"}
            </p>
            <hr className="mt-3 intro-extra" />

            {/* Fullname (signup only) */}
            <div
              className={`form-group overflow-hidden transition-all duration-700 ease-in-out ${
                isSignup ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <label htmlFor="fullname" className="block text-sm font-bold text-gray-700">
                Full Name
              </label>
              <div className="relative w-full mt-1">
                <BsPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full bg-white rounded-2xl h-11 px-3 pl-10 pr-3 focus:outline-none focus:ring-0 focus:border-amber-500"
                  placeholder="John"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label
                htmlFor="email"
                className={`block font-bold text-gray-700 text-sm ${
                  isSignup ? "mt-3" : "mt-4"
                }`}
              >
                Email
              </label>
              <div className="relative w-full">
                <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white rounded-2xl h-11 mt-1 pl-10 pr-3 focus:outline-none focus:ring-0 focus:border-amber-500"
                  placeholder="Johndoe@mail.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="block font-bold text-gray-700 mt-2 text-sm">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white rounded-2xl h-11 mt-1 pl-3 pr-10 focus:outline-none focus:ring-0 focus:border-amber-500"
                  placeholder="******"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex gap-2 items-center mt-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="w-4 h-4 rounded"
                style={{ accentColor: "#000000" }}
              />
              <label className="font-bold text-gray-700 text-sm checkbox-label">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-black hover:bg-black/75 text-white font-semibold rounded-xl h-12 flex items-center justify-center form-animate-extra"
            >
              {isSignup ? "Sign up" : "Sign in"}
            </button>

            {/* Toggle Signup/Signin */}
            <p className="text-center mt-2 font-extralight text-gray-600 form-animate-extra">
              {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="text-black font-bold cursor-pointer hover:underline"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </span>
            </p>
          </form>
        </div>

        {/* Right side with full image */}
        <div className="hidden md:block md:w-1/2 h-full relative overflow-hidden">
          <div ref={imageRef} className="w-full h-full">
            <Image src="/bc1.jpg" alt="background" fill className="object-cover" priority />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Link;
