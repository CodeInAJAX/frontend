import React from 'react'
import logo from '../assets/codeinajaLogoWhite.svg'
import iconLocation from '../assets/iconLocation.svg'
import iconPhone from '../assets/iconPhone.svg'
const Footer = () => {
  return (
      <footer className="bg-orange-500 text-white py-10 px-4 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div>
          <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-white">Codein<span className='italic'>Aja</span></span>
          <div className="w-6 h-6 ml-1"><img src={logo} alt="logo codeinaja" /></div>
        </div>
            <p>
              Ini bukan sekadar platform belajar, ini langkah pertama kamu jadi digital talent terbaik versi kamu sendiri.
            </p>
            <div className='mt-6 space-y-2'>
            <div className='flex items-center'>
              <img src={iconLocation} alt="icon location" className='mr-2 w-4 h-4'/>
            <p>Yogyakarta, Indonesia</p>
            </div>
            <div className='flex items-center'>
              <img src={iconPhone} alt="icon phone" className='mr-2 2 w-4 h-4'/>
            <p>+62 813-1234-5678</p>
            </div>
          </div>
            </div>
          <div>
            <h4 className="font-semibold mb-2">Program</h4>
            <ul>
              <li>Online Course</li>
              <li>Bootcamp</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul>
              <li>Tentang Kami</li>
              <li>Blog</li>
              <li>Komunitas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul>
              <li>Hubungi Kami</li>
              <li>Syarat dan Ketentuan</li>
              <li>Kebijakan Privasi</li>
            </ul>
          </div>
        </div>
        <hr className='text-white/30 mt-4'/>
        <p className="text-center text-xs mt-10 text-white/65">© 2025 CodeinAja. All Rights Reserved</p>
      </footer>
  )
}

export default Footer
