"use client"

import { useCart } from "@/context/cart-context"
import { X, Plus, Minus, Trash2 } from "lucide-react"

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) return
    const cartSummary = items
      .map((item) => `${item.name} (x${item.quantity}) - $${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}`)
      .join("\n")

    const message = `Greetings NETRUTV Concierge. I would like to finalize my collection:\n\n${cartSummary}\n\nTotal Value: $${total}`
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, "_blank")
    clearCart()
    onClose()
  }

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose} 
      />

      {/* Sidebar Panel */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-[#050505] z-[70] shadow-2xl border-l border-[#d4af37]/20 transform transition-transform duration-700 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-8 border-b border-zinc-900 flex justify-between items-center">
          <div>
            <h2 className="font-playfair text-2xl text-white font-bold">Your Collection</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#d4af37] mt-1">Netrutv Curated Selection</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 h-[calc(100vh-250px)]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <p className="font-playfair italic text-xl text-zinc-500">The collection is empty</p>
              <button onClick={onClose} className="mt-4 text-[10px] uppercase tracking-widest text-[#d4af37] underline underline-offset-8">Return to Gallery</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6 group">
                <div className="relative w-20 h-24 bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-white tracking-wide uppercase">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-[#d4af37] font-playfair italic text-lg">{item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-zinc-800 rounded-sm">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-zinc-400 hover:text-white transition-colors"><Minus size={12}/></button>
                      <span className="px-2 text-xs text-white tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-zinc-400 hover:text-white transition-colors"><Plus size={12}/></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full p-8 bg-black border-t border-zinc-900 space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Subtotal Value</span>
              <span className="text-2xl font-playfair text-[#d4af37]">${total}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#d4af37] text-black py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
            >
              Finalize Order via Concierge
            </button>
          </div>
        )}
      </div>
    </>
  )
}