export default function Showcase(){
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="relative rounded-[32px] glass-strong overflow-hidden p-3 lg:p-4">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="rounded-[22px] overflow-hidden relative"><img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200" alt="Featured sofa" className="w-full h-[560px] object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /><div className="absolute bottom-6 left-6 glass-strong rounded-2xl px-5 py-3"><p className="font-serif text-xl">Imperial Signature</p><p className="text-xs text-white/60">Royal Navy Velvet • Hand Tufted</p></div></div>
            <div className="grid gap-4">
              <div className="glass rounded-[20px] p-6"><p className="text-[11px] uppercase tracking-widest text-white/40">Why it stands out</p><h3 className="font-serif text-2xl mt-3 leading-tight">Sculpted for conversation, built for generations.</h3><div className="mt-6 grid grid-cols-2 gap-3"><span className="glass rounded-full px-4 py-2 text-[12px]">Premium Fabric</span><span className="glass rounded-full px-4 py-2 text-[12px]">Handcrafted</span><span className="glass rounded-full px-4 py-2 text-[12px]">Free Delivery</span><span className="glass rounded-full px-4 py-2 text-[12px]">5 Year Warranty</span></div></div>
              <div className="rounded-[20px] overflow-hidden"><img src="https://images.unsplash.com/photo-1638962502979-05d81dcaa096?q=80&w=1277&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Detail" className="w-full h-[260px] object-cover" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
