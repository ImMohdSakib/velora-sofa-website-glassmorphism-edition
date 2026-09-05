import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterPanel from '../components/FilterPanel'
import SofaGrid from '../components/SofaGrid'
import ProductModal from '../components/ProductModal'
import { sofas, categories } from '../data/sofas'

export default function Collection(){
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('q') || '')
  const [filters, setFilters] = useState({
    category:'', material:'', color:'', maxPrice:5000, seating:'', minRating:0, inStockOnly:false
  })
  const [sort, setSort] = useState('Featured')
  const [selected, setSelected] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q !== null) setSearch(q)
  }, [searchParams])

  const filtered = useMemo(()=>{
    let res = sofas.filter(s=>{
      const matchesSearch = !search || (
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase()) ||
        s.material.toLowerCase().includes(search.toLowerCase()) ||
        s.color.toLowerCase().includes(search.toLowerCase()) ||
        (s.shortDescription || '').toLowerCase().includes(search.toLowerCase())
      )
      const matchesCat = !filters.category || s.category===filters.category
      const matchesMat = !filters.material || s.material===filters.material
      const matchesColor = !filters.color || s.color===filters.color
      const matchesPrice = s.price <= filters.maxPrice
      const matchesSeat = !filters.seating || s.seatingCapacity===filters.seating
      const matchesRating = !filters.minRating || s.rating >= filters.minRating
      const matchesStock = !filters.inStockOnly || s.inStock
      return matchesSearch && matchesCat && matchesMat && matchesColor && matchesPrice && matchesSeat && matchesRating && matchesStock
    })
    if(sort==='Price Low to High') res = [...res].sort((a,b)=>a.price-b.price)
    if(sort==='Price High to Low') res = [...res].sort((a,b)=>b.price-a.price)
    if(sort==='Highest Rated') res = [...res].sort((a,b)=>b.rating-a.rating)
    if(sort==='Newest') res = [...res].sort((a,b)=>b.id-a.id)
    return res
  },[search, filters, sort])

  return (
    <>
      <section className="pt-28 md:pt-32 pb-28 lg:pb-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <h1 className="font-serif text-[32px] sm:text-[42px] leading-none">
              The collection<br/>
              <span className="italic font-light text-white/60 text-[0.7em] sm:text-[1em]">20 premium sofas</span>
            </h1>
            <p className="hidden sm:block text-sm text-white/40 shrink-0 ml-4">
              Showing {filtered.length} designs
            </p>
          </div>

          <p className="sm:hidden text-xs text-white/40 mb-4">
            Showing {filtered.length} designs
            {search ? ` for "${search}"` : ''}
          </p>

          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              setSort={setSort}
              categories={categories}
              search={search}
              setSearch={setSearch}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              resultCount={filtered.length}
            />
            <div className="min-w-0">
              <SofaGrid sofas={filtered} onView={setSelected} />
            </div>
          </div>
        </div>
      </section>
      {selected && <ProductModal product={selected} onClose={()=>setSelected(null)} />}
    </>
  )
}
