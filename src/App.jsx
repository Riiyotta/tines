import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// File-based routes: every src/pages/**/*.jsx is a page, so page agents add
// files without editing this one.
//   pages/index.jsx            -> /
//   pages/pricing.jsx          -> /pricing/
//   pages/blog/index.jsx       -> /blog/
//   pages/blog/[slug].jsx      -> /blog/:slug/
// A page module may export `title` (string) for document.title.
const modules = import.meta.glob('./pages/**/*.jsx')

function toPath(file) {
  const p = file
    .replace(/^\.\/pages/, '')
    .replace(/\.jsx$/, '')
    .replace(/\/index$/, '')
    .replace(/\[([^\]]+)\]/g, ':$1')
  return p === '' ? '/' : `${p}/`
}

const routes = Object.entries(modules)
  .filter(([file]) => !file.split('/').some((seg) => seg.startsWith('_')))
  .map(([file, load]) => {
    const Page = lazy(async () => {
      const mod = await load()
      const Titled = (props) => {
        useEffect(() => {
          if (mod.title) document.title = mod.title
        }, [])
        return <mod.default {...props} />
      }
      return { default: Titled }
    })
    return { path: toPath(file), Page }
  })
  // static segments before dynamic ones
  .sort((a, b) => (a.path.includes(':') ? 1 : 0) - (b.path.includes(':') ? 1 : 0))

function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-page flex-col items-center justify-center px-page text-center text-purple-55">
      <h1 className="font-sans text-h2-sm sm:text-h2">Page not cloned yet</h1>
      <a href="/" className="btn btn-filled mt-sp-md">Back to home</a>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
