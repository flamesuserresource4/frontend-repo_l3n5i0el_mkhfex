import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, Star, Play, Search, ChevronRight, ChevronLeft, ShieldCheck, Leaf, HeartPulse, Brain, Sparkles, Battery, Heart, Stethoscope, Waves, X, Filter } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

// Utility
const cx = (...classes) => classes.filter(Boolean).join(' ')

// Smooth UI primitives
const Card = ({ className = '', children }) => (
  <div className={cx('rounded-3xl bg-white/70 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/40', className)}>
    {children}
  </div>
)

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]'
  const styles = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20',
    ghost: 'bg-white/40 hover:bg-white/70 text-teal-900 border border-white/60',
    outline: 'bg-transparent border border-teal-600 text-teal-700 hover:bg-teal-50',
  }
  return (
    <button className={cx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  )
}

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="max-w-3xl mx-auto text-center mb-12">
    {eyebrow && <div className="text-teal-700/80 font-semibold tracking-wide mb-2">{eyebrow}</div>}
    <h2 className="text-3xl md:text-4xl font-extrabold text-teal-950">{title}</h2>
    {subtitle && <p className="text-teal-900/70 mt-3">{subtitle}</p>}
  </div>
)

// Navbar with glassmorphism
const Navbar = ({ cartCount, onOpenCart }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-2">
              <Waves className="text-teal-700" />
              <span className="font-extrabold tracking-tight text-teal-900">Organimo®</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-teal-900/80">
              <Link to="/shop" className="hover:text-teal-900">Shop</Link>
              <a href="#benefits" className="hover:text-teal-900">Benefits</a>
              <a href="#ingredients" className="hover:text-teal-900">Ingredients</a>
              <a href="#stories" className="hover:text-teal-900">Stories</a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="hidden md:inline-flex"><Search className="w-4 h-4 mr-2" />Search</Button>
              <button onClick={onOpenCart} className="relative rounded-2xl bg-white/60 px-4 py-3 border border-white/70 shadow hover:bg-white/80 transition">
                <ShoppingCart className="text-teal-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-teal-600 text-white rounded-full px-2 py-0.5">{cartCount}</span>
                )}
              </button>
              <button className="md:hidden rounded-2xl bg-white/60 p-3 border border-white/70" onClick={() => setOpen(!open)}>
                <Menu />
              </button>
            </div>
          </div>
          {open && (
            <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
              <Link to="/shop" className="px-4 py-3 rounded-xl bg-white border" onClick={() => setOpen(false)}>Shop</Link>
              <a href="#benefits" className="px-4 py-3 rounded-xl bg-white border" onClick={() => setOpen(false)}>Benefits</a>
              <a href="#ingredients" className="px-4 py-3 rounded-xl bg-white border" onClick={() => setOpen(false)}>Ingredients</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Hero with parallax
const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" alt="Ocean" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-teal-800/40 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl text-white">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-sm mb-4 border border-white/20">Smooth UI • Glassmorphism • Premium</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">From body to mind — Limitless begins here.</h1>
          <p className="mt-4 text-white/90 text-lg">Sea Moss + Bladderwrack — the natural superfood upgrade.</p>
          <div className="mt-8 flex items-center gap-3">
            <Link to="/shop"><Button>Shop Now</Button></Link>
            <a href="#benefits"><Button variant="ghost">Learn More</Button></a>
            <button className="ml-2 rounded-full bg-white/20 border border-white/30 p-3 hover:bg-white/30 transition" aria-label="Play audio">
              <Play className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="h-1.5 w-24 rounded-full bg-white/30" />
      </div>
    </section>
  )
}

const BenefitCard = ({ icon: Icon, title }) => (
  <Card className="p-6 hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-center gap-4">
      <div className="rounded-2xl p-3 bg-teal-50 text-teal-700 border border-teal-100">
        <Icon />
      </div>
      <div>
        <p className="font-semibold text-teal-900">{title}</p>
        <p className="text-teal-900/60 text-sm">Smooth support for your daily rhythm.</p>
      </div>
    </div>
  </Card>
)

const Benefits = () => {
  const items = [
    { icon: Battery, title: 'Energy Boost' },
    { icon: ShieldCheck, title: 'Immune Support' },
    { icon: Brain, title: 'Cognitive Support' },
    { icon: Sparkles, title: 'Skin Glow' },
    { icon: Heart, title: 'Sexual Wellness' },
    { icon: HeartPulse, title: 'Heart Health' },
    { icon: Stethoscope, title: 'Digestive Balance' },
  ]
  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-white to-teal-50/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Why Organimo" title="Benefits you can feel" subtitle="Carefully crafted for body and mind, powered by nature." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <BenefitCard key={it.title} icon={it.icon} title={it.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ProductHighlight = ({ onAdd }) => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle eyebrow="Our bestseller" title="Sea Moss + Bladderwrack" subtitle="Premium wildcrafted, crafted with care." />
      <Card className="p-6 grid md:grid-cols-2 gap-10 bg-white/60">
        <div className="aspect-square rounded-2xl overflow-hidden bg-teal-50">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop" alt="Product" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-teal-900">Organimo® Sea Moss Gel</h3>
          <p className="text-teal-900/70 mt-2">Daily wellness jar to elevate energy, immunity and clarity.</p>
          <div className="flex items-center gap-2 mt-3 text-amber-500">
            {[...Array(5)].map((_, i) => (<Star key={i} fill="currentColor" className="w-5 h-5" />))}
            <span className="text-sm text-teal-900/60">4.9 (300+)</span>
          </div>
          <p className="text-3xl font-extrabold text-teal-900 mt-4">$29.99</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Vegan','Non-GMO','Gluten-Free','No Preservatives','Harvested in Canada'].map(b => (
              <span key={b} className="text-sm rounded-full bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1">{b}</span>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => onAdd({ title: 'Organimo® Sea Moss Gel', price: 29.99, sku: 'ORG-SM-001', slug: 'sea-moss-gel' })}>Add to Cart</Button>
            <Link to="/product/sea-moss-gel"><Button variant="outline">View Details</Button></Link>
          </div>
        </div>
      </Card>
    </div>
  </section>
)

const Testimonials = () => {
  const items = [
    { name: 'Maya', text: 'Instantly felt lighter and more focused. Beautiful packaging too!', rating: 5 },
    { name: 'Derek', text: 'Energy without jitters. My mornings are smoother.', rating: 5 },
    { name: 'Lena', text: 'Skin glow is real. Tastes clean and fresh.', rating: 5 },
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="stories" className="py-20 bg-gradient-to-b from-teal-50/40 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Loved by our community" subtitle="Real stories, gentle boosts." />
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {items.map((t, i) => (
              <Card key={i} className={cx('p-6 transition-all', i === idx ? 'ring-2 ring-teal-500' : '')}>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(t.rating)].map((_, j) => (<Star key={j} fill="currentColor" className="w-4 h-4" />))}
                </div>
                <p className="text-teal-900/80">{t.text}</p>
                <p className="mt-4 font-semibold text-teal-900">— {t.name}</p>
              </Card>
            ))}
          </div>
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden md:block">
            <button onClick={() => setIdx((idx - 1 + items.length) % items.length)} className="rounded-full bg-white/80 border p-2 shadow"><ChevronLeft /></button>
          </div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block">
            <button onClick={() => setIdx((idx + 1) % items.length)} className="rounded-full bg-white/80 border p-2 shadow"><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

const Ingredients = () => (
  <section id="ingredients" className="py-20">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle eyebrow="Inside the jar" title="Two ocean superfoods" />
      <div className="grid md:grid-cols-2 gap-6">
        {[{title:'Sea Moss',img:'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',desc:'Rich in minerals that support energy, skin, and gut.'},{title:'Bladderwrack',img:'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1200&auto=format&fit=crop',desc:'Traditionally used for thyroid support and metabolism.'}].map(x => (
          <Card key={x.title} className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <img src={x.img} alt={x.title} className="h-64 md:h-full w-full object-cover" />
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-teal-900">{x.title}</h3>
                <p className="text-teal-900/70 mt-2">{x.desc}</p>
                <div className="mt-4 flex gap-2">
                  {[Leaf, ShieldCheck, Sparkles].map((Ic, i) => (
                    <div key={i} className="p-2 rounded-xl bg-teal-50 border text-teal-700"><Ic /></div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

// Shop page
const Shop = ({ onAdd }) => {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      const url = `${BACKEND_URL}/api/products${category ? `?category=${category}` : ''}`
      try {
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setProducts([])
      }
    }
    fetchProducts()
  }, [category])

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-teal-900">Shop</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="appearance-none rounded-2xl bg-white/70 backdrop-blur px-4 py-2 pr-10 border border-white/60 shadow">
              <option value="">All</option>
              <option value="gel">Gel</option>
              <option value="capsules">Capsules</option>
              <option value="powder">Powder</option>
            </select>
            <Filter className="absolute right-3 top-2.5 text-teal-800 w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <Card key={p.slug} className="p-4 group overflow-hidden">
            <div className="aspect-square rounded-2xl overflow-hidden bg-teal-50">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-teal-900">{p.title}</h3>
              <p className="text-teal-900/60 text-sm line-clamp-2">{p.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-teal-900">${p.price}</span>
                <div className="flex gap-2">
                  <Link to={`/product/${p.slug}`} className="text-teal-700 hover:underline">View</Link>
                  <Button onClick={() => onAdd({ title: p.title, price: p.price, sku: p.sku, slug: p.slug })}>Add</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

const ProductPage = ({ slug, onAdd }) => {
  const [product, setProduct] = useState(null)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/${slug}`)
        const data = await res.json()
        setProduct(data)
      } catch (e) {}
    }
    fetchProduct()
  }, [slug])

  if (!product) return <div className="pt-28 pb-16 max-w-7xl mx-auto px-6">Loading...</div>

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-10">
        <Card className="overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-[420px] object-cover" />
        </Card>
        <div>
          <h1 className="text-3xl font-extrabold text-teal-900">{product.title}</h1>
          <p className="text-teal-900/70 mt-2">{product.description}</p>
          <div className="flex items-center gap-2 mt-3 text-amber-500">
            {[...Array(5)].map((_, i) => (<Star key={i} fill="currentColor" className="w-5 h-5" />))}
            <span className="text-sm text-teal-900/60">{product.rating} ({product.reviews})</span>
          </div>
          <p className="text-3xl font-extrabold text-teal-900 mt-4">${product.price}</p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => onAdd({ title: product.title, price: product.price, sku: product.sku, slug: product.slug })}>Add to Cart</Button>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-teal-900 mb-2">Benefits</h3>
            <ul className="list-disc pl-5 text-teal-900/80 space-y-1">
              <li>Energy and immune support</li>
              <li>Skin and gut balance</li>
              <li>Natural minerals and nutrients</li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-teal-900 mb-2">FAQ</h3>
            <details className="rounded-xl bg-white/70 border p-3 mb-2">
              <summary className="cursor-pointer font-medium text-teal-900">How do I use it?</summary>
              <p className="mt-2 text-teal-900/70">Enjoy a spoon daily or blend into smoothies.</p>
            </details>
            <details className="rounded-xl bg-white/70 border p-3">
              <summary className="cursor-pointer font-medium text-teal-900">Shipping & returns</summary>
              <p className="mt-2 text-teal-900/70">Ships within 2–3 days. 30-day return policy.</p>
            </details>
            <p className="text-xs text-teal-900/60 mt-3">These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CartDrawer = ({ open, items, onClose, onCheckout }) => {
  const total = items.reduce((s, it) => s + it.price * (it.qty || 1), 0)
  return (
    <div className={cx('fixed inset-0 z-[60] transition', open ? 'pointer-events-auto' : 'pointer-events-none')}>
      <div className={cx('absolute inset-0 bg-black/30 transition-opacity', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <div className={cx('absolute right-0 top-0 h-full w-full max-w-md bg-white/80 backdrop-blur-xl border-l shadow-xl transition-transform', open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="p-6 flex items-center justify-between">
          <h3 className="font-extrabold text-teal-900 text-xl">Your Cart</h3>
          <button onClick={onClose} className="rounded-xl bg-white/60 p-2 border"><X /></button>
        </div>
        <div className="px-6 space-y-4 max-h-[65vh] overflow-auto">
          {items.length === 0 && <p className="text-teal-900/70">Your cart is empty.</p>}
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-teal-50 border" />
              <div className="flex-1">
                <p className="font-medium text-teal-900">{it.title}</p>
                <p className="text-sm text-teal-900/60">Qty {it.qty || 1}</p>
              </div>
              <p className="font-semibold text-teal-900">${(it.price * (it.qty || 1)).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="p-6 mt-auto border-t bg-white/60">
          <div className="flex items-center justify-between mb-4">
            <span className="text-teal-900/70">Subtotal</span>
            <span className="font-bold text-teal-900">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={onCheckout}>Checkout</Button>
          <div className="flex items-center justify-center gap-3 mt-3 text-sm text-teal-900/70">
            <span className="rounded-xl bg-white/70 border px-3 py-1">Stripe</span>
            <span className="rounded-xl bg-white/70 border px-3 py-1">Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Home = ({ onAdd }) => (
  <>
    <Hero />
    <Benefits />
    <ProductHighlight onAdd={onAdd} />
    <Testimonials />
    <Ingredients />
  </>
)

const PDPRoute = ({ onAdd }) => {
  const slug = window.location.pathname.split('/').pop()
  return <ProductPage slug={slug} onAdd={onAdd} />
}

function App() {
  const [cart, setCart] = useState([])
  const [drawer, setDrawer] = useState(false)

  const addToCart = (item) => {
    setCart((c) => {
      const ex = c.find((x) => x.sku === item.sku)
      if (ex) return c.map((x) => x.sku === item.sku ? { ...x, qty: (x.qty || 1) + 1 } : x)
      return [...c, { ...item, qty: 1 }]
    })
    setDrawer(true)
  }

  const checkout = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cart }) })
      const data = await res.json()
      alert(`Checkout: ${data.status}. Total $${data.total}`)
    } catch (e) {
      alert('Checkout initialized.')
    }
  }

  // Floating CTA on mobile
  const FloatingCTA = () => (
    <button onClick={() => setDrawer(true)} className="md:hidden fixed bottom-6 right-6 z-40 rounded-full bg-teal-600 text-white px-5 py-4 shadow-xl shadow-teal-600/30 flex items-center gap-2">
      <ShoppingCart className="w-5 h-5" /> Cart ({cart.reduce((s, it)=> s + (it.qty||1), 0)})
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-sand-50 to-white" style={{ background: 'linear-gradient(120deg,#f0fdfa, #f9fafb, #ffffff)'}}>
      <BrowserRouter>
        <Navbar cartCount={cart.reduce((s, it)=> s + (it.qty||1), 0)} onOpenCart={() => setDrawer(true)} />
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} />} />
          <Route path="/shop" element={<Shop onAdd={addToCart} />} />
          <Route path="/product/:slug" element={<PDPRoute onAdd={addToCart} />} />
        </Routes>
        <CartDrawer open={drawer} items={cart} onClose={() => setDrawer(false)} onCheckout={checkout} />
        <FloatingCTA />
        <Footer />
      </BrowserRouter>
      <MetaTags />
    </div>
  )
}

const Footer = () => (
  <footer className="mt-20 border-t bg-white/70">
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2">
          <Waves className="text-teal-700" />
          <span className="font-extrabold tracking-tight text-teal-900">Organimo®</span>
        </div>
        <p className="text-teal-900/70 mt-3">From body to mind — natural wellness, thoughtfully made.</p>
      </div>
      <div className="text-teal-900/80 space-y-2">
        <p className="font-semibold text-teal-900 mb-2">Policies</p>
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Refund</a>
      </div>
      <div className="text-teal-900/80 space-y-2">
        <p className="font-semibold text-teal-900 mb-2">Follow</p>
        <div className="flex gap-3">
          <span className="rounded-xl bg-white/70 border px-3 py-1">Instagram</span>
          <span className="rounded-xl bg-white/70 border px-3 py-1">TikTok</span>
          <span className="rounded-xl bg-white/70 border px-3 py-1">Twitter</span>
        </div>
      </div>
      <div>
        <p className="font-semibold text-teal-900 mb-2">Newsletter</p>
        <div className="flex gap-2">
          <input placeholder="Your email" className="flex-1 rounded-2xl bg-white/60 border px-4 py-3" />
          <Button>Join</Button>
        </div>
      </div>
    </div>
  </footer>
)

const MetaTags = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Organimo® Sea Moss Gel",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"
      ],
      description: "Premium wildcrafted Sea Moss gel infused with Bladderwrack.",
      sku: "ORG-SM-001",
      brand: {
        "@type": "Brand",
        name: "Organimo"
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "29.99",
        availability: "https://schema.org/InStock"
      }
    }) }} />
  </>
)

export default App
