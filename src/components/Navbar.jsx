import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Search, Menu, X, User, Package, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
// import { Logoimage } from '.../public/Logo.png'

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchInputRef = useRef(null)
  const { count, setIsOpen } = useCart()
  const { count: wishCount, setIsOpen: setWishOpen } = useWishlist()
  const { user, openAuth, logout } = useAuth()
  const [userMenu, setUserMenu] = useState(false)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const initials = user?.name
    ? user.name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : ''

  useEffect(()=>{
    const h=()=> setScrolled(window.scrollY>20)
    window.addEventListener('scroll',h)
    return ()=>window.removeEventListener('scroll',h)
  },[])

  // Close account dropdown on outside click / touch
  useEffect(() => {
    if (!userMenu) return
    const onPointer = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenu(false)
      }
    }
    // capture phase so it runs even if something stops bubble
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [userMenu])

  // Close mobile nav on outside click
  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        // also ignore hamburger button clicks (handled by toggle)
        const btn = e.target.closest?.('[aria-label="menu"]')
        if (!btn) setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [open])

  // close menus on route change
  useEffect(()=>{
    setOpen(false)
    setSearchOpen(false)
    setUserMenu(false)
  },[location.pathname])

  // focus input when search opens
  useEffect(()=>{
    if(searchOpen){
      const t = setTimeout(()=> searchInputRef.current?.focus(), 50)
      return ()=> clearTimeout(t)
    }
  },[searchOpen])

  const links = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ]

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`

  const submitSearch = (e) => {
    e?.preventDefault()
    const q = query.trim()
    navigate(q ? `/collection?q=${encodeURIComponent(q)}` : '/collection')
    setSearchOpen(false)
    setOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-5'}`}>
      <div className="mx-auto max-w-[1280px] px-3 sm:px-6">
        {/* Main bar */}
        <div
          className={`flex items-center justify-between gap-2 rounded-full px-3 sm:px-5 py-2.5 sm:py-3 border border-white/12 ${
            scrolled ? 'glass-strong shadow-[0_12px_48px_rgba(0,0,0,0.45)]' : 'glass-premium'
          }`}
        >
          {/* Logo — shrink-0, never crush */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            {/* <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center font-serif font-bold text-[#07111F] shrink-0">
              V
            </div> */}

            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-[0_0_20px_rgba(99,102,241,0.35)]">
                <img
                  src="/Logo.png"
                  alt="Sofa Furniture Logo"
                  className="w-full h-full object-cover"
                />
              </div>

            <span className="font-serif text-lg sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] font-semibold truncate">
              VELORA
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map(l => (
              <NavLink key={l.name} to={l.path} end={l.path === '/'} className={linkClass}>
                {l.name}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              aria-label="search"
              onClick={() => { setSearchOpen(v => !v); setOpen(false) }}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition ${
                searchOpen ? 'bg-white text-[#07111F]' : 'glass hover:bg-white/10'
              }`}
            >
              {searchOpen ? <X size={16} /> : <Search size={16} />}
            </button>

            <button
              type="button"
              aria-label="wishlist"
              onClick={() => setWishOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center relative hover:bg-white/10"
            >
              <Heart size={16} />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#D4B78F] text-[10px] flex items-center justify-center text-[#07111F] font-bold">
                  {wishCount}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label="cart"
              onClick={() => setIsOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center relative hover:bg-white/10"
            >
              <ShoppingBag size={16} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#D4B78F] text-[10px] flex items-center justify-center text-[#07111F] font-bold">
                  {count}
                </span>
              )}
            </button>

            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                aria-label="account"
                onClick={() => user ? setUserMenu(v => !v) : openAuth('login')}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center relative transition ${
                  user
                    ? 'gold-gradient text-[#07111F] font-serif font-bold text-sm shadow-[0_0_20px_rgba(212,183,143,0.35)]'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {user ? initials : <User size={16} />}
              </button>
              {user && userMenu && (
                <div className="absolute right-0 top-12 w-56 glass-strong rounded-2xl p-2 shadow-[0_16px_40px_rgba(0,0,0,0.45)] z-50 border border-white/10">
                  <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
                    <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center font-serif font-bold text-sm text-[#07111F] shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-[11px] text-white/40 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/10 mx-2 mb-1" />
                  <button
                    type="button"
                    onClick={() => { setUserMenu(false); navigate('/orders') }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm hover:bg-white/10 text-left"
                  >
                    <Package size={14} /> My orders
                  </button>
                  <button
                    type="button"
                    onClick={() => { setUserMenu(false); logout() }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm hover:bg-white/10 text-left text-white/70"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/collection"
              className="hidden md:flex ml-1 px-4 xl:px-5 py-2 rounded-full bg-white text-[#07111F] text-sm font-medium hover:bg-[#E8D5B5] transition whitespace-nowrap"
            >
              Shop Now
            </Link>

            {/* Hamburger — only mobile/tablet, clear spacing from edge */}
            <button
              type="button"
              aria-label="menu"
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 ml-0.5"
              onClick={() => { setOpen(v => !v); setSearchOpen(false) }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Global search bar — works from any page (phone + computer) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={submitSearch}
              className="mt-2 sm:mt-3 rounded-full glass-premium px-3 sm:px-4 py-2 flex items-center gap-2 border border-white/15 shadow-[0_12px_48px_rgba(0,0,0,0.4)]"
            >
              <Search size={16} className="text-[#D4B78F] shrink-0" />
              <input
                ref={searchInputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search sofas, material, color..."
                className="flex-1 min-w-0 bg-transparent text-sm placeholder:text-white/40 focus:outline-none py-1.5"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="w-7 h-7 rounded-full glass flex items-center justify-center shrink-0"
                  aria-label="clear"
                >
                  <X size={12} />
                </button>
              )}
              <button
                type="submit"
                className="shrink-0 px-4 py-1.5 rounded-full bg-white text-[#07111F] text-xs font-medium hover:bg-[#E8D5B5] transition"
              >
                Search
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              ref={mobileMenuRef}
              className="lg:hidden mt-2 sm:mt-3 rounded-[20px] sm:rounded-[24px] glass-premium p-5 sm:p-6 border border-white/12"
            >
              <div className="flex flex-col gap-1">
                {links.map(l => (
                  <Link
                    key={l.name}
                    to={l.path}
                    onClick={() => setOpen(false)}
                    className="text-lg font-serif py-2.5 border-b border-white/5 last:border-0 hover:text-[#D4B78F] transition"
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="text-lg font-serif py-2.5 border-b border-white/5 hover:text-[#D4B78F] transition"
              >
                My Orders
              </Link>
              <Link
                to="/collection"
                onClick={() => setOpen(false)}
                className="mt-4 flex md:hidden w-full justify-center px-5 py-3 rounded-full bg-white text-[#07111F] text-sm font-medium"
              >
                Shop Now
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
