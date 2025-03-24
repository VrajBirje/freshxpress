"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, MapPin, Phone, ChevronRight, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const images = [
  {
    src: "/1.png",
    title: "Explore Now",
    heading: "Fresh Produce Directly From Farms",
    subtitle: "Quality fruits & vegetables delivered to your business",
  },
  {
    src: "/2.png",
    title: "Join Our Network",
    heading: "Empowering Farmers Across India",
    subtitle: "Be part of our growing community of producers",
  },
  {
    src: "/3.png",
    title: "Procure with Us",
    heading: "Streamlined B2B Procurement",
    subtitle: "Reliable supply chain for your business needs",
  },
]

import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSlideChange = (newIndex: number) => {
    setDirection(newIndex > index ? 1 : -1)
    setIndex(newIndex)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/Press2.png" alt="FreshXpress" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              For Business
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              Our Products
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              How It Works
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              About Us
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              Blogs
            </Link>
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
          <div className="relative w-full h-full flex items-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={images[index].src}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? "100%" : "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? "-100%" : "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={images[index].src || "/placeholder.svg"}
                  alt={images[index].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center">
                  <div className="container h-full flex flex-col justify-center text-white relative">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="max-w-2xl"
                    >
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">{images[index].heading}</h1>
                      <p className="text-xl mb-8 text-gray-100">{images[index].subtitle}</p>
                      <Button className="px-8 py-6 font-semibold text-lg bg-[#00843D] hover:bg-[#00843D]/90 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] group">
                        {images[index].title}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideChange(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? "bg-white w-8" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-24">
          <div className="container flex justify-between items-center flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="text-[#00843D] font-medium text-lg inline-block mb-3 bg-[#E6F7EF] px-4 py-1 rounded-full">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Explore our range of over <span className="text-[#FFA500]">200 fruits</span>
                <br />& vegetables
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                At FreshXpress, we are dedicated to supplying the freshest fruits and vegetables directly sourced from
                farmers and Farmer Producer Organizations (FPOs). Catering specifically to businesses, supermarkets,
                malls, residential apartments, and societies, we streamline fresh produce supply with efficiency and
                transparency.
              </p>
              <Link href="/enquiry">
                <Button className="text-white bg-[#00843D] hover:bg-[#00843D]/90 px-8 py-6 text-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                  Explore Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Farmers Section */}
        <section className="py-24 bg-[#F8FAF8]">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#00843D] font-medium text-lg inline-block mb-3 bg-[#E6F7EF] px-4 py-1 rounded-full">
                For Farmers
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Farmer Onboarding Program</h2>
              <p className="text-gray-600 max-w-4xl mx-auto text-center text-lg leading-relaxed">
                At FreshXpress, farmers are at the heart of our operation. We invite individual farmers and Farmer
                Producer Organizations (FPOs) to join our growing network and benefit from our comprehensive support
                system.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                {
                  title: "Fair Pricing",
                  description: "Transparent pricing models that ensure farmers receive fair compensation",
                },
                {
                  title: "Market Access",
                  description:
                    "Reliable and regular market opportunities through our direct business-to-business connections",
                },
                {
                  title: "Tech Integration",
                  description:
                    "Access to our user-friendly tech platform that simplifies order management, payments, and logistics",
                },
                {
                  title: "Training & Support",
                  description:
                    "Continuous support and training to help enhance productivity, crop quality, and market readiness",
                },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-[#E6F7EF] rounded-full flex items-center justify-center mb-4">
                        <Check className="h-6 w-6 text-[#00843D]" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative h-64 overflow-hidden rounded-xl shadow-md"
                >
                  <Image
                    src={`/farmer.png`}
                    alt={`Farmer ${i}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="bg-[#00843D] hover:bg-[#00843D]/90 text-white px-8 py-6 text-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
                Join Our Network
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* B2B Section */}
        <section className="py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
              >
                <Image src="/img.jpg" alt="B2B Operations" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Streamlined Supply Chain</h3>
                  <p className="text-white/90">From farm to business with efficiency and transparency</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#00843D] font-medium text-lg inline-block mb-3 bg-[#E6F7EF] px-4 py-1 rounded-full">
                  For Businesses
                </span>
                <h2 className="text-3xl font-bold mt-2 mb-8">Chennai&apos; largest B2B fresh produce distributor</h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-[#00843D] pl-4">
                    <h3 className="text-xl font-bold mb-2">Quick Commerce & Modern Trade</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We deliver fresh produce to Quick commerce, Modern trade businesses, hotels, restaurants,
                      caterers, and corporate institutions. Our robust supply chain ensures timely, high-quality
                      deliveries every day.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#FFA500] pl-4">
                    <h3 className="text-xl font-bold mb-2">Apartments & Societies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Enjoy doorstep delivery of fresh fruits and vegetables, simplifying everyday life for residents.
                      FreshXpress is your reliable community partner for daily freshness.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#00843D] pl-4">
                    <h3 className="text-xl font-bold mb-2">Supermarkets & Malls</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We consistently supply supermarkets and malls with premium quality fruits and vegetables, ensuring
                      shelves remain stocked and appealing to customers.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {["Low prices", "99.99% fulfillment", "12 Hour delivery", "Ease of ordering"].map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 text-sm bg-gray-50 p-3 rounded-lg">
                      <div className="h-6 w-6 bg-[#E6F7EF] rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-[#00843D]" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24 bg-[#F5FFF5]">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#00843D] font-medium text-lg inline-block mb-3 bg-[#E6F7EF] px-4 py-1 rounded-full">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Get Started with <span className="text-[#FFA500]">FreshXpress</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Partner with FreshXpress today and experience a revolutionary approach to fresh produce delivery.
                  Enhance your business or community living with our reliable, fresh, and efficient services.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-md">
                      <MapPin className="text-[#00843D] h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Our Location</h3>
                      <p className="text-gray-600">
                        2nd floor, 635, 7th main road, 2nd stage, Indiranagar, Bengaluru, Urban, Karnataka, 560038
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-full shadow-md">
                      <Phone className="text-[#00843D] h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Contact Number</h3>
                      <p className="text-gray-600">044-4827829</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-none shadow-lg overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Let&apos;s Talk</h3>
                    <form className="space-y-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input id="name" placeholder="Enter your name" className="h-12" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Contact Number
                        </label>
                        <Input id="phone" placeholder="Enter your contact number" className="h-12" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="business" className="text-sm font-medium">
                          Business Name
                        </label>
                        <Input id="business" placeholder="Enter your business name" className="h-12" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium">
                          Business Type
                        </label>
                        <Select>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="supermarket">Supermarket</SelectItem>
                            <SelectItem value="apartment">Apartment Complex</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message (Optional)
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your requirements"
                          className="min-h-[100px]"
                        />
                      </div>

                      <Button className="w-full bg-[#00843D] hover:bg-[#00843D]/90 h-12 text-lg shadow-md transition-all duration-300 hover:shadow-lg">
                        Submit Inquiry
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-[#FFF9EA]">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <span className="text-[#FFA500] font-medium text-lg inline-block mb-3 bg-[#FFF5E0] px-4 py-1 rounded-full">
                    Why Choose Us
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Why choose <span className="text-[#00843D]">FreshXpress</span>?
                  </h2>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: "Farm Direct Sourcing",
                      description:
                        "Direct connections with farmers and FPOs, eliminating intermediaries for fairer prices and fresher produce.",
                    },
                    {
                      title: "Tech-Enabled Operations",
                      description:
                        "Advanced technology streamlining supply chain management, farmer onboarding, and transaction transparency.",
                    },
                    {
                      title: "Superior Quality Control",
                      description:
                        "Rigorous quality checks to ensure premium-grade produce consistently meets the highest standards.",
                    },
                    {
                      title: "Comprehensive Range",
                      description:
                        "A diverse selection of seasonal and exotic produce, available year-round to meet unique business needs.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex gap-4 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="h-10 w-10 rounded-full bg-[#E6F7EF] flex items-center justify-center shrink-0">
                        <Check className="h-5 w-5 text-[#00843D]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-8 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full border-2 border-[#00843D] flex items-center justify-center bg-white shadow-md">
                      <MapPin className="h-6 w-6 text-[#00843D]" />
                    </div>
                    <span className="font-medium text-lg">Chennai</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full border-2 border-[#00843D] flex items-center justify-center bg-white shadow-md">
                      <MapPin className="h-6 w-6 text-[#00843D]" />
                    </div>
                    <span className="font-medium text-lg">Bengaluru</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative h-60 rounded-xl overflow-hidden shadow-lg"
                    whileHover={{ y: -5 }}
                  >
                    <Image
                      src={`/store.png`}
                      alt={`Store ${i}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#00843D] font-medium text-lg inline-block mb-3 bg-[#E6F7EF] px-4 py-1 rounded-full">
                Our Clients
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-[#00843D]">500+ clients</span> have put their trust in us
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative h-24 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <Image src={`/client.png`} alt={`Client ${i}`} fill className="object-contain p-2" />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-[#00843D] text-[#00843D] hover:bg-[#00843D] hover:text-white transition-all duration-300 px-8 py-6 text-lg"
              >
                View Our Complete Clientele
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-[#F8FAF8]">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#00843D] font-medium text-lg inline-block mb-3 bg-[#E6F7EF] px-4 py-1 rounded-full">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">What our customers say about us</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "S. Kamalakshman",
                  role: "Executive Chef @ The Living Room",
                  content:
                    "The FreshXpress team has been prompt, perfect and punctual with their services. They have been honest in accepting their mistakes and making replacement quickly. The team is extremely responsible and disciplined.",
                },
                {
                  name: "Hyma",
                  role: "Owner @Krishna Deli",
                  content:
                    "We have been associated with FreshXpress for the past 2 years. Their commitment to quality and delivery timelines are highly commendable. They are quick to see through calls to super easy to use. Our specific requirements are taken care of and they understand our business needs and are ever accommodating. Kudos to team FreshXpress.",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>

                      <p className="text-gray-700 italic text-lg leading-relaxed">{testimonial.content}</p>

                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <div className="h-14 w-14 rounded-full bg-[#E6F7EF] flex items-center justify-center text-[#00843D] font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{testimonial.name}</p>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12 space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    i === 1 ? "bg-[#00843D] w-10" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial page ${i}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="py-24 bg-gradient-to-br from-[#E6F7EF] to-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#00843D] font-medium text-lg inline-block mb-3 bg-white px-4 py-1 rounded-full shadow-sm">
                  Mobile App
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Download the FreshXpress App</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  The only freshly picked fruits and vegetables delivery service you&apos;ll ever need. Download the app and
                  start filling up the cart today! Get real-time updates on your orders and exclusive app-only offers.
                </p>
                <div className="flex space-x-6 mt-8">
                  <Link href="#" className="transform transition-transform hover:scale-105">
                    <Image
                      src="/google.png"
                      alt="Get it on Google Play"
                      width={160}
                      height={48}
                      className="h-14 w-auto"
                    />
                  </Link>
                  <Link href="#" className="transform transition-transform hover:scale-105">
                    <Image
                      src="/play.png"
                      alt="Download on the App Store"
                      width={160}
                      height={48}
                      className="h-14 w-auto"
                    />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[600px]"
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-[#E6F7EF]/50 to-transparent rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/img.jpg" alt="App preview" fill className="object-contain p-8" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#00843D]">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-white max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your fresh produce supply?</h2>
              <p className="text-white/90 text-lg mb-8">
                Join hundreds of businesses that trust FreshXpress for quality, reliability, and efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#00843D] hover:bg-white/90 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                  Get Started Now
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg">
                  Contact Sales Team
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1F3327] text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <Image src="/Press2.png" alt="FreshXpress" width={160} height={50} className="h-12 w-auto" />
              <p className="text-white/80">Tech20 Pvt Private Limited</p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-xl mb-4">Explore Products</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors">
                    Fruits
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors">
                    Vegetables
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors">
                    Exotic Produce
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors">
                    Seasonal Items
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-xl mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors">
                    How it works?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-xl mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#FFA500] shrink-0 mt-1" />
                  <span className="text-white/80">
                    2nd floor, 635, 7th main road, 2nd stage, Indiranagar, Bengaluru, Karnataka, 560038
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#FFA500]" />
                  <span className="text-white/80">044-4827829</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/60 text-sm">© {new Date().getFullYear()} FreshXpress. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                  Terms and Conditions
                </Link>
                <Link href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                  Shipping Details
                </Link>
                <Link href="#" className="text-white/80 hover:text-white text-sm transition-colors">
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

