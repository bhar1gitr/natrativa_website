"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CategoryPage() {
  const { category } = useParams()
  const { addToCart } = useCart()
  const [activeSub, setActiveSub] = useState("All")

  // The 5 Smart Subcategories
  const subCategories = ["All", "Spiritual", "Marvel", "Embroidery", "Polo"]

  // Unified Data Source
  const masterData = useMemo(() => [
    { id: 1, type: "tshirts", sub: "Spiritual", name: "Zen Oversize", price: "₹1,499", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800" },
    { id: 2, type: "tshirts", sub: "Marvel", name: "Iron Avenger Tee", price: "₹1,699", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800" },
    { id: 3, type: "pants", sub: "Embroidery", name: "Stitched Cargo", price: "₹2,999", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800" },
    { id: 4, type: "shirts", sub: "Polo", name: "Royal Knit Polo", price: "₹2,299", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800" },
    // Add more items following this pattern...
  ], [])

  // Smart Filter: Filter by main category (URL) AND sub-category (Button)
  const displayItems = masterData.filter(item => 
    item.type === category && (activeSub === "All" || item.sub === activeSub)
  )

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-32 pb-20 max-w-[1800px] mx-auto px-6 lg:px-24">
        {/* Dynamic Title based on URL */}
        <div className="mb-12">
          <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase mb-2">Category</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter">{category}</h1>
        </div>

        {/* Sub-category Navigation */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar border-y border-zinc-900 py-6 mb-12">
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all ${
                activeSub === sub ? "text-[#d4af37]" : "text-zinc-500 hover:text-white"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayItems.map((item) => (
              <div key={item.id} className="group">
                <div className="relative aspect-[3/4] bg-zinc-950 border border-zinc-900 overflow-hidden mb-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                  <button 
                    onClick={() => addToCart(item)}
                    className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Cart
                  </button>
                </div>
                <h3 className="text-xs uppercase tracking-widest text-zinc-400">{item.name}</h3>
                <p className="font-bold text-lg">{item.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-zinc-600 uppercase tracking-widest text-xs">
            No items found in {activeSub} {category}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}