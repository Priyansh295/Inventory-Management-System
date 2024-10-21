import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const featuredVehicles = [
  { id: 1, name: 'Toyota Camry', price: 1825000, image: '/images/toyota-camry.jpeg' },
  { id: 2, name: 'Chevrolet', price: 2190000, image: '/images/chevrolet.jpeg' },
]

const specialOffers = [
  { id: 1, name: 'Ford F-150', discount: '20% off', image: '/images/ford-150.jpeg' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#002347] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">AutoMart</h1>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for vehicles..."
                className="pl-10 pr-4 py-2 w-64 text-gray-900"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span>Currency</span>
                <ChevronDown size={16} />
              </div>
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </div>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#002347]">
                Sign In
              </Button>
            </div>
          </div>
        </div>
        <nav className="bg-[#003b4b] py-2">
          <div className="container mx-auto px-4">
            <ul className="flex space-x-6 text-sm">
              <li><Link href="/cars" className="hover:text-gray-300">Cars</Link></li>
              <li><Link href="/trucks" className="hover:text-gray-300">Trucks</Link></li>
              <li><Link href="/suvs" className="hover:text-gray-300">SUVs</Link></li>
              <li><Link href="/offers" className="hover:text-gray-300">Special Offers</Link></li>
              <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    width={300}
                    height={200}
                    layout="responsive"
                    className="rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                  <p className="text-gray-600">Price: Rs {vehicle.price.toLocaleString()}</p>
                  <Button asChild className="mt-4 w-full">
                    <Link href="/products">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <Image
                    src={offer.image}
                    alt={offer.name}
                    width={300}
                    height={200}
                    layout="responsive"
                    className="rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg">{offer.name}</h3>
                  <p className="text-green-600 font-semibold">{offer.discount} on SUVs this month</p>
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <Link href="/products">View Offer</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed">
            AutoMart is dedicated to providing high-quality vehicles with exceptional service.
            Explore our range of cars, trucks, and SUVs to find the perfect vehicle for you.
            With our commitment to customer satisfaction and a wide selection of vehicles,
            we're your trusted partner in finding the ideal automobile for your needs.
          </p>
        </section>
      </main>

      <footer className="bg-[#002347] text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="mb-4">Stay updated with our latest offers and news</p>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow mr-2 text-gray-900"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2024 AutoMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}