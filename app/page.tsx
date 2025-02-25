import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, MapPin, Phone } from "lucide-react"
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav"

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
  {
    name: "Mango Konkan",
    price: "₹29/kg",
    image: "/img.jpg",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/img.jpg"
              alt="Madras Mandi"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
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
              <Button className="hidden md:inline-flex text-white bg-[#00843D] hover:bg-[#00843D]/90">Join Now</Button>
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] bg-[#00843D]/10">
          <Image
            src="/img.jpg"
            alt="Fresh vegetables"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40">
            <div className="container h-full flex flex-col justify-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Freshly Harvested</h1>
              <p className="text-xl mb-8">Delivered to your doorstep</p>
              <Button className="w-fit bg-[#00843D] hover:bg-[#00843D]/90">Explore now</Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container flex justify-between items-center flex-col gap-10">
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
              <h2 className="text-3xl font-bold mt-2">Our farmers are our heroes!</h2>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                Cultivating the culture of fair trade since 1970. At Madras Mandi, we ensure every farmer earns a
                profit. We deliver goodness of food, heart and everything else that sets us apart!
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative h-64">
                  <Image
                    src={`/image.png`}
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
                <h2 className="text-3xl font-bold mt-2">Chennai's largest B2B fresh produce distributor</h2>
                <p className="mt-4 text-gray-600">
                  Our business model revolves around a B2B wholesale model that continues to evolve and customize
                  services. We maintain high retail and supply chain standards to ensure our produce is delivered to our
                  partners fresh and on time!
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {["Low prices", "99.99% fulfillment", "12 Hour delivery", "Ease of ordering"].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2 text-sm">
                      <div className="h-2 w-2 bg-[#00843D] rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-[#F5FFF5]">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold">Get in touch with us for business</h2>
                <p className="mt-4 text-gray-600">Leave us your details below and we'll get in touch with you</p>
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
                <Button className="w-full bg-[#00843D] hover:bg-[#00843D]/90">Let's Talk</Button>
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
                  For an enhanced experience, visit any of our exclusive{" "}
                  <span className="text-[#00843D]">Madras Mandi Store</span> near you
                </h2>
                <p className="text-gray-600">
                  Our exclusive stores guarantee a wide variety of fresh produce, top quality at affordable prices! An
                  experience to remember!
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
                <Button className="bg-[#00843D] hover:bg-[#00843D]/90">Locate Our Stores</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={`/image.png`}
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
                    src={`/image.png`}
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
                  The only freshly picked fruits and vegetables delivery service you'll ever need. Download the app and
                  start filling up the cart today!
                </p>
                <div className="flex space-x-4 mt-8">
                  <Link href="#">
                    <Image
                      src="/placeholder.svg?height=40&width=135"
                      alt="Get it on Google Play"
                      width={135}
                      height={40}
                    />
                  </Link>
                  <Link href="#">
                    <Image
                      src="/placeholder.svg?height=40&width=135"
                      alt="Download on the App Store"
                      width={135}
                      height={40}
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

