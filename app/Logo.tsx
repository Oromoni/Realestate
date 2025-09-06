"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FeaturesWithLogos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<GSAPTween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    // Animate the marquee movement
    const animateMarquee = () => {
      const totalWidth = track.scrollWidth / 2;
      const screenWidth = window.innerWidth;
      let speed = 100;
      if (screenWidth >= 1280) speed = 40;
      else if (screenWidth >= 768) speed = 60;
      else speed = 100;
      const duration = totalWidth / speed;

      gsap.killTweensOf(track);
      gsap.set(track, { x: 0 });

      animationRef.current = gsap.to(track, {
        x: -totalWidth,
        ease: "linear",
        repeat: -1,
        duration,
      });
    };

    animateMarquee();
    window.addEventListener("resize", animateMarquee);

    return () => {
      window.removeEventListener("resize", animateMarquee);
      gsap.killTweensOf(track);
    };
  }, []);

  // Pause on hover
  const handleMouseEnter = () => animationRef.current?.pause();
  const handleMouseLeave = () => animationRef.current?.resume();

  // Fade in logos when in view
  useEffect(() => {
    if (!trackRef.current) return;

    const logos = trackRef.current.querySelectorAll("img");
    logos.forEach((logo) => gsap.set(logo, { opacity: 0 }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, { opacity: 1, duration: 9, ease: "power2.out" });
          }
        });
      },
      { threshold: 0.1 }
    );

    logos.forEach((logo) => observer.observe(logo));

    return () => {
      logos.forEach((logo) => observer.unobserve(logo));
    };
  }, []);

  return (
    <section className="w-full bg-white py-12 px-6">
      <div className="relative w-full overflow-hidden mt-16">
        {/* Left blur */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
        {/* Right blur */}
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div
          ref={trackRef}
          className="flex logo-track flex-nowrap"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* First set */}
          <div className="flex gap-6 md:gap-12 shrink-0">
            <Image src="/logo.png" alt="logo1" width={100} height={50} />
            <Image src="/logo.png" alt="logo2" width={100} height={50} />
            <Image src="/logo.png" alt="logo3" width={100} height={50} />
            <Image src="/logo.png" alt="logo4" width={100} height={50} />
            <Image src="/logo.png" alt="logo5" width={100} height={50} />
          </div>

          {/* Duplicate for seamless loop */}
          <div className="flex gap-6 md:gap-12 shrink-0">
            <Image src="/logo.png" alt="logo1" width={100} height={50} />
            <Image src="/logo.png" alt="logo2" width={100} height={50} />
            <Image src="/logo.png" alt="logo3" width={100} height={50} />
            <Image src="/logo.png" alt="logo4" width={100} height={50} />
            <Image src="/logo.png" alt="logo5" width={100} height={50} />
          </div>
        </div>
      </div>
    </section>
  );
}
