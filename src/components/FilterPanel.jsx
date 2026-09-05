import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react'

const colors = ['Cream','Midnight Blue','Stone Grey','Emerald','Warm Taupe','Charcoal','Ivory','Royal Navy','Oatmeal','Beige']

/** Pure filter fields — no layout/scroll logic */
function FilterFields({ filters, setFilters, sort, setSort, categories, search, setSearch }) {
  return (
    <div className="space-y-5">
      <div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search sofas..."
          className="w-full px-4 py-3 rounded-2xl glass-strong bg-white/[0.04] text-sm placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-[#D4B78F]/40 border border-white/10"
        />
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">Sort by</p>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl glass-strong text-sm border border-white/10"
        >
          <option>Featured</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
          <option>Highest Rated</option>
          <option>Newest</option>
        </select>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilters({ ...filters, category: '' })}
            className={`px-3.5 py-1.5 rounded-full text-xs border transition ${
              !filters.category ? 'bg-white text-[#07111F] border-white' : 'glass border-white/15 text-white/70 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {categories.map(c => (
            <button
              type="button"
              key={c.name}
              onClick={() => setFilters({ ...filters, category: filters.category === c.name ? '' : c.name })}
              className={`px-3.5 py-1.5 rounded-full text-xs border transition ${
                filters.category === c.name ? 'bg-white text-[#07111F] border-white' : 'glass border-white/15 text-white/70 hover:bg-white/10'
              }`}
            >
              {c.name.replace(' Sofas', '')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">Material</p>
        <div className="flex flex-wrap gap-2">
          {['', 'Velvet', 'Leather', 'Boucle', 'Fabric', 'Linen', 'Wool Blend', 'Canvas'].map(m => (
            <button
              type="button"
              key={m || 'all'}
              onClick={() => setFilters({ ...filters, material: m })}
              className={`px-3.5 py-1.5 rounded-full text-xs border transition ${
                filters.material === m ? 'bg-white text-[#07111F] border-white' : 'glass border-white/15 text-white/70 hover:bg-white/10'
              }`}
            >
              {m || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">Color</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilters({ ...filters, color: '' })}
            className={`px-3.5 py-1.5 rounded-full text-xs border transition ${
              !filters.color ? 'bg-white text-[#07111F] border-white' : 'glass border-white/15 text-white/70 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {colors.map(c => (
            <button
              type="button"
              key={c}
              onClick={() => setFilters({ ...filters, color: filters.color === c ? '' : c })}
              className={`px-3.5 py-1.5 rounded-full text-xs border transition ${
                filters.color === c ? 'bg-white text-[#07111F] border-white' : 'glass border-white/15 text-white/70 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Max Price</p>
          <span className="text-sm font-medium text-[#D4B78F]">${filters.maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="5000"
          step="100"
          value={filters.maxPrice}
          onChange={e => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-white/30 mt-1.5">
          <span>$1,000</span>
          <span>$5,000</span>
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">Min Rating</p>
        <div className="flex gap-2 flex-wrap">
          {[0, 4, 4.5, 4.8].map(r => (
            <button
              type="button"
              key={r}
              onClick={() => setFilters({ ...filters, minRating: filters.minRating === r ? 0 : r })}
              className={`px-3.5 py-1.5 rounded-full text-xs border transition ${
                filters.minRating === r ? 'bg-white text-[#07111F] border-white' : 'glass border-white/15 text-white/70 hover:bg-white/10'
              }`}
            >
              {r === 0 ? 'Any' : `${r}+ ★`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2.5">Seating</p>
        <div className="flex gap-2.5 flex-wrap">
          {[3, 4, 5, 6].map(n => (
            <button
              type="button"
              key={n}
              onClick={() => setFilters({ ...filters, seating: filters.seating === n ? '' : n })}
              className={`w-11 h-11 rounded-full text-sm border transition flex items-center justify-center ${
                filters.seating === n ? 'bg-white text-[#07111F] border-white' : 'glass border-white/15 text-white/70 hover:bg-white/10'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <div
          role="switch"
          aria-checked={!!filters.inStockOnly}
          className={`w-10 h-6 rounded-full transition relative border ${
            filters.inStockOnly ? 'bg-[#D4B78F] border-[#D4B78F]' : 'bg-white/10 border-white/15'
          }`}
          onClick={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
              filters.inStockOnly ? 'left-[18px]' : 'left-0.5'
            }`}
          />
        </div>
        <span className="text-sm text-white/70 group-hover:text-white transition">In stock only</span>
      </label>
    </div>
  )
}

function countActive(filters, search, sort) {
  return [
    filters.category,
    filters.material,
    filters.color,
    filters.seating,
    filters.minRating,
    filters.inStockOnly,
    filters.maxPrice < 5000,
    search,
    sort !== 'Featured'
  ].filter(Boolean).length
}

export default function FilterPanel({
  filters, setFilters, sort, setSort, categories, search, setSearch,
  mobileOpen, setMobileOpen, resultCount
}) {
  const desktopScrollRef = useRef(null)
  const desktopPanelRef = useRef(null)

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [mobileOpen])

  // Non-passive wheel listener so we can prevent page scroll over the filter
  useEffect(() => {
    const panel = desktopPanelRef.current
    const el = desktopScrollRef.current
    if (!panel || !el) return

    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const canScroll = scrollHeight > clientHeight + 1
      if (!canScroll) {
        e.preventDefault()
        return
      }
      const atTop = scrollTop <= 0
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        e.preventDefault()
      }
      // Manually scroll so it always works
      el.scrollTop += e.deltaY
      e.preventDefault()
    }

    panel.addEventListener('wheel', onWheel, { passive: false })
    return () => panel.removeEventListener('wheel', onWheel)
  }, [])

  const activeCount = countActive(filters, search, sort)

  const resetAll = () => {
    setFilters({ category: '', material: '', color: '', maxPrice: 5000, seating: '', minRating: 0, inStockOnly: false })
    setSearch('')
    setSort('Featured')
  }

  return (
    <>
      {/* ═══ DESKTOP sticky sidebar ═══ */}
      <aside className="hidden lg:block self-stretch">
        <div
          ref={desktopPanelRef}
          className="sticky top-[100px] glass-premium rounded-[24px] border border-white/12 shadow-[0_16px_48px_rgba(0,0,0,0.35)] noise-overlay flex flex-col"
          style={{ height: 'calc(100vh - 120px)', maxHeight: 'calc(100vh - 120px)' }}
        >
          <div className="px-5 pt-5 pb-3 flex items-center gap-2 shrink-0 border-b border-white/8">
            <SlidersHorizontal size={16} className="text-[#D4B78F]" />
            <span className="font-serif text-lg">Filters</span>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#D4B78F] text-[#07111F] text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>

          {/* ONE scroll container — fixed height parent makes this work */}
          <div
            ref={desktopScrollRef}
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain px-5 py-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <FilterFields
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              setSort={setSort}
              categories={categories}
              search={search}
              setSearch={setSearch}
            />
            <button
              type="button"
              onClick={resetAll}
              className="mt-5 w-full py-2.5 rounded-2xl glass text-sm hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> Clear all
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ MOBILE floating button ═══ */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 px-6 py-3.5 rounded-full glass-strong border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
        >
          <SlidersHorizontal size={16} className="text-[#D4B78F]" />
          <span className="text-sm font-medium">Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#D4B78F] text-[#07111F] text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
          {typeof resultCount === 'number' && (
            <span className="text-xs text-white/45">· {resultCount}</span>
          )}
        </button>
      </div>

      {/* ═══ MOBILE bottom sheet ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) setMobileOpen(false)
              }}
              className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden flex flex-col rounded-t-[28px] border-t border-white/15 overflow-hidden touch-pan-x"
              style={{
                height: 'min(88vh, 720px)',
                background: 'rgba(11, 23, 40, 0.94)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div className="flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing">
                <div className="w-10 h-1 rounded-full bg-white/30" />
              </div>

              <div className="flex items-center justify-between px-5 pt-2 pb-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#D4B78F]" />
                  <h3 className="font-serif text-xl">Filters</h3>
                  {activeCount > 0 && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-[#D4B78F] text-[#07111F] text-[10px] font-bold flex items-center justify-center">
                      {activeCount}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10"
                  aria-label="Close filters"
                >
                  <X size={16} />
                </button>
              </div>

              <div
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-4"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <FilterFields
                  filters={filters}
                  setFilters={setFilters}
                  sort={sort}
                  setSort={setSort}
                  categories={categories}
                  search={search}
                  setSearch={setSearch}
                />
              </div>

              <div className="shrink-0 px-5 pt-3 border-t border-white/10 flex gap-3 safe-bottom bg-[rgba(11,23,40,0.95)]">
                <button
                  type="button"
                  onClick={resetAll}
                  className="flex-1 py-3.5 rounded-2xl glass text-sm flex items-center justify-center gap-2 hover:bg-white/10 border border-white/10"
                >
                  <RotateCcw size={14} /> Clear all
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex-[1.5] py-3.5 rounded-2xl bg-white text-[#07111F] text-sm font-medium hover:bg-[#E8D5B5] transition"
                >
                  Apply filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
