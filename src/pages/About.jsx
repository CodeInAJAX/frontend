import imgContact from "../assets/imgAbout.png";
import usePageTitle from "../hooks/usePageTitle"; 

const About = () => {
  usePageTitle("Tentang Kami");
  return (
    <section className="container mx-auto py-12 px-4">
      <div className="text-center max-w-4xl mx-auto mb-14">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Tentang Kami
        </h1>
        <p className="text-base text-gray-400 leading-relaxed">
          Berangkat dari pengalaman nyata di industri teknologi, kami membangun
          ekosistem belajar yang tidak hanya fokus pada keterampilan teknis,
          tetapi juga menanamkan pola pikir adaptif, kreatif, dan visioner. Di
          CodeinAja, peserta tidak sekadar memahami kode, tetapi juga belajar
          bagaimana menciptakan solusi nyata yang berdampak.
        </p>
      </div>
      <div className="flex justify-center">
        <img
          src={imgContact}
          alt="Ilustrasi Kontak"
          className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl h-auto rounded-xl shadow-md"
        />
      </div>
    </section>
  );
};

export default About;

