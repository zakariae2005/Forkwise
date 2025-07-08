"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Clock, Phone, MapPin } from "lucide-react"

const hours = [
  { day: "Monday", hours: "5:00 PM - 10:00 PM" },
  { day: "Tuesday", hours: "5:00 PM - 10:00 PM" },
  { day: "Wednesday", hours: "5:00 PM - 10:00 PM" },
  { day: "Thursday", hours: "5:00 PM - 10:00 PM" },
  { day: "Friday", hours: "5:00 PM - 11:00 PM" },
  { day: "Saturday", hours: "12:00 PM - 11:00 PM" },
  { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
]

export default function OpeningHours() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="hours" className="py-20 bg-gradient-to-b from-gray-50 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">Opening Hours</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re here to serve you delicious meals throughout the week. Join us for an unforgettable dining experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Hours Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="bg-amber-100 p-3 rounded-2xl mr-4">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Weekly Schedule</h3>
              </div>

              <div className="space-y-4">
                {hours.map((item, index) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex justify-between items-center py-4 px-6 rounded-2xl hover:bg-amber-50 transition-colors duration-300 border border-transparent hover:border-amber-200"
                  >
                    <span className="font-semibold text-gray-900 text-lg">{item.day}</span>
                    <span className="text-amber-600 font-medium text-lg">{item.hours}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-2xl mr-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Reservations</h3>
              </div>
              <p className="text-gray-600 mb-4">Call us to reserve your table</p>
              <a
                href="tel:+1234567890"
                className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors duration-300"
              >
                (123) 456-7890
              </a>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-2xl mr-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Location</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                123 Gourmet Street
                <br />
                Downtown District
                <br />
                New York, NY 10001
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
