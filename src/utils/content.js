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
    isPaid: true,
    price: 600000,
    videos: [
      {
        id: 1,
        title: "Intro Laravel",
        url: "https://www.youtube.com/embed/MFh0Fd7BsjE",
        duration: "15 menit",
        description:
          "Pengenalan dasar tentang framework Laravel dan cara kerjanya.",
      },
      {
        id: 2,
        title: "Routing Dasar",
        url: "https://www.youtube.com/embed/MYyJ4PuL4pY",
        duration: "20 menit",
        description:
          "Mempelajari cara membuat dan mengelola routing di Laravel.",
      },
      {
        id: 3,
        title: "Controller & View",
        url: "https://www.youtube.com/embed/eD4yMI-IR8g",
        duration: "25 menit",
        description:
          "Implementasi controller dan view untuk membangun aplikasi web dengan Laravel.",
      },
    ],
  },
  {
    id: 2,
    slug: "belajar-golang",
    title: "Belajar Golang",
    mentor: "Tirta Hakim Pambudhi",
    image: onlineClass2,
    isPaid: true,
    price: 750000,
    videos: [
      {
        id: 1,
        title: "Intro Golang",
        url: "https://www.youtube.com/embed/C8LgvuEBraI",
        duration: "18 menit",
        description: "Pengenalan bahasa pemrograman Go dan keunggulannya.",
      },
      {
        id: 2,
        title: "Struktur Data",
        url: "https://www.youtube.com/embed/YS4e4q9oBaU",
        duration: "22 menit",
        description: "Mempelajari struktur data dasar di Golang.",
      },
      {
        id: 3,
        title: "Concurrency",
        url: "https://www.youtube.com/embed/LvgVSSpwND8",
        duration: "30 menit",
        description:
          "Memahami konsep goroutine dan channel untuk concurrent programming.",
      },
    ],
  },
  {
    id: 3,
    slug: "belajar-react",
    title: "Belajar React",
    mentor: "Tirta Hakim Pambudhi",
    image: onlineClass3,
    isPaid: false,
    price: 0,
    videos: [
      {
        id: 1,
        title: "Intro React",
        url: "https://www.youtube.com/embed/Tn6-PIqc4UM",
        duration: "15 menit",
        description: "Pengenalan library React.js dan konsep dasar component.",
      },
      {
        id: 2,
        title: "State & Props",
        url: "https://www.youtube.com/embed/35lXWvCuM8o",
        duration: "20 menit",
        description: "Memahami state dan props untuk manajemen data di React.",
      },
      {
        id: 3,
        title: "Hooks",
        url: "https://www.youtube.com/embed/TNhaISOUy6Q",
        duration: "25 menit",
        description: "Mempelajari React Hooks untuk functional components.",
      },
    ],
  },
];

export const paymentMethods = [
  { id: "cash", name: "Cash", description: "Pembayaran tunai di kantor kami" },
  {
    id: "credit_card",
    name: "Kartu Kredit",
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "bank_transfer",
    name: "Transfer Bank",
    description: "BCA, Mandiri, BNI, BRI",
  },
  {
    id: "e_wallet",
    name: "E-Wallet",
    description: "GoPay, OVO, Dana, LinkAja",
  },
];

export const mockPayments = [
  {
    id: "pym001",
    nama: "Andi Saputra",
    email: "andi.saputra@gmail.com",
    noHp: "081234567890",
    metode: "Transfer Bank",
    channel: "BCA",
    status: "lunas",
    tanggal: "2025-05-20",
    nominal: 250000,
    catatan: "Pembayaran biaya kursus UI/UX",
    buktiBayar: "https://dummyimage.com/300x200/ccc/000&text=Bukti+Bayar+1"
  },
  {
    id: "pym003",
    nama: "Citra Lestari",
    email: "citra.lestari@mail.com",
    noHp: "082111223344",
    metode: "Kartu Kredit",
    channel: "Mandiri Visa",
    status: "gagal",
    tanggal: "2025-05-22",
    nominal: 300000,
    catatan: "Transaksi gagal saat bayar kelas backend",
    buktiBayar: null
  },
  {
    id: "pym004",
    nama: "Doni Maulana",
    email: "doni.maulana@webmail.com",
    noHp: "081998877665",
    metode: "Transfer Bank",
    channel: "Mandiri",
    status: "lunas",
    tanggal: "2025-05-23",
    nominal: 500000,
    catatan: "Bayar lunas kelas JavaScript Advance",
    buktiBayar: "https://dummyimage.com/300x200/ddd/000&text=Bukti+Bayar+4"
  },
  {
    id: "pym005",
    nama: "Eva Susanti",
    email: "eva.susanti@example.com",
    noHp: "082233445566",
    metode: "E-Wallet",
    channel: "OVO",
    status: "lunas",
    tanggal: "2025-05-24",
    nominal: 100000,
    catatan: "Pembayaran eBook UI tips",
    buktiBayar: "https://dummyimage.com/300x200/f0f0f0/000&text=Bukti+Bayar+5"
  }
];



