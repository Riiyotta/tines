import { Suspense, createContext, lazy, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// File-based routes: every src/pages/**/*.jsx is a page, so page agents add
// files without editing this one.
//   pages/index.jsx            -> /
//   pages/pricing.jsx          -> /pricing/
//   pages/blog/index.jsx       -> /blog/
//   pages/blog/[slug].jsx      -> /blog/:slug/
// A page module may export `title` (string) for document.title and `theme`
// (a name from [data-page-theme] in index.css; omitted = homepage colors) and `chrome`
// ('simple' = Navbar/Footer variant="simple" for /soar/; omitted = full chrome).
const ChromeContext = createContext(() => {})
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
        const setChrome = useContext(ChromeContext)
        useLayoutEffect(() => {
          setChrome(mod.chrome || 'default')
          return () => setChrome('default')
        }, [])
        useEffect(() => {
          if (mod.title) document.title = mod.title
        }, [])
        // Layout effect: set before paint so nav/footer never flash the wrong colors.
        useLayoutEffect(() => {
          const root = document.documentElement
          if (mod.theme) root.dataset.pageTheme = mod.theme
          return () => {
            delete root.dataset.pageTheme
          }
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
  const [chrome, setChrome] = useState('default')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <ChromeContext.Provider value={setChrome}>
    <div className="overflow-x-clip">
      <Navbar variant={chrome} />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer variant={chrome} />
    </div>
    </ChromeContext.Provider>
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
