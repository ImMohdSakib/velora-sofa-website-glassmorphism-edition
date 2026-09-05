const steps = [
  { num: '01', title: 'Design', desc: 'Sketched by European ateliers, refined for modern living.' },
  { num: '02', title: 'Frame', desc: 'Solid hardwood frames kiln-dried and jointed by hand.' },
  { num: '03', title: 'Upholstery', desc: 'Premium fabrics and leathers stretched and tufted with care.' },
  { num: '04', title: 'Finish', desc: 'Inspected, packaged white-glove, and delivered to your door.' },
]

export default function CraftProcess(){
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">From sketch to sofa</p>
          <h2 className="font-serif text-[42px] leading-none">Our craft process</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s=> (
            <div key={s.num} className="glass rounded-[22px] p-6 hover:bg-white/[0.08] transition">
              <span className="text-[#D4B78F] font-serif text-3xl">{s.num}</span>
              <h3 className="mt-4 font-medium text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
