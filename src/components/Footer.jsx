import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="pt-16 pb-10 border-t border-white/10">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid md:grid-cols-5 gap-10">
          <div>
            <div className="flex items-center gap-2">
               <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-[0_0_20px_rgba(99,102,241,0.35)]">
                <img
                  src="/Logo.png"
                  alt="Sofa Furniture Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif tracking-[0.2em] font-semibold">VELORA</span>
            </div>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              Luxury seating for modern living. Handcrafted sofas designed around the way you live.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Shop</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/collection" className="hover:text-white transition">All Sofas</Link></li>
              <li><Link to="/collection" className="hover:text-white transition">Sectional</Link></li>
              <li><Link to="/collection" className="hover:text-white transition">Velvet</Link></li>
              <li><Link to="/collection" className="hover:text-white transition">Leather</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Company</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Craftsmanship</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Showroom</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Careers</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Support</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Shipping</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Warranty</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Follow</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Instagram</li>
              <li>Pinterest</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between gap-4 text-[11px] text-white/40 uppercase tracking-widest">
          <span>© 2026 VELORA — All Rights Reserved</span>
          <span>Privacy • Terms • Sitemap</span>
        </div>
      </div>
    </footer>
  )
}
