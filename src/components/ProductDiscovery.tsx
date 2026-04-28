import { motion } from "motion/react";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

const products = [
  {
    name: "Terracotta Water Bottle",
    category: "Home",
    score: 98,
    price: "₹149",
    image: "https://images.unsplash.com/photo-1610631979927-4a0050860538?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Neem Wood Comb Set",
    category: "Personal Care",
    score: 92,
    price: "₹199",
    image: "https://images.unsplash.com/photo-1620668102955-233ed1f49e49?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Handmade Bamboo Tote",
    category: "Lifestyle",
    score: 95,
    price: "₹120",
    image: "https://images.unsplash.com/photo-1591336335914-996403689bed?auto=format&fit=crop&q=80&w=400",
  },
];

export function ProductDiscovery() {
  const [filter, setFilter] = useState("all");

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-2 gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Eco Discovery</h2>
          <p className="text-sm opacity-50 font-medium">Curated sustainable choices for everyone</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-slate-900/50 p-1 rounded-full border border-gray-200 dark:border-slate-800">
          {["All", "Home", "Lifestyle", "Personal Care"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f.toLowerCase())}
              className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
                filter === f.toLowerCase() 
                  ? "bg-white dark:bg-slate-800 text-emerald-500 shadow-sm" 
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-gradient-to-br dark:from-slate-900/40 dark:to-black rounded-4xl border border-gray-100 dark:border-slate-800/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
                <Star size={10} fill="currentColor" />
                {product.score} Impact
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">{product.category}</p>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg truncate pr-2">{product.name}</h3>
                  <span className="font-bold text-lg text-white">{product.price}</span>
                </div>
              </div>
              <button className="w-full py-3.5 bg-gray-50 dark:bg-white/5 hover:bg-emerald-500 hover:text-white transition-all rounded-2xl text-xs font-bold flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                <ShoppingCart size={16} />
                Acquire Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
