import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Star, ShoppingBag, Heart } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductModal({ product, onClose }) {
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const sheetRef = useRef(null)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 200], [1, 0.4])

  useEffect(() => {
    if (!product) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [product])

  useEffect(() => {
    if (!product) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, onClose])

  // Reset qty when product changes
  useEffect(() => { setQty(1) }, [product?.id])

  if (!product) return null

  const wished = isWishlisted(product.id)

  const onDragEnd = (_, info) => {
    // Swipe down to close (mobile)
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="product-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center"
        style={{ minHeight: '100dvh' }}
      >
        {/* Backdrop — click anywhere here closes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/65 backdrop-blur-md"
          onClick={onClose}
          aria-hidden
        />

        {/* Sheet */}
        <motion.div
          ref={sheetRef}
          style={{ y, opacity }}
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.05, bottom: 0.55 }}
          onDragEnd={onDragEnd}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-5xl max-h-[92dvh] sm:max-h-[min(90vh,860px)] mx-0 sm:mx-4 mb-0 sm:mb-4 rounded-t-[24px] sm:rounded-[28px] glass-premium border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:grid md:grid-cols-2 touch-pan-y"
        >
          {/* Mobile drag handle */}
          <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing">
            <div className="w-10 h-1 rounded-full bg-white/30" />
          </div>

          {/* Image */}
          <div className="relative bg-black/30 p-2.5 sm:p-3 shrink-0 md:h-full md:min-h-0">
            <img
              src={product.gallery?.[0] || product.image}
              alt={product.name}
              className="w-full h-[200px] sm:h-[280px] md:h-full object-cover rounded-[18px] sm:rounded-[20px] pointer-events-none"
              draggable={false}
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full glass-strong flex items-center justify-center border border-white/15 hover:bg-white/15 z-10"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <button
              type="button"
              onClick={() => toggle(product)}
              className={`absolute top-4 left-4 sm:top-5 sm:left-5 w-10 h-10 rounded-full flex items-center justify-center border border-white/15 z-10 transition ${
                wished ? 'bg-white text-[#07111F]' : 'glass-strong hover:bg-white/15'
              }`}
              aria-label="Wishlist"
            >
              <Heart size={15} fill={wished ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col min-h-0 md:max-h-[min(90vh,860px)] overflow-hidden">
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                {product.category} · {product.material}
              </span>
              <h2 className="font-serif text-[26px] sm:text-[32px] leading-tight mt-2">
                {product.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-white/55">
                <Star size={14} className="fill-[#D4B78F] text-[#D4B78F]" />
                <span className="text-[#D4B78F]">{product.rating}</span>
                <span className="text-white/35">({product.reviewCount} reviews)</span>
                <span className="text-white/25">·</span>
                <span>{product.dimensions}</span>
                <span className="text-white/25">·</span>
                <span>{product.seatingCapacity} seater</span>
              </div>

              <p className="mt-5 sm:mt-6 text-[14px] leading-relaxed text-white/60">
                {product.description}
              </p>

              {product.features?.length > 0 && (
                <div className="mt-5 flex gap-2 flex-wrap">
                  {product.features.map(f => (
                    <span
                      key={f}
                      className="px-3 py-1.5 rounded-full glass-strong text-[11px] border border-white/10 text-white/70"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="glass rounded-xl p-3 border border-white/8">
                  <p className="text-[10px] uppercase tracking-widest text-white/35">Color</p>
                  <p className="mt-1 text-white/80">{product.color}</p>
                </div>
                <div className="glass rounded-xl p-3 border border-white/8">
                  <p className="text-[10px] uppercase tracking-widest text-white/35">In stock</p>
                  <p className="mt-1 text-white/80">{product.inStock ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="h-4 md:h-2" />
            </div>

            <div className="shrink-0 border-t border-white/10 px-5 sm:px-7 md:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[rgba(10,18,30,0.85)] backdrop-blur-xl safe-bottom">
              <div>
                <p className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  ${product.price?.toLocaleString()}
                </p>
                {product.originalPrice > product.price && (
                  <p className="text-xs line-through text-white/35">
                    ${product.originalPrice?.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center glass-strong rounded-full border border-white/10">
                  <button
                    type="button"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg text-white/70 hover:text-white"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-lg text-white/70 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => { addToCart(product, qty); onClose() }}
                  className="flex-1 sm:flex-none px-5 sm:px-6 py-3 rounded-full bg-white text-[#07111F] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#E8D5B5] transition"
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
