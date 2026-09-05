import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import WishlistDrawer from './components/WishlistDrawer'
import AuthModal from './components/AuthModal'
import LoadingScreen from './components/LoadingScreen'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import { OrderProvider } from './context/OrderContext'
import Home from './pages/Home'
import Collection from './pages/Collection'
import CategoriesPage from './pages/CategoriesPage'
import AboutPage from './pages/AboutPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactPage from './pages/ContactPage'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import OrderTracking from './pages/OrderTracking'

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderTracking />} />
      </Routes>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <AuthModal />
    </>
  )
}

export default function App() {
  const [booting, setBooting] = useState(true)
  const onLoaded = useCallback(() => setBooting(false), [])

  return (
    <AuthProvider>
      <OrderProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-[#07111F] text-white selection:bg-[#D4B78F] selection:text-[#07111F]">
                {booting && <LoadingScreen onDone={onLoaded} />}
                {!booting && <AppRoutes />}
              </div>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </OrderProvider>
    </AuthProvider>
  )
}
