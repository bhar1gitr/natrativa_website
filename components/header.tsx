'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/cart-context'
import logo from '../public/logo.jpeg'
import CartSidebar from './CartSidebar' // Import the new component

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false) // Added state
  const [scrolled, setScrolled] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/95 backdrop-blur-xl py-3 border-b border-[#d4af37]/20 shadow-2xl' : 'bg-transparent py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="group flex items-center">
          <div className="relative h-10 w-40 sm:h-12 sm:w-48 transition-transform duration-500 group-hover:scale-105">
            <Image src={logo} alt="NETRUTV" fill className="object-contain" priority />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {['Collections', 'Our Story', 'Contact'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="relative text-[11px] uppercase tracking-[0.3em] font-medium text-zinc-300 hover:text-[#d4af37] transition-colors duration-300 group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-8">
          {/* CART BUTTON TRIGGERS SIDEBAR */}
          <button onClick={() => setIsCartOpen(true)} className="relative group p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white group-hover:text-[#d4af37] transition-colors">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#d4af37] text-black text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          {/* ... mobile menu button code ... */}
        </div>
      </nav>

      {/* Render the Animated Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}