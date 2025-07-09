"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface RestaurantHeroProps {
  restaurantName?: string
  tagline?: string
  primaryColor?: string
  logoUrl?: string
  customFont?: string
}

export default function RestaurantHero({
  restaurantName = "Bella Vista",
  tagline = "Where Every Meal Tells a Story",
  primaryColor = "#D4A574", // Warm gold
  logoUrl = "/placeholder.svg?height=60&width=120",
  customFont = "font-serif",
}: RestaurantHeroProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Menu", href: "#menu" },
    { name: "Hours", href: "#hours" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}22 0%, transparent 50%, ${primaryColor}11 100%)`,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src={logoUrl || "/placeholder.svg"}
              alt={`${restaurantName} Logo`}
              width={120}
              height={60}
              className="h-12 w-auto sm:h-16 drop-shadow-lg"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: primaryColor }}
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Reserve Table
            </Button>
            <Button
              className="text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: primaryColor }}
            >
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="bg-black/80 backdrop-blur-md rounded-2xl p-6 mt-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white/90 hover:text-white py-3 font-medium transition-colors duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-white/20">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
              >
                Reserve Table
              </Button>
              <Button className="text-white font-semibold" style={{ backgroundColor: primaryColor }}>
                Order Now
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Welcome Message */}
          <div className="animate-fade-in-up">
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 ${customFont} leading-tight`}
            >
              Welcome to
              <span className="block mt-2 drop-shadow-2xl" style={{ color: primaryColor }}>
                {restaurantName}
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <div className="animate-fade-in-up animation-delay-300">
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-12 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl transform"
              style={{ backgroundColor: primaryColor }}
            >
              View Our Menu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Make Reservation
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-4 animate-fade-in-up animation-delay-900">
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-900 {
          animation-delay: 900ms;
        }
      `}</style>
    </div>
  )
}
