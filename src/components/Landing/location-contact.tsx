"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Instagram, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function LocationContact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">Visit Us Today</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find us in the heart of the city or get in touch to make a reservation. We can&apos;t wait to welcome you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map and Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Interactive Map</p>
                  <p className="text-gray-500">123 Gourmet Street, Downtown</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                  <a href="tel:+1234567890" className="text-amber-600 hover:text-amber-700 font-semibold">
                    (123) 456-7890
                  </a>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Instagram className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Follow Us</h3>
                  <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold">
                    @bellavista
                  </a>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:info@bellavista.com" className="text-amber-600 hover:text-amber-700 font-semibold">
                    info@bellavista.com
                  </a>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">WhatsApp</h3>
                  <a href="https://wa.me/1234567890" className="text-amber-600 hover:text-amber-700 font-semibold">
                    Message Us
                  </a>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="border-0 shadow-xl rounded-3xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input
                        className="rounded-xl border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input
                        className="rounded-xl border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      type="email"
                      className="rounded-xl border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                    <Input
                      type="tel"
                      className="rounded-xl border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea
                      className="rounded-xl border-gray-200 focus:border-amber-500 focus:ring-amber-500 min-h-[120px]"
                      placeholder="Tell us about your inquiry or special requests..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
