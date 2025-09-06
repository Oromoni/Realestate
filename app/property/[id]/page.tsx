"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PiBathtubLight } from "react-icons/pi";
import { PiBedLight } from "react-icons/pi";
import { CiSquareMore } from "react-icons/ci";
import { TbSofa } from "react-icons/tb";
import { FaCarSide } from "react-icons/fa6";
import { IoPricetagOutline } from "react-icons/io5";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

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
        "A stylish 2-bedroom apartment with city views stylish 2-bedroom apartment with city views stylish 2-bedroom apartment with city views stylish 2-bedroom apartment with city views stylish 2-bedroom apartment with city views stylish 2-bedroom apartment with city views.",
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

export default function PropertyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const allProperties = [
    ...realEstateData.apartments,
    ...realEstateData.villas,
    ...realEstateData.rent,
  ];

  const property = allProperties.find((item) => item.id === Number(id));

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!property) {
    return <div className="text-white p-10">Property not found.</div>;
  }

  const images = property.image;
  const mainImage = images[currentIndex] || "/placeholder.jpg";

  const showPrevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const numericPrice = Number(
        property.price.replace(/[^0-9.-]+/g, "")
      ) * 100;

      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          title: property.title,
          price: numericPrice,
        }),
      });

      const data = await res.json();

      if (data.sessionId && stripe) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert("Payment failed: " + data.error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong.");
    }
  };

  // ✅ Get 3 similar properties (just filter out current one)
  const similarProperties = allProperties
    .filter((item) => item.id !== property.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6 md:p-6">
      <button
        onClick={() => router.push("/")}
        className="mb-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
      >
        ← Back to Home
      </button>

      <h1 className="text-2xl font-bold mb-3">{property.title}</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ✅ Image gallery */}
        <div className="flex-1">
          <div className="relative w-full h-96 bg-gray-200 rounded-2xl overflow-hidden">
            <Image
              src={mainImage}
              alt={property.title}
              fill
              className="object-cover rounded-xl"
            />

            <button
              onClick={showPrevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              ◀
            </button>

            <button
              onClick={showNextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              ▶
            </button>
          </div>

          {/* ✅ Thumbnails */}
          <div className="flex gap-3 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative w-24 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  index === currentIndex
                    ? "border-amber-500"
                    : "border-transparent"
                } hover:border-amber-500`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* ✅ Separator + Local Info Section */}
          <hr className="my-8 border-gray-300" />
          <h2 className="text-2xl font-semibold mb-4">Local Information</h2>
          <div className="w-full h-80 rounded-lg overflow-hidden shadow">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                property.title
              )}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* ✅ Property Details */}
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold">Property Details</h2>
          <p className="text-gray-700">{property.description}</p>

         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" id="features">
  <div className="bg-gray-200 flex items-center justify-center h-10 rounded-lg gap-2 px-2">
    <p className="font-semibold"><IoPricetagOutline size={20} color={"black"}/></p>
    <p className="text-sm">$650,000</p>
  </div>
  <div className="bg-gray-200 flex items-center justify-center h-10 rounded-lg gap-2 px-2">
    <p className="font-semibold"><PiBedLight size={20} color={"black"}/></p>
    <p className="text-sm">4 Bed</p>
  </div>
  <div className="bg-gray-200 flex items-center justify-center h-10 rounded-lg gap-2 px-2">
    <p className="font-semibold"><PiBathtubLight size={20} color={"black"}/></p>
    <p className="text-sm">3 Bath</p>
  </div>
  <div className="bg-gray-200 flex items-center justify-center h-10 rounded-lg gap-2 px-2">
    <p className="font-semibold"><CiSquareMore size={20} color={"black"}/></p>
    <p className="text-sm">423Sq</p>
  </div>
  <div className="bg-gray-200 flex items-center justify-center h-10 rounded-lg gap-2 px-2">
    <p className="font-semibold"><FaCarSide size={20} color={"black"}/></p>
    <p className="text-sm">1 garage</p>
  </div>
  <div className="bg-gray-200 flex items-center justify-center h-10 rounded-lg gap-2 px-2">
    <p className="font-semibold"><TbSofa  size={20} color={"black"}/></p>
    <p className="text-sm">2 Living Room</p>
  </div>
</div>


          <div className="mt-2">
            <h3 className="font-semibold mb-2">Amenities</h3>
            <ul className="list-disc list-inside text-gray-700">
              {property.amenities.map((amenity, i) => (
                <li key={i}>{amenity}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-amber-600 transition"
          >
            Purchase Property
          </button>

          {/* ✅ Agent Card */}
          <div className="flex items-center gap-4 bg-white shadow p-5 rounded-xl">
            <Image
              src="/agent.jpg"
              alt="Agent"
              width={45}
              height={45}
              className="rounded-4xl object-cover"
            />
            <div>
              <p className="font-semibold text-lg">Sarah Johnson</p>
              <p className="text-gray-600 text-sm">Senior Real Estate Agent</p>
              <p className="text-gray-800 mt-1">📞 +1 234 567 890</p>
            </div>
          </div>

          {/* ✅ Similar Properties Section */}
          <div className="  mt-4">
            <h2 className="text-xl font-semibold mb-4 mt-3">Similar Properties</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => router.push(`/property/${prop.id}`)}
                  className=" shadow rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={prop.image[0]}
                      alt={prop.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm">{prop.title}</h3>
                    <p className="text-gray-600 text-xs">{prop.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
