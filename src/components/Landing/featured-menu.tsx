"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    id: 1,
    name: "Truffle Risotto",
    description: "Creamy Arborio rice with black truffle, parmesan, and fresh herbs",
    price: "$28",
    image: "/images/m1.jpg",
    category: "Main Course",
  },
  {
    id: 2,
    name: "Grilled Branzino",
    description: "Mediterranean sea bass with lemon, capers, and roasted vegetables",
    price: "$32",
    image: "/images/m3.jpg",
    category: "Seafood",
  },
  {
    id: 3,
    name: "Osso Buco",
    description: "Slow-braised veal shank with saffron risotto and gremolata",
    price: "$36",
    image: "/images/m5.jpg",
    category: "Main Course",
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso-soaked ladyfingers",
    price: "$12",
    image: "/images/m2.jpg",
    category: "Dessert",
  },
  {
    id: 5,
    name: "Burrata Caprese",
    description: "Fresh burrata with heirloom tomatoes, basil, and aged balsamic",
    price: "$18",
    image: "/images/m4.jpg",
    category: "Appetizer",
  },
  {
    id: 6,
    name: "Lobster Ravioli",
    description: "House-made pasta filled with lobster in a light cream sauce",
    price: "$34",
    image: "/images/m6.jpg",
    category: "Pasta",
  },
]

export default function FeaturedMenu() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">Featured Menu</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our chef&apos;s carefully curated selection of signature dishes, each crafted with passion and the
            finest ingredients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-2xl">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-2xl font-bold text-amber-600">{item.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105">
                    Add to Order
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            View Full Menu
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
