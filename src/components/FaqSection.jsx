import React from "react";
import { faqs } from "../utils/content";
const FaqSection = () => {
  return (
    <section className=" py-20 px-4 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
            Ada pertanyaan?
            <br />
            Tenang, kami bantu
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Tim support kami selalu siap bantu kamu kapan pun dibutuhkan. Nggak
            perlu ragu buat tanya seputar materi, teknis, atau kendala di
            platform. Fokus aja belajar, sisanya biar kami yang urus!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <details
              key={i}
              className="bg-white border border-gray-300 rounded-md p-4 cursor-pointer"
            >
              <summary className="font-semibold text-sm md:text-base text-black">
                {q}
              </summary>
              <p className="text-sm text-gray-600 mt-2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
