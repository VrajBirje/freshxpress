import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
// import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
        <SheetTitle>Navigation Menu</SheetTitle>
        <nav className="flex flex-col space-y-4 mt-3">
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
          <Link href="/join">
            <Button className="w-full bg-[#00843D] hover:bg-[#00843D]/90 text-white">Join us</Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
