import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRightCircle,
  Zap,
  LockKeyhole,
  Fingerprint,
  Menu,
  X,
} from 'lucide-react'

const NAV_LINKS = ['Vault', 'Plans', 'Install', 'News', 'Help']

const EASE = [0.22, 1, 0.36, 1] as const

function fadeUp(delay: number) {
  return {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.6, ease: EASE },
    },
  }
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      overflow="visible"
      viewBox="0 0 256 256"
    >
      <path
        d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z"
        fill="#192837"
      />
    </svg>
  )
}

function Navbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10">
      <div
        className="mx-auto flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5"
        style={{ maxWidth: 1280 }}
      >
        {/* Logo */}
        <a href="#" aria-label="Amerisave home">
          <Logo />
        </a>

        {/* Center links — desktop only */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: 'var(--color-text)' }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right buttons — desktop only */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)' }}
          >
            Start For Free
          </a>
          <a
            href="#"
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{
              background: 'var(--color-login-bg)',
              color: 'var(--color-text)',
            }}
          >
            Sign In
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden p-1"
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          <Menu size={24} color="var(--color-text)" />
        </button>
      </div>
    </nav>
  )
}

function MobileSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-20"
            style={{
              background: 'rgba(25,40,55,0.35)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed right-0 top-0 z-30 flex flex-col"
            style={{
              width: 'min(88vw, 360px)',
              height: '100dvh',
              background: '#CFC8C5',
              boxShadow: '-12px 0 48px rgba(25,40,55,0.18)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <Logo />
              <button onClick={onClose} aria-label="Close menu">
                <X size={24} color="var(--color-text)" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px mx-6" style={{ background: 'rgba(25,40,55,0.12)' }} />

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-6 pt-6 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  onClick={onClose}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: EASE }}
                  className="py-3 text-base font-medium hover:opacity-60 transition-opacity"
                  style={{ color: 'var(--color-text)' }}
                >
                  {link}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="flex flex-col gap-3 px-6 pb-8">
              <a
                href="#"
                className="text-center rounded-full px-5 py-3 text-sm font-semibold text-white"
                style={{ background: 'var(--color-accent)' }}
              >
                Start For Free
              </a>
              <a
                href="#"
                className="text-center rounded-full px-5 py-3 text-sm font-semibold"
                style={{
                  background: 'var(--color-login-bg)',
                  color: 'var(--color-text)',
                }}
              >
                Sign In
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Subtle overlay to ensure text legibility */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Navbar */}
      <Navbar onMenuOpen={() => setMenuOpen(true)} />

      {/* Mobile sheet */}
      <MobileSheet open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero content */}
      <div
        className="relative z-10 mx-auto px-5 sm:px-8"
        style={{ maxWidth: 1280, paddingTop: 'clamp(40px, 8vw, 72px)' }}
      >
        <div style={{ maxWidth: 560, paddingTop: 80 }}>
          {/* Heading */}
          <motion.h1
            variants={fadeUp(0)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.65rem, 5vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: '#192837',
              marginBottom: 24,
            }}
          >
            <Zap
              size={24}
              color="#192837"
              style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: -2, marginRight: 6 }}
            />
            Lock Down Your Passwords{' '}
            <LockKeyhole
              size={24}
              color="#192837"
              style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: -2, marginRight: 4, marginLeft: 2 }}
            />{' '}
            with Ironclad Security
            <Fingerprint
              size={24}
              color="#192837"
              style={{ display: 'inline', verticalAlign: 'middle', position: 'relative', top: -2, marginLeft: 6 }}
            />
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp(0.15)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              lineHeight: 1.65,
              opacity: 0.8,
              maxWidth: 560,
              marginBottom: 36,
            }}
          >
            Zero stress, total control. VaultShield keeps you covered with unbreakable
            storage, one-tap access, and pro-grade tools for your non-stop world.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-between font-semibold text-white"
              style={{
                background: 'var(--color-accent)',
                borderRadius: 50,
                padding: '17px 24px',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                boxShadow: '0 4px 24px rgba(115,66,226,0.28)',
                minWidth: 210,
                gap: 32,
                textDecoration: 'none',
              }}
            >
              Get It Free
              <ArrowRightCircle size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
