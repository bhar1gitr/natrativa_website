// "use client"

// import { useParams } from "next/navigation"
// import { products } from "../../lib/products"
// import { useCart } from "@/context/cart-context"

// export default function ProductDetails() {

//   const { id } = useParams()
//   const { addToCart } = useCart()

//   const product = products.find(p => p.id === Number(id))

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Product not found
//       </div>
//     )
//   }

//   const isSoldOut = product.badge === "Sold Out"

//   return (
//     <main className="min-h-screen bg-black text-white pt-40 pb-24 px-6">

//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

//         {/* IMAGE */}
//         <div className="border border-zinc-800 p-4">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full object-cover"
//           />
//         </div>

//         {/* DETAILS */}
//         <div>

//           <h1 className="text-5xl font-bold mb-6">
//             {product.name}
//           </h1>

//           <p className="text-3xl text-[#d4af37] mb-6">
//             ₹{product.price.toLocaleString()}
//           </p>

//           <p className="text-zinc-400 mb-10 leading-relaxed">
//             {product.description}
//           </p>

//           <div className="space-y-3 text-sm text-zinc-500 mb-10">
//             <p>Category: {product.category}</p>
//             <p>Theme: {product.theme}</p>
//             <p>Product ID: {product.id}</p>
//           </div>

//           {!isSoldOut && (
//             <button
//               onClick={() => addToCart(product)}
//               className="border border-[#d4af37] text-[#d4af37] px-10 py-4 uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition"
//             >
//               Add to Cart
//             </button>
//           )}

//           {isSoldOut && (
//             <p className="text-zinc-500 uppercase">
//               Sold Out
//             </p>
//           )}

//         </div>

//       </div>

//     </main>
//   )
// }

"use client"

import { useParams } from "next/navigation"
import { products } from "../../lib/products"
import { useCart } from "@/context/cart-context"
import TshirtViewer from "@/components/TshirtViewer"

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Product not found
      </div>
    )
  }

  const isSoldOut = product.badge === "Sold Out"

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

        {/* LEFT COLUMN: 3D INTERACTIVE VIEW */}
        <div className="space-y-4">
          <TshirtViewer />
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
              Interactive 3D Model
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
              Drag to Rotate
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div>
          <h1 className="text-5xl font-bold mb-6 italic tracking-tight">
            {product.name}
          </h1>

          <p className="text-3xl text-[#d4af37] mb-6 font-light">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="text-zinc-400 mb-10 leading-relaxed max-w-md">
            {product.description}
          </p>

          <div className="space-y-3 text-sm text-zinc-500 mb-10 border-t border-zinc-800 pt-6">
            <p><span className="text-zinc-300">Category:</span> {product.category}</p>
            <p><span className="text-zinc-300">Theme:</span> {product.theme}</p>
            <p><span className="text-zinc-300">Product ID:</span> #{product.id}</p>
          </div>

          {!isSoldOut ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full md:w-auto border border-[#d4af37] text-[#d4af37] px-12 py-4 uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all duration-300"
            >
              Add to Cart
            </button>
          ) : (
            <div className="inline-block border border-zinc-700 text-zinc-500 px-12 py-4 uppercase tracking-widest">
              Sold Out
            </div>
          )}
        </div>
      </div>
    </main>
  )
}