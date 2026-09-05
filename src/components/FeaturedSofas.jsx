import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sofas } from '../data/sofas'
import SofaCard from './SofaCard'
import ProductModal from './ProductModal'

export default function FeaturedSofas(){
  const featured = sofas.slice(0, 4)
  const [selected, setSelected] = useState(null)
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-[42px] leading-none">
            Featured<br/>
            <span className="italic font-light text-white/60">this season</span>
          </h2>
          <Link to="/collection" className="hidden md:inline-flex px-5 py-2.5 rounded-full glass text-sm hover:bg-white/10 transition">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(s=> <SofaCard key={s.id} sofa={s} onView={setSelected} />)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/collection" className="inline-flex px-5 py-2.5 rounded-full glass text-sm">View all →</Link>
        </div>
      </div>
      {selected && <ProductModal product={selected} onClose={()=>setSelected(null)} />}
    </section>
  )
}
