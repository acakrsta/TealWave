'use client'
import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type Phase = 'idle' | 'covering' | 'revealing'
type Ctx = { navigate: (href: string) => void }

const TransitionContext = createContext<Ctx>({ navigate: () => {} })
export const usePageTransition = () => useContext(TransitionContext)

const yValues: Record<Phase, string> = {
  idle: '100%',
  covering: '0%',
  revealing: '-100%',
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const router = useRouter()
  const pendingHref = useRef('')

  const navigate = useCallback((href: string) => {
    pendingHref.current = href
    setPhase('covering')
  }, [])

  const onAnimationComplete = () => {
    if (phase === 'covering') {
      router.push(pendingHref.current)
      setPhase('revealing')
    } else if (phase === 'revealing') {
      setPhase('idle')
    }
  }

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <motion.div
        className="fixed inset-0 z-[9999] bg-neutral-900 pointer-events-none"
        animate={{ y: yValues[phase] }}
        transition={
          phase === 'idle'
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.76, 0, 0.24, 1] }
        }
        onAnimationComplete={onAnimationComplete}
      />
    </TransitionContext.Provider>
  )
}
