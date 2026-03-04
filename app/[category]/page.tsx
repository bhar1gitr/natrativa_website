"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
// import Footer from "@/components/footer"

export default function CategoryPage() {
  const { category } = useParams()
  const { addToCart } = useCart()
  const [activeSub, setActiveSub] = useState("All")

  // Reset filter when the main category changes (e.g., switching from Pants to T-shirts)
  useEffect(() => {
    setActiveSub("All")
  }, [category])

  // 1. Dynamic Subcategory Logic
  const subCategories = useMemo(() => {
    // Specific filters for T-shirts
    if (category === "tshirts") {
      return ["All", "Spiritual", "Marvel", "Embroidery"]
    }
    
    // Specific filters for Pants
    if (category === "pants") {
      return ["All", "Relax Chinos", "Pull on Denim", "Jogger", "Trouser", "Embroidery"]
    }

    // Specific filters for Shirts
    if (category === "shirts") {
      return ["All", "Polo", "Classic", "Formal"]
    }

    // Default for Bags or others
    return ["All", "Signature", "Limited"]
  }, [category])

  // Unified Data Source
  const masterData = useMemo(() => [
    // TSHIRTS ONLY
    { id: 1, type: "tshirts", sub: "Spiritual", name: "Zen Oversize", price: "₹1,499", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800" },
    { id: 2, type: "tshirts", sub: "Marvel", name: "Iron Avenger Tee", price: "₹1,699", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800" },
    
    // PANTS ONLY
    { id: 3, type: "pants", sub: "Embroidery", name: "Stitched Cargo", price: "₹2,999", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800" },
    { id: 5, type: "pants", sub: "Relax Chinos", name: "Classic Chino", price: "₹2,499", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800" },
    { id: 6, type: "pants", sub: "Pull on Denim", name: "Raw Denim", price: "₹3,299", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800" },
    { id: 7, type: "pants", sub: "Jogger", name: "Urban Jogger", price: "₹1,999", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800" },
    { id: 8, type: "pants", sub: "Trouser", name: "Formal Trouser", price: "₹3,999", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800" },
    
    // SHIRTS ONLY
    { id: 4, type: "shirts", sub: "Polo", name: "Royal Knit Polo", price: "₹2,299", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800" },
  ], [])

  // Smart Filter: Filter by main category (URL) AND sub-category (Button)
  const displayItems = masterData.filter(item => 
    item.type === category && (activeSub === "All" || item.sub === activeSub)
  )

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-32 pb-20 max-w-[1800px] mx-auto px-6 lg:px-24">
        {/* Dynamic Title */}
        <div className="mb-12">
          <p className="text-[#d4af37] text-xs tracking-[0.5em] uppercase mb-2">Category</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter">{category}</h1>
        </div>

        {/* Dynamic Sub-category Navigation */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar border-y border-zinc-900 py-6 mb-12">
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`text-[10px] whitespace-nowrap uppercase tracking-[0.3em] font-bold transition-all ${
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
          <div className="py-20 text-center text-zinc-600 uppercase tracking-widest text-xs border border-dashed border-zinc-900">
            No {activeSub !== "All" ? activeSub : ""} {category} currently in the archive.
          </div>
        )}
      </div>
    </main>
  )
}