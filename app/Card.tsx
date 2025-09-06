"use client";
import { FaWallet, FaGlobe, FaLock } from "react-icons/fa";

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        
        {/* Item 1 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md">
          <FaWallet className="text-blue-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Universal Wallet</h3>
          <p className="text-gray-600 mb-4">
            Store, send, and spend funds globally with ease using a secure wallet.
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Learn More →
          </a>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md">
          <FaGlobe className="text-green-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Borderless Payments</h3>
          <p className="text-gray-600 mb-4">
            Send and receive money across the world instantly at low cost.
          </p>
          <a href="#" className="text-green-600 font-medium hover:underline">
            Learn More →
          </a>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md">
          <FaLock className="text-purple-600 text-5xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
          <p className="text-gray-600 mb-4">
            Your funds and data are protected with industry-leading security.
          </p>
          <a href="#" className="text-purple-600 font-medium hover:underline">
            Learn More →
          </a>
        </div>

      </div>
    </section>
  );
}
