"use client"

import { useState, useEffect, useMemo } from "react"
import { useCart } from "@/context/cart-context"

/**
 * COLLECTIONS PAGE
 * Features: Multi-select filtering, staggered triad grid layout, 
 * luxury watermark background, and smooth transition animations.
 */
export default function CollectionsPage() {
  const { addToCart } = useCart()
  
  // Filter States
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeTheme, setActiveTheme] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  
  // UI States
  const [isFiltering, setIsFiltering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Filter Options
  const categories = ["All", "T-Shirts", "Shirts", "Pants", "Bags"]
  const themes = ["All", "Spiritual", "Marvel", "Embroidery", "Polo"]
  const priceFilters = [
    { label: "All", min: 0, max: 1000000 },
    { label: "Under ₹3,000", min: 0, max: 3000 },
    { label: "₹3,000 - ₹7,000", min: 3000, max: 7000 },
    { label: "Luxury (₹7k+)", min: 7000, max: 1000000 }
  ]

  const handleFilterChange = (setter: Function, value: any) => {
    setIsFiltering(true)
    setter(value)
    // Small timeout to allow grid items to fade out/in smoothly
    setTimeout(() => setIsFiltering(false), 400)
  }

  // Master Data Source
  const masterCollection = useMemo(() => [
    // Spiritual & Space
    { id: 101, name: "Celestial Nirvana", price: 2499, category: "T-Shirts", theme: "Spiritual", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800", badge: "New" },
    { id: 102, name: "Zenith Oversize", price: 2899, category: "T-Shirts", theme: "Spiritual", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800" },
    
    // Marvel & Anime
    { id: 201, name: "Iron Avenger Tee", price: 3499, category: "T-Shirts", theme: "Marvel", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800", badge: "Limited" },
    { id: 202, name: "Ronin Katana Tee", price: 3199, category: "T-Shirts", theme: "Marvel", image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800" },
    
    // Embroidery
    { id: 301, name: "Crane Stitch Cargo", price: 8999, category: "Pants", theme: "Embroidery", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800", badge: "Signature" },
    { id: 302, name: "Midnight Rose Chino", price: 7499, category: "Pants", theme: "Embroidery", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800" },

    // Polos
    { id: 401, name: "Executive Piqué", price: 4499, category: "Shirts", theme: "Polo", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800" },
    { id: 402, name: "Monarch Knit", price: 5899, category: "Shirts", theme: "Polo", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800" },

    // Accessories/Bags
    { id: 501, name: "Obsidian Duffel", price: 12499, category: "Bags", theme: "Polo", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800", badge: "Sold Out" },
  ], [])

  // Combined Filter Logic
  const filteredItems = useMemo(() => {
    return masterCollection.filter(item => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchTheme = activeTheme === "All" || item.theme === activeTheme;
      
      const currentPriceObj = priceFilters.find(p => p.label === priceRange);
      const matchPrice = item.price >= (currentPriceObj?.min || 0) && item.price <= (currentPriceObj?.max || 1000000);
      
      return matchCategory && matchTheme && matchPrice;
    })
  }, [activeCategory, activeTheme, priceRange, masterCollection])

  // Split filtered items into 3 columns for the staggered effect
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
         <p className="text-[20vw] font-black uppercase tracking-tighter transition-all duration-1000">
           {activeCategory === "All" ? "Archive" : activeCategory}
         </p>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-24 relative z-10">
        
        {/* HEADER & FILTERS */}
        <header className="mb-24 reveal-anim">
          <div className="max-w-4xl mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-[#d4af37]" />
              <p className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.5em]">The 2026 Archive</p>
            </div>
            <h1 className="font-playfair text-7xl md:text-9xl font-bold tracking-tighter leading-none">
              Selected <span className="italic font-normal text-zinc-600">Pieces.</span>
            </h1>
          </div>

          {/* MULTI-LEVEL FILTER CONTROLS */}
          <div className="space-y-8 border-y border-zinc-900/50 py-12 no-scrollbar overflow-x-auto">
            
            {/* 1. Category Filter */}
            <div className="flex items-center gap-x-12 whitespace-nowrap">
              <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold min-w-[120px]">Category /</span>
              <div className="flex gap-8">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => handleFilterChange(setActiveCategory, cat)}
                    className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${activeCategory === cat ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-white'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Theme Filter */}
            <div className="flex items-center gap-x-12 whitespace-nowrap">
              <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold min-w-[120px]">Theme /</span>
              <div className="flex gap-8">
                {themes.map((t) => (
                  <button key={t} onClick={() => handleFilterChange(setActiveTheme, t)}
                    className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${activeTheme === t ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-white'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Price Filter */}
            <div className="flex items-center gap-x-12 whitespace-nowrap">
              <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold min-w-[120px]">Investment /</span>
              <div className="flex gap-8">
                {priceFilters.map((p) => (
                  <button key={p.label} onClick={() => handleFilterChange(setPriceRange, p.label)}
                    className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${priceRange === p.label ? 'text-[#d4af37]' : 'text-zinc-600 hover:text-white'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* STAGGERED TRIAD GRID */}
        {filteredItems.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 transition-opacity duration-500 ${isFiltering ? 'opacity-0' : 'opacity-100'}`}>
            {/* Column 1 */}
            <div className="space-y-16 md:space-y-32">
              {col1.map((item, i) => <ProductCard key={item.id} product={item} addToCart={addToCart} index={i} />)}
            </div>

            {/* Column 2 - Pushed down */}
            <div className="space-y-16 md:space-y-32 md:mt-40">
              {col2.map((item, i) => <ProductCard key={item.id} product={item} addToCart={addToCart} index={i} />)}
            </div>

            {/* Column 3 - Pushed down further */}
            <div className="space-y-16 md:space-y-32 md:mt-80">
              {col3.map((item, i) => <ProductCard key={item.id} product={item} addToCart={addToCart} index={i} />)}
            </div>
          </div>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-sm">
            <p className="text-zinc-600 uppercase tracking-[0.5em] text-[10px] mb-4">No matching pieces</p>
            <button onClick={() => {setActiveCategory("All"); setActiveTheme("All"); setPriceRange("All")}} className="text-[#d4af37] text-[9px] uppercase font-bold border-b border-[#d4af37] pb-1">Reset Filters</button>
          </div>
        )}
      </div>
    </main>
  )
}

/**
 * PRODUCT CARD COMPONENT
 */
function ProductCard({ product, addToCart, index }: { product: any, addToCart: any, index: number }) {
  const isSoldOut = product.badge === "Sold Out"

  return (
    <div className="group relative reveal-anim" style={{ animationDelay: `${index * 0.1}s` }}>
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-zinc-950 border border-zinc-900/50 transition-all duration-1000 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_0_50px_rgba(212,175,55,0.1)]">
        
        {/* Dynamic Badge */}
        {product.badge && (
          <div className="absolute top-5 left-5 z-20">
            <span className={`text-[8px] uppercase tracking-[0.3em] font-bold px-3 py-1.5 ${
              isSoldOut ? 'bg-zinc-800 text-zinc-400' : 'bg-[#d4af37] text-black'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105 ${
            isSoldOut ? 'grayscale opacity-50' : 'grayscale-[30%] group-hover:grayscale-0'
          }`}
        />
        
        {/* Action Overlay */}
        {!isSoldOut && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8 backdrop-blur-[2px]">
            <div className="w-12 h-[1px] bg-[#d4af37] mb-6 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-700" />
            <button
              onClick={() => addToCart({ ...product })}
              className="w-full max-w-[220px] border border-[#d4af37] text-[#d4af37] py-4 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-[#d4af37] hover:text-black transition-all transform translate-y-8 group-hover:translate-y-0 duration-700"
            >
              Add to Selection
            </button>
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="px-2">
        <div className="flex justify-between items-start border-l border-zinc-800 pl-4 group-hover:border-[#d4af37] transition-colors duration-700">
          <div>
            <h4 className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-colors ${isSoldOut ? 'text-zinc-600' : 'text-zinc-400 group-hover:text-white'}`}>
              {product.name}
            </h4>
            <p className={`font-playfair italic text-2xl tracking-wider mt-3 ${isSoldOut ? 'text-zinc-600' : 'text-white'}`}>
              ₹{product.price.toLocaleString()}
            </p>
          </div>
          <span className="text-[8px] text-zinc-800 font-bold uppercase tracking-widest mt-1">REF: {product.id}</span>
        </div>
      </div>
    </div>
  )
}