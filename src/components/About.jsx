export default function About(){
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="relative rounded-[28px] glass-premium p-2.5 border border-white/12 noise-overlay">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200"
            alt="About VELORA"
            className="rounded-[20px] w-full h-[400px] sm:h-[520px] object-cover"
          />
          <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-5 glass-premium rounded-2xl px-5 py-4 max-w-[230px] border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
            <p className="font-serif text-base sm:text-lg leading-tight">Designed around the way you live.</p>
            <p className="text-[11px] text-white/45 mt-2 leading-relaxed">Craftsmanship · Comfort · Quality that lasts.</p>
          </div>
        </div>

        <div>
          <p className="section-label">Our Philosophy</p>
          <h2 className="mt-4 font-serif text-[36px] sm:text-[48px] leading-[0.95]">
            Furniture that<br />gets better with time.
          </h2>
          <p className="mt-6 text-[14px] sm:text-[15px] leading-relaxed text-white/55">
            VELORA is built on the belief that a sofa should be the most used, most loved object in your home. We combine solid hardwood frames, eco foams and premium textiles with honest construction. No fast furniture — only heirloom comfort designed for 15+ years of life, movie nights, morning coffees and everything in between.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="glass-premium rounded-2xl p-5 border border-white/10">
              <p className="text-2xl sm:text-3xl font-serif gold-text">15+</p>
              <p className="text-xs text-white/45 mt-1 tracking-wide">Years Craftsmanship</p>
            </div>
            <div className="glass-premium rounded-2xl p-5 border border-white/10">
              <p className="text-2xl sm:text-3xl font-serif gold-text">5 Year</p>
              <p className="text-xs text-white/45 mt-1 tracking-wide">Frame Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
