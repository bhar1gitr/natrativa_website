"use client"

import { useState, useEffect, useMemo } from "react"
import { useCart } from "@/context/cart-context"

export default function CollectionsPage() {
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState("All")
  const [isVisible, setIsVisible] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleCategoryChange = (cat: string) => {
    setIsFiltering(true)
    setActiveCategory(cat)
    setTimeout(() => setIsFiltering(false), 400) // Smooth transition for grid
  }

  const categories = ["All", "Polos", "Drop Shoulder", "Bottoms", "Outerwear"]

  // Extended Luxury Data with High-Res Fashion Images & Badges
  const masterCollection = useMemo(() => [
    { id: 101, name: "Executive Piqué Polo", price: "₹4,499", category: "Polos", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80", badge: "New" },
{ id: 102, name: "Regent Knit Polo", price: "₹5,299", category: "Polos", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80" },
    { id: 103, name: "Monarch Zip Polo", price: "₹5,899", category: "Polos", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80" },
    
    { id: 201, name: "Command Oversized", price: "₹3,999", category: "Drop Shoulder", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80" },
    { id: 202, name: "Vanguard Drop-Tee", price: "₹4,199", category: "Drop Shoulder", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80", badge: "Signature" },
    { id: 203, name: "Apex Heavyweight", price: "₹4,899", category: "Drop Shoulder", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80" },
    
    { id: 301, name: "Signature Chinos", price: "₹7,999", category: "Bottoms", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80" },
    { id: 302, name: "Tactical Trousers", price: "₹8,499", category: "Bottoms", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80", badge: "Sold Out" },
    { id: 303, name: "Linear Relaxed Fit", price: "₹6,999", category: "Bottoms", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80" },
    
    { id: 401, name: "Obsidian Bomber", price: "₹14,999", category: "Outerwear", image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80", badge: "Limited" },
    { id: 402, name: "Slate Overcoat", price: "₹22,499", category: "Outerwear", image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80" },
  ], [])

  const filteredItems = activeCategory === "All" 
    ? masterCollection 
    : masterCollection.filter(item => item.category === activeCategory)

  // Split into triads
  const col1 = filteredItems.filter((_, i) => i % 3 === 0)
  const col2 = filteredItems.filter((_, i) => i % 3 === 1)
  const col3 = filteredItems.filter((_, i) => i % 3 === 2)

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-32 overflow-hidden selection:bg-[#d4af37] selection:text-black relative">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal-anim {
          opacity: 0;
          animation: fadeInUp 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* DYNAMIC BACKGROUND WATERMARK */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.02]">
         <p className="text-[25vw] font-black uppercase tracking-tighter transition-all duration-1000">
           {activeCategory === "All" ? "Archive" : activeCategory}
         </p>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        
        {/* HEADER & FILTER */}
        <header className="mb-24 reveal-anim space-y-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-[#d4af37]" />
              <p className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.5em]">The 2026 Archive</p>
            </div>
            <h1 className="font-playfair text-6xl md:text-9xl font-bold tracking-tighter leading-none">
              Selected <span className="italic font-normal text-zinc-600">Pieces.</span>
            </h1>
          </div>

          <div className="flex items-center gap-8 md:gap-16 overflow-x-auto no-scrollbar py-4 border-y border-zinc-900/50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 whitespace-nowrap relative pb-2 ${
                  activeCategory === cat ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-white'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d4af37] transition-all" />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* STAGGERED TRIAD GRID */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 transition-opacity duration-500 ${isFiltering ? 'opacity-0' : 'opacity-100'}`}>
          
          <div className="space-y-16 md:space-y-32">
            {col1.map((item, i) => <ProductCard key={item.id} product={item} addToCart={addToCart} index={i} />)}
          </div>

          <div className="space-y-16 md:space-y-32 md:mt-40">
            {col2.map((item, i) => <ProductCard key={item.id} product={item} addToCart={addToCart} index={i} />)}
          </div>

          <div className="space-y-16 md:space-y-32 md:mt-80">
            {col3.map((item, i) => <ProductCard key={item.id} product={item} addToCart={addToCart} index={i} />)}
          </div>

        </div>
      </div>
    </main>
  )
}

function ProductCard({ product, addToCart, index }: { product: any, addToCart: any, index: number }) {
  const isSoldOut = product.badge === "Sold Out"

  return (
    <div className="group relative reveal-anim" style={{ animationDelay: `${index * 0.15}s` }}>
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-zinc-950 border border-zinc-900/50 transition-all duration-1000 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
        
        {/* Dynamic Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className={`text-[8px] uppercase tracking-[0.3em] font-bold px-3 py-1 ${
              isSoldOut ? 'bg-zinc-800 text-zinc-400' : 'bg-[#d4af37] text-black'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-[2.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105 ${
            isSoldOut ? 'grayscale opacity-50' : 'grayscale-[40%] group-hover:grayscale-0'
          }`}
        />
        
        {/* Hover Action Overlay */}
        {!isSoldOut && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8 backdrop-blur-sm">
            <div className="w-12 h-[1px] bg-[#d4af37] mb-6 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-700" />
            <button
              onClick={() => addToCart({ ...product })}
              className="w-full max-w-[200px] border border-[#d4af37] text-[#d4af37] py-4 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-all transform translate-y-8 group-hover:translate-y-0 duration-700"
            >
              Add to Selection
            </button>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="px-2">
        <div className="flex justify-between items-start border-l border-zinc-800 pl-4 group-hover:border-[#d4af37] transition-colors duration-700">
          <div>
            <h4 className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-colors ${isSoldOut ? 'text-zinc-600' : 'text-zinc-400 group-hover:text-white'}`}>
              {product.name}
            </h4>
            <p className={`font-playfair italic text-xl tracking-wider mt-2 ${isSoldOut ? 'text-zinc-600' : 'text-white'}`}>
              {product.price}
            </p>
          </div>
          <span className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest mt-1">Ref. {product.id}</span>
        </div>
      </div>
    </div>
  )
}