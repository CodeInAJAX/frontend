import React from 'react';
import logo from '../assets/codeinajaLogo.svg';

const ErrorPage = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <div className="flex items-center mb-6">
        <span className="text-xl sm:text-2xl font-bold text-black">
          Codein<span className="italic">Aja</span>
        </span>
        <div className="w-5 h-5 sm:w-6 sm:h-6 ml-1">
          <img src={logo} alt="logo codeinaja" />
        </div>
      </div>

      <h2 className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[16rem] font-bold bg-gradient-to-r from-[#FF6B00] to-[#666666] text-transparent bg-clip-text leading-none">
        404
      </h2>

      <p className="text-base sm:text-lg md:text-xl text-gray-700 mt-4">
        Halaman tidak ditemukan
      </p>
    </section>
  );
};

export default ErrorPage;
