"use client"

import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-6 font-serif text-amber-400">Bella Vista</h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Experience authentic Italian cuisine with a modern twist. We&apos;ve been serving exceptional food and creating
              memorable moments since 1985.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-amber-400">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Menu", "Hours", "Contact", "Reservations", "Private Events"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-amber-400">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>123 Gourmet Street</p>
                  <p>Downtown District</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <a
                  href="mailto:info@bellavista.com"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
                >
                  info@bellavista.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Bella Vista Restaurant. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
