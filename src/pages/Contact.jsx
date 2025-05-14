import React from "react";
import imgContact from "../assets/imgContact.svg";
import usePageTitle from "../hooks/usePageTitle"; 

const Contact = () => {
  usePageTitle("Kontak");
  return (
    <section className="container mx-auto min-h-screen px-4 md:px-8 flex items-center justify-center">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-7xl w-full">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Kontak Kami
          </h1>
          <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-xl md:max-w-none">
            Punya pertanyaan, ide kolaborasi, atau butuh bantuan teknis? Tim{" "}
            <strong>CodeinAja</strong> siap membantu kamu! Jangan ragu untuk
            menghubungi kami melalui form di bawah ini atau langsung lewat
            kontak yang tersedia.
          </p>
          <a
            href="https://wa.me/6281779190013?text=Halo%20saya%20tertarik%20dengan%20jasa%20UI%2FUX%20design%20Anda" target="_blank" rel="noopener noreferrer"
            className="inline-block py-2 px-4 md:py-3 md:px-6 bg-primary text-white font-medium rounded-lg hover:bg-orange-600 transition text-base"
          >
            Kontak Sekarang
          </a>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src={imgContact}
            alt="Ilustrasi Kontak"
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
