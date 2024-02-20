import React from "react"
import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface SideMenuLinksProps {
  name: string
  href: string
  isActive: boolean
  setSelectedIndicator: (indicator: string) => void
}

const slide = {
  initial: { x: 80 },

  enter: (i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),

  exit: (i: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
}

const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },

  closed: { scale: 0, transition: { duration: 0.4 } },
}

const SideMenuLinks: React.FC<SideMenuLinksProps> = ({
  href,
  name,
  isActive,
  setSelectedIndicator,
}) => {
  return (
    <>
      <motion.div
        className="relative flex items-center"
        onMouseEnter={() => setSelectedIndicator(href)}
        custom={name}
        variants={slide}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <motion.div
          variants={scale}
          animate={isActive ? "open" : "closed"}
          className="w-2 h-2 bg-black rounded-full absolute left-[-30px]"
        ></motion.div>
        <LocalizedClientLink href={`/${href}`}>
          <p className="hover:scale-105 transition duration-300">{name}</p>
        </LocalizedClientLink>
      </motion.div>
    </>
  )
}

export default SideMenuLinks
