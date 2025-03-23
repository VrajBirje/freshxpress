"use client";
import Image from "next/image"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, MapPin, Phone } from "lucide-react"
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { src: "/1.png", title: "Explore Now", title2: "Explore Now", subtitle: "Delivered to your doorstep" },
  { src: "/2.png", title: "Join Our Network", title2: "", subtitle: "Delivered to your doorstep" },
  { src: "/3.png", title: "Procure with Us", title2: "", subtitle: "Delivered to your doorstep" },
];
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Press2.png"
              alt="Madras Mandi"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              For Business
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Our Products
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              About Us
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Blogs
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/join">
              <Button className="hidden md:inline-flex text-white bg-[#FFA500] hover:bg-[#00843D]/90">Join as Farmers</Button>
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[75vh] min-h-[400px] overflow-hidden">
          <div className="relative w-full h-full flex items-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={images[index].src}
                custom={direction}
                initial={{ x: direction > 0 ? "100%" : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: direction > 0 ? "-100%" : "100%" }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={images[index].src}
                  alt={images[index].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="container h-full flex flex-col justify-center text-white relative">
                    {/* Centered Button at the Bottom */}
                    {/* <h1 className="text-4xl md:text-6xl font-bold mb-4">{images[index].title2}</h1> */}
                    {/* <p className="text-xl mb-8">{images[index].subtitle}</p> */}
                    <Button className="absolute font-regular bottom-10 px-6 py-4 font-semibold text-xl left-40 transform -translate-x-1/2 w-fit bg-[#00843D] hover:bg-[#00843D]/90">
                      {images[index].title}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>


        {/* Products Section */}
        <section className="py-16">
          <div className="container flex justify-between items-center flex-col gap-8">
            <span className="text-[#00843D] font-medium">Who We Are</span>
            <p className="text-gray-600 max-w-4xl mx-auto text-center">At FreshXpress, we are dedicated to supplying the freshest fruits and vegetables directly sourced from farmers and Farmer Producer Organizations (FPOs). Catering specifically to businesses, supermarkets, malls, residential apartments, and societies, we streamline fresh produce supply with efficiency and transparency.</p>
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
              Explore our range of over <span className="text-[#FFA500]">200 fruits</span>
              <br />& vegetables
            </h2>
            <Link href="/enquiry">
              <Button className="hidden md:inline-flex text-white bg-[#00843D] hover:bg-[#00843D]/90">Explore Now</Button>
            </Link>
          </div>
        </section>

        {/* Farmers Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-[#00843D] font-medium">For Farmers</span>
              <h2 className="text-3xl font-bold mt-2">Farmer Onboarding Program</h2>
              <p className="mt-4 text-gray-600 max-w-4xl mx-auto text-center">
                <p className="text-center mb-4">At FreshXpress, farmers are at the heart of our operation. We invite individual farmers and Farmer Producer Organizations (FPOs) to join our growing network and benefit from:</p>
                <strong>Fair Pricing:</strong> Transparent pricing models that ensure farmers receive fair compensation.
                <br />
                <strong>Market Access:</strong> Reliable and regular market opportunities through our direct business-to-business connections.
                <br />
                <strong>Tech Integration:</strong> Access to our user-friendly tech platform that simplifies order management, payments, and logistics.
                <br />
                <strong>Training & Support:</strong> Continuous support and training to help enhance productivity, crop quality, and market readiness.
                <br />
                Join FreshXpress and empower your farming business with better opportunities and assured growth.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative h-64">
                  <Image
                    src={`/farmer.png`}
                    alt={`Farmer ${i}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* B2B Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px]">
                <Image
                  src="/img.jpg"
                  alt="B2B Operations"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <span className="text-[#00843D] font-medium">For Businesses</span>
                {/* <h2 className="text-3xl font-bold mt-2">Chennai&apos;s largest B2B fresh produce distributor</h2> */}
                <p className="my-4 text-gray-600">
                  We deliver fresh produce to Quick commerce, Modern trade businesses,  hotels, restaurants, caterers, and corporate institutions. Our robust supply chain ensures timely, high-quality deliveries every day.
                </p>
                <span className="text-[#00843D] font-medium">For Apartments & Societies</span>
                {/* <h2 className="text-3xl font-bold mt-2">Chennai&apos;s largest B2B fresh produce distributor</h2> */}
                <p className="my-4 text-gray-600">
                  Enjoy doorstep delivery of fresh fruits and vegetables, simplifying everyday life for residents. FreshXpress is your reliable community partner for daily freshness.
                </p>
                <span className="text-[#00843D] font-medium">Supermarkets & Malls</span>
                {/* <h2 className="text-3xl font-bold mt-2">Chennai&apos;s largest B2B fresh produce distributor</h2> */}
                <p className="mt-4 text-gray-600">
                  We consistently supply supermarkets and malls with premium quality fruits and vegetables, ensuring shelves remain stocked and appealing to customers.</p>
                {/* <div className="grid grid-cols-2 gap-4 mt-8">
                  {["Low prices", "99.99% fulfillment", "12 Hour delivery", "Ease of ordering"].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2 text-sm">
                      <div className="h-2 w-2 bg-[#00843D] rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-[#F5FFF5]">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold">Get Started with <span className="text-[#FFA500]">FreshXpress</span></h2>
                <p className="mt-4 text-gray-600">Partner with FreshXpress today and experience a revolutionary approach to fresh produce delivery. Enhance your business or community living with our reliable, fresh, and efficient services.</p>
                <p className="mt-4 text-gray-600">Contact FreshXpress today for freshness, convenience, and quality like never before.</p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-[#00843D]" />
                    <p>2nd floor, 635, 7th main road, 2nd stage, Indiranagar, Bengaluru, Urban, Karnataka, 560038</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="text-[#00843D]" />
                    <p>044-4827829</p>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <Input placeholder="Enter your name" />
                <Input placeholder="Enter your contact number" />
                <Input placeholder="Enter your business name" />
                <Input placeholder="Business Type" />
                <Button className="w-full bg-[#00843D] hover:bg-[#00843D]/90">Let&apos;s Talk</Button>
              </form>
            </div>
          </div>
        </section>

        {/* Store Locations Section */}
        <section className="py-16 bg-[#FFF9EA]">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  Why choose{" "}
                  <span className="text-[#00843D]">FreshXpress</span>?
                </h2>
                <p className="text-gray-600">
                  <strong>Farm Direct Sourcing:</strong> Direct connections with farmers and FPOs, eliminating intermediaries for fairer prices and fresher produce.
                  <br />
                  <strong>Tech-Enabled Operations:</strong> Advanced technology streamlining supply chain management, farmer onboarding, and transaction transparency.
                  <br />
                  <strong>Superior Quality Control:</strong> Rigorous quality checks to ensure premium-grade produce consistently meets the highest standards.
                  <br />
                  <strong>Comprehensive Range:</strong> A diverse selection of seasonal and exotic produce, available year-round to meet unique business needs.
                  <br />
                </p>
                <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full border-2 border-[#00843D] flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#00843D]" />
                    </div>
                    <span>Chennai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full border-2 border-[#00843D] flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#00843D]" />
                    </div>
                    <span>Bengaluru</span>
                  </div>
                </div>
                {/* <Button className="bg-[#00843D] hover:bg-[#00843D]/90">Locate Our Stores</Button> */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={`/store.png`}
                      alt={`Store ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-center text-3xl font-bold mb-12">
              <span className="text-[#00843D]">500+ clients</span> have put their trust in us.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative h-16">
                  <Image
                    src={`/client.png`}
                    alt={`Client ${i}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="border-[#00843D] text-[#00843D] hover:bg-[#00843D] hover:text-white">
                View Our Clientele
              </Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        {/* <section className="py-16">
          <div className="container flex justify-between items-center flex-col gap-8">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
              Get Started with <span className="text-[#FFA500]">FreshXpress</span>
            </h2>
            <Link href="/enquiry">
              <Button className="hidden md:inline-flex text-white bg-[#00843D] hover:bg-[#00843D]/90">Explore Now</Button>
            </Link>
          </div>
        </section> */}

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-center text-3xl font-bold mb-12">What our customers say about us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "S. Kamalakshman",
                  role: "Executive Chef @ The Living Room",
                  content:
                    "The Madras Mandi team has been prompt, perfect and punctual with their services. They have been honest in accepting their mistakes and making replacement quickly. The team is extremely responsible and disciplined.",
                },
                {
                  name: "Hyma",
                  role: "Owner @Krishna Deli",
                  content:
                    "We have been associated with Madras Mandi for the past 2 years. Their commitment to quality and delivery timelines are highly commendable. They are quick to see through calls to super easy to use. Our specific requirements are taken care of and they understand our business needs and are ever accommodating. Kudos to team Madras Mandi.",
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <p className="text-gray-600 italic">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-2 w-2 rounded-full ${i === 1 ? "bg-[#00843D]" : "bg-gray-300"}`} />
              ))}
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold">Download the App</h2>
                <p className="mt-4 text-gray-600">
                  The only freshly picked fruits and vegetables delivery service you&apos;ll ever need. Download the app and
                  start filling up the cart today!
                </p>
                <div className="flex space-x-4 mt-8">
                  <Link href="#">
                    <Image
                      src="/google.png"
                      alt="Get it on Google Play"
                      width={85}
                      height={20}
                    />
                  </Link>
                  <Link href="#">
                    <Image
                      src="/play.png"
                      alt="Download on the App Store"
                      width={85}
                      height={20}
                    />
                  </Link>
                </div>
              </div>
              <div className="relative h-[600px]">
                <Image src="/img.jpg" alt="App preview" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1F3327] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/img.jpg"
                alt="Madras Mandi"
                width={120}
                height={40}
                className="mb-4"
              />
              <p className="text-sm">Tech20 Pvt Private Limited</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Explore Products</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#">About us</Link>
                </li>
                <li>
                  <Link href="#">How it works?</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Our Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#">Contact us</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow us on</h3>
              <div className="flex space-x-4">
                <Link href="#">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-sm text-center">
            <div className="flex justify-center space-x-4">
              <Link href="#">Terms and Condition</Link>
              <Link href="#">Our Privacy Policy</Link>
              <Link href="#">Shipping Details</Link>
              <Link href="#">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
