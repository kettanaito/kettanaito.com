import React from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

export function TransitionContainer({ children }: Props): JSX.Element {
  const router = useRouter()

  return (
    <div>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          key={router.route}
          variants={{
            hidden: { opacity: 0, y: -50 },
            enter: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 },
          }}
          transition={{ duration: 0.64, type: 'linear' }}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
