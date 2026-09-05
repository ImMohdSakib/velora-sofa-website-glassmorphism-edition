import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { cart, remove, updateQty, subtotal, shipping, total, isOpen, setIsOpen } = useCart()
  const navigate = useNavigate()

  const close = () => setIsOpen(false)

  const goCheckout = () => {
    close()
    navigate('/checkout')
  }

  const onDragEnd = (_, info) => {
    // Swipe right to close (drawer opens from right)
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
            {/* subtle edge hint for swipe */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-16 rounded-full bg-white/15 pointer-events-none md:hidden" />

            <div className="flex items-center justify-between shrink-0">
              <h3 className="font-serif text-2xl">Your Cart</h3>
              <button onClick={close} className="w-10 h-10 rounded-full glass flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            <div className="mt-8 flex-1 overflow-auto space-y-4 pr-1 overscroll-contain">
              {cart.length === 0 && (
                <div className="text-center mt-20">
                  <p className="font-serif text-xl">Cart is empty</p>
                  <p className="text-sm text-white/50 mt-2">Add some luxury sofas.</p>
                </div>
              )}
              {cart.map(item => (
                <div key={item.id} className="glass rounded-2xl p-3 flex gap-3">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm leading-tight">{item.name}</p>
                    <p className="text-xs text-white/50 mt-1">${item.price}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-full glass flex items-center justify-center">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-full glass flex items-center justify-center">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => remove(item.id)} className="self-start text-white/40 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-6 space-y-3 shrink-0 safe-bottom">
              <div className="flex justify-between text-sm text-white/60"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="flex justify-between text-sm text-white/60"><span>Shipping</span><span>${shipping}</span></div>
              <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>${total}</span></div>
              <button
                onClick={goCheckout}
                disabled={!cart.length}
                className="w-full py-4 rounded-full bg-white text-[#07111F] font-medium hover:bg-[#E8D5B5] transition disabled:opacity-40"
              >
                Checkout
              </button>
              <p className="text-[11px] text-center text-white/40">Secure checkout · 5-year warranty</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
