import { founders } from "../utils/content";

export default function FounderSection() {
  return (
    <section className="py-20 px-4 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <h2 className="text-3xl font-bold text-orange-600 mb-2">
          Meet Our Founder
        </h2>
        <p className="text-gray-500 mb-6">
          Bertemu dengan para founder{" "}
          <span className="font-semibold">CodeinAja</span> yang berpengalaman di
          bidang teknologi dan memiliki passion mengajar.
        </p>
        <hr className="mb-8 text-primary/80 w-1/6 border-2 rounded-full mx-auto md:mx-0" />

        <div className="grid md:grid-cols-3 gap-6">
          {founders.map(({ name, role, image }, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="text-left mb-4">
                <h3 className="text-lg font-bold mb-1 text-primary">{name}</h3>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
              <img
                src={image}
                alt={name}
                className="rounded-xl mb-2 w-full object-cover aspect-square"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
