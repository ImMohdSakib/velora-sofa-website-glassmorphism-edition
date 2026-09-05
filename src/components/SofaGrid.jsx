import SofaCard from './SofaCard'
export default function SofaGrid({ sofas, onView }){
  if(!sofas.length) return <div className="glass rounded-[24px] p-16 text-center"><p className="font-serif text-2xl">No sofas found</p><p className="text-white/50 mt-2 text-sm">Try adjusting filters.</p></div>
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{sofas.map(s=> <SofaCard key={s.id} sofa={s} onView={onView} />)}</div>
}
