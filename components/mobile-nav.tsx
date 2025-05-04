"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const MobileNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <nav className="flex flex-col space-y-4">
        <Link href="/" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              Home
            </Link>
            <Link href="#business" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              For Business
            </Link>
            <Link href="#farmer" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              For Farmers
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              Contact
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-800 hover:text-[#00843D] transition-colors">
              About Us
            </Link>
          <Link href="/join">
            <Button className="inline-flex text-white bg-[#00843D] hover:bg-[#00843D]/90 shadow-md transition-all duration-300 hover:shadow-lg">
              Join as Farmers
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

