"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
import Logo from "./Logo";
import Faq from "./Faq";
import { CiGrid41, CiMap, CiUser } from "react-icons/ci";

gsap.registerPlugin(ScrollTrigger);

type Property = {
  id: number;
  title: string;
  image: string[];
  price: string;
  description: string;
  size: string;
  bathrooms: number;
  amenities: string[];
};

type RealEstateData = {
  apartments: Property[];
  villas: Property[];
  rent: Property[];
};

const realEstateData: RealEstateData = {
  apartments: [
    {
      id: 1,
      title: "Dubai Villa",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$1,200",
      description:
        "A stylish 2-bedroom apartment with city views.",
      size: "85 sqm",
      bathrooms: 2,
      amenities: ["Balcony", "Gym Access", "24/7 Security"],
    },
    {
      id: 2,
      title: "Apartment",
      image: ["/apt1.jpg", "/apt2.jpg", "/apt3.jpg"],
      price: "$2,800 / month",
      description: "High-end apartment in the heart of downtown.",
      size: "120 sqm",
      bathrooms: 3,
      amenities: ["Swimming Pool", "Concierge Service", "Private Parking"],
    },
    {
      id: 3,
      title: "Cozy Apartment 3",
      image: ["/rent1.jpg", "/rent2.jpg", "/rent3.jpg"],
      price: "$900 / month",
      description: "Affordable and comfortable apartment near schools.",
      size: "65 sqm",
      bathrooms: 1,
      amenities: ["Playground", "Pet Friendly", "Shared Garden"],
    },
    {
      id: 4,
      title: "Skyline Apartment 4",
      image: ["/bali1.jpg", "/bali2.jpg", "/bali3.jpg"],
      price: "$3,200 / month",
      description: "Penthouse apartment with stunning skyline views.",
      size: "150 sqm",
      bathrooms: 3,
      amenities: ["Rooftop Access", "Smart Home System", "Fitness Studio"],
    },
  ],
  villas: [
    {
      id: 5,
      title: "Elegant Villa 1",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$750,000",
      description: "Spacious villa with a private garden and pool.",
      size: "320 sqm",
      bathrooms: 4,
      amenities: ["Swimming Pool", "Private Garage", "Outdoor Kitchen"],
    },
    {
      id: 6,
      title: "Private Villa 2",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$120,000",
      description: "Exclusive villa with luxury finishes and sea views.",
      size: "450 sqm",
      bathrooms: 5,
      amenities: ["Infinity Pool", "Cinema Room", "Wine Cellar"],
    },
    {
      id: 7,
      title: "Resort Villa 3",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$980,000",
      description: "Resort-style villa surrounded by lush greenery.",
      size: "380 sqm",
      bathrooms: 4,
      amenities: ["Jacuzzi", "Game Room", "Tennis Court"],
    },
    {
      id: 8,
      title: "Seaside Villa 4",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$2,100,000",
      description: "Seaside luxury villa with panoramic ocean views.",
      size: "500 sqm",
      bathrooms: 6,
      amenities: ["Private Dock", "Spa", "Guest House"],
    },
  ],
  rent: [
    {
      id: 9,
      title: "Rental Unit 1",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$600 / month",
      description: "Compact rental unit ideal for students or singles.",
      size: "45 sqm",
      bathrooms: 1,
      amenities: ["Laundry Access", "Bike Storage", "Public Transport Nearby"],
    },
    {
      id: 10,
      title: "Budget Rent 2",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$450 / month",
      description: "Affordable rental option with basic facilities.",
      size: "40 sqm",
      bathrooms: 1,
      amenities: ["Pet Friendly", "Street Parking", "Shared Yard"],
    },
    {
      id: 11,
      title: "Short-term Rent 3",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$750 / month",
      description: "Short-term furnished rental near business district.",
      size: "55 sqm",
      bathrooms: 1,
      amenities: ["Furnished", "Wi-Fi Included", "Housekeeping"],
    },
    {
      id: 12,
      title: "City Rent 4",
      image: ["/house1.jpg", "/house2.jpg", "/house3.jpg"],
      price: "$1,100 / month",
      description: "City-center rental with modern interior.",
      size: "70 sqm",
      bathrooms: 2,
      amenities: ["Balcony", "Gym Access", "Smart Lock"],
    },
  ],
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Home() {
  const [activeTab, setActiveTab] = useState<"apartments" | "villas" | "rent">(
    "apartments"
  );
  const listings = realEstateData[activeTab];

  const videoRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const exploreRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Animate "dreams" text
  useEffect(() => {
    const dreamsEl = document.querySelector("#dreams");
    if (dreamsEl) {
      gsap.fromTo(
        dreamsEl,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.6, ease: "power3.out" }
      );
    }
  }, []);

  // Animate "landin" spans (fade + stagger)
  useEffect(() => {
    const landinEls = document.querySelectorAll(".landin");
    if (landinEls.length) {
      gsap.fromTo(
        landinEls,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.25,
        }
      );
    }
  }, []);

  // Animate icons
  useEffect(() => {
    const icons = document.querySelectorAll(".icons");
    if (icons.length) {
      gsap.fromTo(
        icons,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", stagger: 0.3 }
      );
    }
  }, []);

  // Hero image animation
  useEffect(() => {
    const heroImg = document.querySelector("#hero-image");
    if (heroImg) {
      gsap.fromTo(
        heroImg,
        { opacity: 0, scale: 0.9, transformOrigin: "center center" },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  // Video zoom animation
  useEffect(() => {
    if (!videoRef.current) return;
    gsap.fromTo(
      videoRef.current,
      {
        scale: 0.5,
        transformOrigin: "center center",
        borderRadius: "35px",
        backgroundColor: "black",
      },
      {
        scale: 1,
        ease: "power2.out",
        borderRadius: "0px",
        backgroundColor: "black",
        duration: 1,
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );
  }, []);

  // Tabs + Explore animation
  useEffect(() => {
    if (!tabsRef.current || !videoRef.current || !exploreRef.current) return;

    const container = tabsRef.current;
    const buttons = Array.from(container.querySelectorAll("button")) as HTMLButtonElement[];
    const [apartmentsBtn, villasBtn, rentBtn] = buttons;

    gsap.set(container, { opacity: 1, width: apartmentsBtn.offsetWidth });
    gsap.set([apartmentsBtn, villasBtn, rentBtn], { position: "absolute", top: 0, left: 0 });
    gsap.set(apartmentsBtn, { autoAlpha: 1 });
    gsap.set(villasBtn, { autoAlpha: 0 });
    gsap.set(rentBtn, { autoAlpha: 0 });
    gsap.set(exploreRef.current, { autoAlpha: 0, y: 50 });

    const gap = 10;
    const totalWidth =
      apartmentsBtn.offsetWidth + villasBtn.offsetWidth + rentBtn.offsetWidth + gap * 2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top+=100% bottom",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(exploreRef.current, { autoAlpha: 1, y: 0, duration: 3, ease: "power2.out" })
      .to(container, { width: totalWidth, duration: 3, ease: "power2.out" }, "<")
      .to(villasBtn, { autoAlpha: 1, x: apartmentsBtn.offsetWidth + gap, duration: 2, ease: "power2.out" }, "<0.4")
      .to(
        rentBtn,
        { autoAlpha: 1, x: apartmentsBtn.offsetWidth + villasBtn.offsetWidth + gap * 2, duration: 2.1, ease: "power2.out" },
        "<0.4"
      );
  }, []);

  // Card zoom + info fade animation
  useEffect(() => {
    if (!cardsRef.current.length) return;

    cardsRef.current.forEach((card) => {
      const img = card.querySelector("img");
      const info = card.querySelector("#info");

      if (img && info) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" },
        });

        tl.fromTo(img, { scale: 2.2 }, { scale: 1, duration: 2.5, ease: "power2.out" });
        tl.fromTo(info, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" }, ">-0.3");
      }
    });
  }, []);

  return (
    <main className="switch min-h-screen bg-white">
      {/* Hero Section */}
     <div className="switch h-screen w-full bg-white flex flex-col md:flex-row">
  {/* Content Div */}
  <div className="w-full md:w-1/2 h-full relative flex flex-col justify-center text-black p-4">
    {/* Top Icons */}
    <div className="absolute top-4 left-4 right-4 flex justify-between md:static md:flex md:justify-between md:w-full">
      <CiGrid41 size={25} color="black" className="icons" />
      <CiMap size={25} color="black" className="icons" />
    </div>

    {/* Center Content */}
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      <p id="dreams" className="p-2 text-xs bg-[#698373] text-[#e9e6db] rounded-4xl">
        Building your Dreams
      </p>
      <p className="flex flex-col items-center text-3xl font-light space-y-2">
        <span className="landin text-4xl">Real Estate in Dubai</span>
        <span className="landin text-4xl">Ideal for Living</span>
        <span className="landin text-4xl">Investing</span>
      </p>
    </div>

    {/* Bottom Icon */}
    <div className="absolute bottom-4 left-4 md:static md:mt-auto">
      <CiUser size={30} color="black" className="icons" />
    </div>
  </div>

  {/* Image Div (hidden on mobile) */}
  <div className="hidden md:block w-1/2 h-full relative">
    <Image
      src="/dubai.jpg"
      alt="Hero Image"
      fill
      priority
      className="object-cover rounded-4xl p-2.5"
      id="hero-image"
    />
  </div>
</div>



      <div className="h-10 bg-white" />

      {/* Video Section */}
      <section ref={videoRef} className="relative h-screen overflow-hidden bg-white">
        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20 overflow-hidden">
          <div className="w-full overflow-hidden" style={{ height: "80px" }}>
            <Marquee gradient={false} speed={50} pauseOnHover style={{ overflow: "hidden", height: "80px" }} className="no-scrollbar">
              <h1 className="text-white text-4xl md:text-6xl font-bold whitespace-nowrap">With an initial payment of $25,000 . interest-free . </h1>
            </Marquee>
          </div>
        </div>
      </section>

      {/* Property Section */}
      <section id="properties" className="bg-black text-white px-12 pt-10 pb-48 md:rounded-b-[100px]">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-2 md:gap-0">
  {/* Explore Text */}
  <div
    className="text-sm sm:text-base md:text-2xl font-semibold"
    id="explore"
    ref={exploreRef}
  >
    Explore Our Properties
  </div>

  {/* Tabs */}
  <div
    id="tabs"
    ref={tabsRef}
    className="relative h-9 bg-[#363737] rounded-xl opacity-0 overflow-hidden md:ml-4"
  >
    {(["apartments", "villas", "rent"] as const).map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`absolute top-0 left-0 h-9 px-4 rounded-xl transition-all duration-300 ease-in-out ${
          activeTab === tab ? "bg-amber-50 text-black" : "bg-transparent text-white"
        }`}
      >
        {capitalize(tab)}
      </button>
    ))}
  </div>
</div>


   <div className="grid grid-cols-1 md:grid-cols-2 gap-9 justify-center">
  {listings.map((item, i) => (
    <Link key={item.id} href={`/property/${item.id}`}>
      <div
        id="card"
        ref={(el) => el && (cardsRef.current[i] = el)}
        className="bg-[#1e1e1e] rounded-xl overflow-hidden transition-transform duration-300 cursor-pointer
                   w-full max-w-5xs md:max-w-none
                   hover:-translate-y-2 hover:brightness-105"
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.image[0]}
            alt={item.title}
            fill
            className="object-cover transition-all duration-300 hover:brightness-110"
          />
          {/* Optional overlay for extra subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-30 rounded-xl" />
        </div>
        <div className="p-4" id="info">
          <h2 className="text-xl font-semibold transition-colors duration-300 hover:text-amber-400">
            {item.title}
          </h2>
        </div>
      </div>
    </Link>
  ))}
</div>



      </section>

      <Logo />
      <Faq />
    </main>
  );
}
