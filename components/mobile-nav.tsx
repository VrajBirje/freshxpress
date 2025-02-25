import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="text-lg font-medium hover:text-primary">
            Home
          </Link>
          <Link href="#" className="text-lg font-medium hover:text-primary">
            For Business
          </Link>
          <Link href="#" className="text-lg font-medium hover:text-primary">
            Our Products
          </Link>
          <Link href="#" className="text-lg font-medium hover:text-primary">
            How It Works
          </Link>
          <Link href="#" className="text-lg font-medium hover:text-primary">
            About Us
          </Link>
          <Link href="#" className="text-lg font-medium hover:text-primary">
            Blogs
          </Link>
          <Button className="w-full bg-[#00843D] hover:bg-[#00843D]/90">Order Now</Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

