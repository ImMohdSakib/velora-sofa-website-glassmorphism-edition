export default function WhyChooseUs(){
  const items = [
    { title: "Premium Materials", desc: "Italian velvets, full-grain leathers and sustainable woods selected for longevity.", icon: "◍" },
    { title: "Expert Craftsmanship", desc: "Hand-finished frames, sinuous springs and 7-layer cushioning built by artisans.", icon: "✦" },
    { title: "Comfort First", desc: "Ergonomic depth, feather blend and high-resilience foam for everyday lounging.", icon: "♡" },
    { title: "Reliable Delivery", desc: "White-glove delivery, assembly and packaging removal across major metros.", icon: "↗" },
  ]
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="section-label mb-3">Why VELORA</p>
          <h2 className="font-serif text-[36px] sm:text-[42px] leading-none">Built differently</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {items.map(i => (
            <div
              key={i.title}
              className="glass-premium glass-hover shine-hover rounded-[22px] p-6 border border-white/10 noise-overlay group"
            >
              <div className="w-11 h-11 rounded-full glass-strong flex items-center justify-center mb-4 text-[#D4B78F] border border-white/10 group-hover:glow-gold transition-shadow duration-400">
                {i.icon}
              </div>
              <h4 className="font-serif text-lg tracking-tight">{i.title}</h4>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
