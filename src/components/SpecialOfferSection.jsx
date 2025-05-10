import React from 'react'

import laravelBanner from "../assets/laravelBanner.png";
import CopyPasteBox from './CopyPasteBox'

const SpecialOfferSection = () => {
  return (
      <section className="px-4 md:px-20 mb-20">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
          {/* Course Card */}
          <div className="bg-white border border-[#F3F4F6] rounded-xl overflow-hidden w-full lg:w-1/2">
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-orange-600 font-semibold text-lg">
                  Belajar Laravel 12
                </h3>
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded">
                  80% OFF
                </span>
              </div>
              <p className="line-through text-sm text-gray-400">Rp 3.000.000</p>
              <p className="text-xl font-bold text-orange-500 mb-4">
                Rp 600.000
              </p>
              <img src={laravelBanner} alt="Laravel Course" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4 text-center lg:text-left">
            {/* Timer */}
            <div className="flex justify-center lg:justify-start gap-6 md:gap-10 mb-6">
              {[
                { label: "Hari", value: "0" },
                { label: "Jam", value: "22" },
                { label: "Menit", value: "42" },
                { label: "Detik", value: "32" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-semibold text-gray-800">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Title */}
            <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-700 inline-block text-transparent bg-clip-text mb-3">
              Nikmati Penawaran Eksklusif dari Course kami
            </h4>

            {/* Deskripsi */}
            <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed max-w-xl lg:mx-0 mx-auto">
              Dapatkan akses belajar dengan harga lebih hemat.
              <br />
              Gunakan kode promo eksklusif ini saat checkout dan nikmati
              penawaran spesial khusus untuk pelajar di{" "}
              <span className="font-semibold text-gray-700">
                CodeinAja Course
              </span>
              .
            </p>

            {/* Copy Paste Box */}
            <div className="flex justify-center lg:justify-start">
              <CopyPasteBox />
            </div>
          </div>
        </div>
      </section>
  )
}

export default SpecialOfferSection
