"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Restaurant interior"
                width={500}
                height={600}
                className="object-cover w-full h-[500px] lg:h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200/30 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-200/20 rounded-full blur-xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">Our Story</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-8" />
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Founded in 1985, Bella Vista has been serving authentic Italian cuisine with a modern twist for over
                three decades. Our passion for exceptional food and warm hospitality has made us a beloved destination
                for food lovers.
              </p>
              <p className="text-lg">
                Every dish is crafted with the finest ingredients, sourced locally when possible, and prepared with
                techniques passed down through generations. Our chefs combine traditional Italian recipes with
                contemporary culinary innovation.
              </p>
              <p className="text-lg">
                From intimate dinners to special celebrations, we create memorable experiences that bring people
                together around the table, just as food should.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">38+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">50K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
