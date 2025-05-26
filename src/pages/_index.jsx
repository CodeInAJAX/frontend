import React from "react";
import cardWhy from "../assets/cardWhy.png";
import bgGridHero from "../assets/bgGridHero.png";
import badge from "../assets/badge.svg";
import FounderSection from "../components/FounderSection";
import SpecialOfferSection from "../components/SpecialOfferSection";
import FaqSection from "../components/FaqSection";
import usePageTitle from "../hooks/usePageTitle";
import {useApp} from "../context/appContext.jsx";
import {useNavigate} from "react-router";

const Homepage = () => {
  const navigate = useNavigate()
  const { user } = useApp()
  usePageTitle("Beranda");

  if (user?.role == "mentor") {
    navigate("/mentor");
  }

  return (
    <main className="bg-white text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-28 px-4 md:px-20 relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover z-0"
          style={{ backgroundImage: `url(${bgGridHero})` }}
        />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge Suki2 */}
          <div className="flex justify-center">
            <img src={badge} alt="badge" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-l from-[#1A1A1A] via-[#FFA45B] to-[#FF6B00] inline-block text-transparent bg-clip-text">
              Wujudkan Karier Digital
            </span>
            <br />
            Impianmu Dimulai dari Sini
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed max-w-3xl mx-auto md:max-w-xl">
            Platform kursus online terbaik dengan bimbingan mentor berpengalaman
            dan materi yang lengkap serta terstruktur.
          </p>
          <button className="bg-primary hover:bg-orange-600 text-white py-3 px-6 rounded font-semibold">
            Mulai Belajar Sekarang
          </button>
        </div>
      </section>

      <SpecialOfferSection />

      {/* Kenapa CodeinAja */}
      <section className="py-10 px-4 md:px-20 bg-orange-500">
        <div className="max-w-6xl mx-auto">
          <img
            src={cardWhy}
            alt="Kenapa CodeinAja"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>
      <FounderSection />
      <FaqSection/>
    </main>
  );
};

export default Homepage;
