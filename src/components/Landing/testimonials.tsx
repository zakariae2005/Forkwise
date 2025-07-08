"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Absolutely incredible experience! The truffle risotto was divine, and the service was impeccable. This is definitely my new favorite restaurant in the city.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Local Resident",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Bella Vista never disappoints. The atmosphere is perfect for date nights, and every dish is a masterpiece. The staff treats you like family.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Chef",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "As a fellow chef, I'm impressed by the attention to detail and quality of ingredients. The osso buco was cooked to perfection. Highly recommended!",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Business Executive",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Perfect venue for business dinners. The ambiance is sophisticated, the food is exceptional, and the service is professional. Always a great experience.",
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">What Our Guests Say</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our valued customers have to say about their dining experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-12 h-12 text-amber-500" />
                  </div>

                  {/* Stars */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">&quot;{testimonial.text}&quot;</p>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="relative">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover border-3 border-amber-200"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-amber-600 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
