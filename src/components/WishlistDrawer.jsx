import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function WishlistDrawer() {
  const { wishlist, remove, isOpen, setIsOpen } = useWishlist()
  const { addToCart } = useCart()

  const close = () => setIsOpen(false)

  const onDragEnd = (_, info) => {
    if (info.offset.x > 80 || info.velocity.x > 400) close()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.05, right: 0.55 }}
            onDragEnd={onDragEnd}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] z-[80] glass-strong p-6 flex flex-col touch-pan-y"
          >
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-16 rounded-full bg-white/15 pointer-events-none md:hidden" />

            <div className="flex items-center justify-between shrink-0">
              <h3 className="font-serif text-2xl flex items-center gap-2">
                <Heart size={20} className="text-[#D4B78F]" /> Wishlist
              </h3>
              <button onClick={close} className="w-10 h-10 rounded-full glass flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            <div className="mt-8 flex-1 overflow-auto space-y-4 pr-1 overscroll-contain">
              {wishlist.length === 0 && (
                <div className="text-center mt-20">
                  <p className="font-serif text-xl">Wishlist is empty</p>
                  <p className="text-sm text-white/50 mt-2">Save sofas you love for later.</p>
                </div>
              )}
              {wishlist.map(item => (
                <div key={item.id} className="glass rounded-2xl p-3 flex gap-3">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight truncate">{item.name}</p>
                    <p className="text-xs text-white/50 mt-1">${item.price}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => { addToCart(item) }}
                        className="px-3 py-1.5 rounded-full bg-white text-[#07111F] text-[11px] font-medium flex items-center gap-1 hover:bg-[#E8D5B5] transition"
                      >
                        <ShoppingBag size={12} /> Add to cart
                      </button>
                    </div>
                  </div>
                  <button onClick={() => remove(item.id)} className="self-start text-white/40 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            {wishlist.length > 0 && (
              <div className="border-t border-white/10 pt-4 shrink-0 safe-bottom">
                <p className="text-[11px] text-center text-white/40">
                  {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
