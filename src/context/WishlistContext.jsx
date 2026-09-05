import { createContext, useContext, useEffect, useState } from 'react'
const WishlistContext = createContext()
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(()=>{ try{return JSON.parse(localStorage.getItem('velora-wish')||'[]')}catch{return []}})
  const [isOpen, setIsOpen] = useState(false)
  useEffect(()=>{ localStorage.setItem('velora-wish', JSON.stringify(wishlist))},[wishlist])
  const toggle = (product)=>{ setWishlist(prev=> prev.find(p=>p.id===product.id) ? prev.filter(p=>p.id!==product.id) : [...prev, product]) }
  const remove = (id)=> setWishlist(prev=> prev.filter(p=>p.id!==id))
  const isWishlisted = (id)=> wishlist.some(p=>p.id===id)
  return <WishlistContext.Provider value={{wishlist, toggle, remove, isWishlisted, count: wishlist.length, isOpen, setIsOpen}}>{children}</WishlistContext.Provider>
}
export const useWishlist = ()=> useContext(WishlistContext)
