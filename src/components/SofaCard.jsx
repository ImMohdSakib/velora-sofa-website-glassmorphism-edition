import { Heart, Star, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function SofaCard({ sofa, onView }){
  const { toggle, isWishlisted } = useWishlist()
  const { addToCart } = useCart()
  const wished = isWishlisted(sofa.id)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative rounded-[26px] glass-premium glass-hover shine-hover p-2.5 flex flex-col transition-all duration-300 noise-overlay"
    >
      {/* Image */}
      <div className="relative rounded-[20px] overflow-hidden bg-black/25 aspect-[4/3]">
        <img
          src={sofa.image}
          alt={sofa.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
        />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 rounded-full glass-strong text-[10px] tracking-wide text-white/90 font-medium border border-white/20">
            {sofa.category.replace(' Sofas', '')}
          </span>
          {sofa.discount > 0 && (
            <span className="px-3 py-1 rounded-full gold-gradient text-[10px] text-[#07111F] font-bold shadow-[0_4px_12px_rgba(212,183,143,0.4)]">
              -{sofa.discount}%
            </span>
          )}
        </div>

        <button
          aria-label="wishlist"
          onClick={(e) => { e.stopPropagation(); toggle(sofa) }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            wished
              ? 'bg-white text-[#07111F] shadow-[0_4px_16px_rgba(255,255,255,0.3)]'
              : 'glass-strong hover:bg-white/20 border border-white/20'
          }`}
        >
          <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-[11px] text-white/45">
          <Star size={11} className="fill-[#D4B78F] text-[#D4B78F]" />
          <span className="text-[#D4B78F] font-medium">{sofa.rating}</span>
          <span className="text-white/30">({sofa.reviewCount})</span>
          <span className="ml-auto text-white/35 truncate max-w-[45%]">{sofa.material} · {sofa.color}</span>
        </div>

        <h3 className="mt-2.5 font-serif text-[18px] font-medium leading-snug tracking-tight group-hover:text-[#E8D5B5] transition-colors duration-300">
          {sofa.name}
        </h3>
        <p className="mt-1.5 text-[13px] text-white/50 line-clamp-2 leading-relaxed">{sofa.shortDescription}</p>

        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-[19px] font-semibold tracking-tight">${sofa.price.toLocaleString()}</p>
            {sofa.originalPrice > sofa.price && (
              <p className="text-[11px] line-through text-white/30">${sofa.originalPrice.toLocaleString()}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onView(sofa)}
              className="px-4 py-2 rounded-full glass-strong text-[12px] border border-white/15 hover:bg-white hover:text-[#07111F] transition-all duration-300"
            >
              View
            </button>
            <button
              onClick={() => addToCart(sofa)}
              className="w-9 h-9 rounded-full btn-premium flex items-center justify-center"
              aria-label="Add to cart"
            >
              <ShoppingBag size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
