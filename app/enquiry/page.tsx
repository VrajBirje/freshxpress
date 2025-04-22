import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
const products = [
  {
    name: "Avocado (Butter Fresh)",
    price: "₹56/kg",
    image: "/veg/avocado.png",
  },
  {
    name: "Broccoli Only",
    price: "₹29/kg",
    image: "/veg/broccoli.png",
  },
  {
    name: "Strawberries",
    price: "₹9/box",
    image: "/veg/strawberry.png",
  },
  {
    name: "Pomegranate Kabul",
    price: "₹48/kg",
    image: "/veg/pomegranate.png",
  },
  {
    name: "Dragon Fruit (white)",
    price: "₹43/kg",
    image: "/veg/dragon.png",
  },
  {
    name: "Green Peas Fresh",
    price: "₹48/500g",
    image: "/veg/greenpea.png",
  },
  {
    name: "Apple Shimla",
    price: "₹29/kg",
    image: "/veg/apple.png",
  },
  {
    name: "Coconut Konkan",
    price: "₹29/kg",
    image: "/veg/coconut.png",
  },
]
const page = () => {
  return (
    <section className="py-16">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/Press3.png" alt="FreshXpress" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              For Business
            </Link>
            {/* <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              Our Products
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              How It Works
            </Link> */}
            <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              About Us
            </Link>
            {/* <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              Blogs
            </Link> */}
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/join">
              <Button className="hidden md:inline-flex text-white bg-[#00843D] hover:bg-[#00843D]/90 shadow-md transition-all duration-300 hover:shadow-lg">
                Join as Farmers
              </Button>
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>
      <div className="container">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
          Explore our range of over <span className="text-[#FFA500]">fruits</span>
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
                  Enquire Now
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