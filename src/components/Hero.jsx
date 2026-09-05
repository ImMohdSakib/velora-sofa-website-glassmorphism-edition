import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section id="home" className="relative min-h-[92vh] pt-28 sm:pt-32 pb-16 overflow-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[140px] bg-[rgba(212,183,143,0.18)]" />
        <div className="absolute top-10 right-0 w-[550px] h-[550px] rounded-full blur-[120px] bg-[rgba(90,140,255,0.13)]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full blur-[100px] bg-[rgba(212,183,143,0.08)]" />
      </div>

      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center relative">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 glass-premium rounded-full px-4 py-1.5 text-[11px] tracking-[0.18em] uppercase text-white/65 mb-8 border border-white/12"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4B78F] shadow-[0_0_8px_rgba(212,183,143,0.8)]" />
            Est. 2009 — Crafted in Europe
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-serif leading-[0.92] tracking-tight"
          >
            <span className="block text-[48px] sm:text-[64px] md:text-[76px] lg:text-[84px] font-[500]">
              Luxury sofas
            </span>
            <span className="block text-[48px] sm:text-[64px] md:text-[76px] lg:text-[84px] font-[300] italic text-white/65">
              made for
            </span>
            <span className="block text-[48px] sm:text-[64px] md:text-[76px] lg:text-[84px] font-[600] flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-outline">modern</span>
              <span className="inline-flex items-center px-5 sm:px-6 py-1.5 sm:py-2 rounded-full glass-premium text-[16px] sm:text-[22px] md:text-[26px] font-sans tracking-[0.18em] uppercase not-italic font-medium border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                Living
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-7 sm:mt-8 max-w-[460px] text-[14px] sm:text-[15px] leading-relaxed text-white/55"
          >
            Designed for comfort. Crafted for living. VELORA brings architectural silhouettes, hand-finished materials and cloud-like support to your everyday rituals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-9 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/collection" className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full btn-premium font-medium text-sm">
              Explore Sofas
            </Link>
            <Link
              to="/about"
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full glass-premium text-sm font-medium border border-white/12 hover:bg-white/10 transition"
            >
              Our Story
            </Link>
          </motion.div>

          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] tracking-[0.12em] text-white/40 uppercase">
            <span className="flex items-center gap-1.5">
              <span className="text-[#D4B78F]">★★★★★</span> 4.9/5
            </span>
            <span className="w-px h-3 bg-white/15 hidden sm:block" />
            <span>10k+ Homes</span>
            <span className="w-px h-3 bg-white/15 hidden sm:block" />
            <span>Free Delivery</span>
          </div>
        </div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative lg:h-[640px] flex items-center justify-center"
        >
          {/* Layered glass frames */}
          <div className="absolute w-[90%] max-w-[420px] h-[480px] rounded-[36px] glass -rotate-6 top-8 right-4 opacity-50" />
          <div className="absolute w-[90%] max-w-[420px] h-[480px] rounded-[36px] glass-strong rotate-3 top-14 right-2 opacity-70" />
          <div className="absolute w-[240px] h-[240px] rounded-full blur-[60px] bg-[rgba(212,183,143,0.22)] top-16 right-16" />

          <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-[28px] overflow-hidden glass-premium p-2 border border-white/15 noise-overlay">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200"
              alt="Luxury sofa hero"
              className="w-full h-full object-cover rounded-[20px]"
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-3 sm:-left-5 bottom-12 sm:bottom-16 glass-premium rounded-2xl px-3.5 py-3 flex items-center gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-white/15"
            >
              <div className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-[#D4B78F] text-sm border border-white/10">
                ✦
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/45">Material</p>
                <p className="text-sm font-medium">Premium Boucle</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-2 sm:-right-3 top-16 sm:top-20 glass-premium rounded-2xl px-3.5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-white/15"
            >
              <p className="text-[10px] uppercase tracking-widest text-white/45">Warranty</p>
              <p className="text-sm font-medium">5 Years Frame</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
