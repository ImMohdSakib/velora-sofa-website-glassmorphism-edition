import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('velora-cart') || '[]') } catch { return [] }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('velora-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(p => p.id === product.id)
      if (ex) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p)
      return [...prev, { ...product, qty }]
    })
    setIsOpen(true)
  }

  const remove = (id) => setCart(c => c.filter(p => p.id !== id))
  const updateQty = (id, qty) => {
    if (qty <= 0) remove(id)
    else setCart(c => c.map(p => p.id === id ? { ...p, qty } : p))
  }
  const clearCart = () => setCart([])

  const subtotal = cart.reduce((s, p) => s + p.price * p.qty, 0)
  const shipping = subtotal > 0 ? 99 : 0
  const total = subtotal + shipping
  const count = cart.reduce((s, p) => s + p.qty, 0)

  return (
    <CartContext.Provider value={{
      cart, addToCart, remove, updateQty, clearCart,
      subtotal, shipping, total, count, isOpen, setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
