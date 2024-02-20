"use client"


import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { useEffect, useState } from "react"

import CountrySelect from "../country-select"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import SideMenuLinks from "../side-menu-links"

const SideMenuItems = {
  Home: "/",
  Store: "store",
  Search: "search",
  Account: "account",
  Cart: "cart",
}

export const menuSlide = {
  initial: { x: "calc(100% + 100px)" },

  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },

  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
}

const SideMenu = ({ regions }: { regions: Region[] | null }) => {
  const toggleState = useToggleState()

  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const [selectedIndicator, setSelectedIndicator] = useState(pathname)
  const matchLinks = selectedIndicator.substring(
    selectedIndicator.indexOf("/", selectedIndicator.indexOf("/") + 1) + 1
  )
  const close = true

  return (
    <div>
      <motion.div
        variants={menuSlide}
        initial="initial"
        animate="enter"
        exit="exit"
        className="h-[100vh] fixed top-0 right-0 bg-white text-black z-[20] shadow-sm"
      >
        <div className=" box-border h-full sm:p-[100px] p-[60px] w-[100vw] sm:w-auto  flex flex-col justify-between">
          <div
            onMouseLeave={() => {
              setSelectedIndicator(pathname)
            }}
            className="flex flex-col text-3xl sm:text-5xl gap-[12px] mt-[80px]"
          >
            <div className="text-sm flex justify-center pb-2 mb-7 border-b-[1px] border-gray-200">
              <p>Navigation</p>
            </div>

            <ul className="flex flex-col gap-6 items-start justify-start">
              {Object.entries(SideMenuItems).map(([name, href]) => {
                return (
                  <SideMenuLinks
                    key={name}
                    name={name}
                    href={href}
                    isActive={matchLinks == href}
                    setSelectedIndicator={setSelectedIndicator}
                  ></SideMenuLinks>
                )
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-y-6">
            <div
              className="flex justify-between"
              onMouseEnter={toggleState.open}
              onMouseLeave={toggleState.close}
            >
              {regions && (
                <CountrySelect toggleState={toggleState} regions={regions} />
              )}
              <ArrowRightMini
                className={clx(
                  "transition-transform duration-150",
                  toggleState.state ? "-rotate-90" : ""
                )}
              />
            </div>
            <Text className="flex justify-between txt-compact-small">
              © {new Date().getFullYear()} AF Store. All rights reserved.
            </Text>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SideMenu
