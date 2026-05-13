import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header, Footer } from './components/layout'
import {
  HomePage,
  SalesPage,
  SocialPage,
  AboutPage,
  ContactPage,
  PrivacyPage,
  NotFoundPage,
} from './pages'
import { CustomCursor } from './hooks/useCursor'
import { pageVariants } from './lib/motion'

// Scroll to top (or to hash anchor) on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Validate hash to avoid passing malformed selectors to querySelector
      if (/^#[\w-]+$/.test(hash)) {
        // Slight delay so the page transition starts before we scroll
        const id = window.setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
        return () => window.clearTimeout(id)
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, hash])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <CustomCursor />
        <ScrollToTop />
        <Header />

        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
