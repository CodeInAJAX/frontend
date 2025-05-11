import profile1 from "../assets/profile-1.png";
import profile2 from "../assets/profile-2.png";
import profile3 from "../assets/profile-3.png";
import onlineClass1 from "../assets/onlineClass1.png";
import onlineClass2 from "../assets/onlineClass2.png";
import onlineClass3 from "../assets/onlineClass3.png";

export const founders = [
  {
    name: "Tirta Hakim Pambudhi",
    role: "Chief Technology Officer",
    image: profile1,
  },
  {
    name: "Muhammad Rusdi Sandhika",
    role: "Chief Academic Officer",
    image: profile2,
  },
  {
    name: "Julian Sanz",
    role: "Chief Executive Officer",
    image: profile3,
  },
];

export const faqs = [
  {
    q: "Apakah pembelajaran dilakukan secara online?",
    a: "Ya, seluruh pembelajaran dilakukan secara online agar kamu bisa belajar di mana saja dan kapan saja.",
  },
  {
    q: "Apakah ada jadwal belajar yang tetap?",
    a: "Tidak, kamu bisa belajar sesuai ritmemu karena semua materi tersedia secara fleksibel on-demand.",
  },
  {
    q: "Apakah ada batasan waktu akses untuk program ini?",
    a: "Tidak ada batasan waktu. Kamu mendapatkan akses seumur hidup ke semua materi yang telah kamu beli.",
  },
  {
    q: "Bagaimana proses pembelajarannya?",
    a: "Kamu akan belajar melalui video interaktif, modul latihan, dan sesi diskusi bersama mentor untuk pendalaman materi.",
  },
];

export const links = [
  { name: "Beranda", to: "/" },
  { name: "Tentang Kami", to: "/about" },
  { name: "Kelas Online", to: "/courses" },
  { name: "Kontak", to: "/contact" },
];

export const courseList = [
  {
    id: 1,
    slug: "belajar-laravel",
    title: "Belajar Laravel",
    mentor: "Tirta Hakim Pambudhi",
    image: onlineClass1,
    videos: [
      { title: "Intro Laravel", url: "https://www.youtube.com/embed/..." },
      { title: "Routing Dasar", url: "https://www.youtube.com/embed/..." },
      { title: "Controller & View", url: "https://www.youtube.com/embed/..." },
    ],
  },
  {
    id: 2,
    slug: "belajar-golang",
    title: "Belajar Golang",
    mentor: "Tirta Hakim Pambudhi",
    image: onlineClass2,
    videos: [
      { title: "Intro Golang", url: "https://www.youtube.com/embed/..." },
      { title: "Routing Dasar", url: "https://www.youtube.com/embed/..." },
      { title: "Controller & View", url: "https://www.youtube.com/embed/..." },
    ],
  },
  {
    id: 3,
    slug: "belajar-react",
    title: "Belajar React",
    mentor: "Tirta Hakim Pambudhi",
    image: onlineClass3,
    videos: [
      { title: "Intro Golang", url: "https://www.youtube.com/embed/..." },
      { title: "Routing Dasar", url: "https://www.youtube.com/embed/..." },
      { title: "Controller & View", url: "https://www.youtube.com/embed/..." },
    ],
  },
];
