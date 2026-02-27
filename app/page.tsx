"use client"

import { CartProvider } from "@/context/cart-context"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Products from "@/components/products"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <CartProvider>
      <main className="min-h-screen bg-white text-black">
        <Header />
        <Hero />
        <Products />
        <About />
        <Contact />
        <Footer />
      </main>
    </CartProvider>
  )
}
