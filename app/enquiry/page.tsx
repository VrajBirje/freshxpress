import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
const products = [
  {
    name: "Avocado (Butter Fresh)",
    price: "₹56/kg",
    image: "/img.jpg",
  },
  {
    name: "Broccoli Only",
    price: "₹29/kg",
    image: "/img.jpg",
  },
  {
    name: "Strawberries",
    price: "₹9/box",
    image: "/img.jpg",
  },
  {
    name: "Pomegranate Kabul",
    price: "₹48/kg",
    image: "/img.jpg",
  },
  {
    name: "Dragon Fruit (white)",
    price: "₹43/kg",
    image: "/img.jpg",
  },
  {
    name: "Green Peas Fresh",
    price: "₹48/500g",
    image: "/img.jpg",
  },
  {
    name: "Apple Shimla",
    price: "₹29/kg",
    image: "/img.jpg",
  },
]
const page = () => {
  return (
    <section className="py-16">
          <div className="container">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
              Explore our range of over <span className="text-[#FFA500]">200 fruits</span>
              <br />& vegetables
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              {products.map((product) => (
                <div key={product.name} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">{product.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#00843D] border-[#00843D] hover:bg-[#00843D] hover:text-white"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default page