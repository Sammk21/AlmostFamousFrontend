"use client"
import React, { useEffect, useState, useCallback } from "react"
import { useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { FaSearch, FaUser } from "react-icons/fa"
import SideMenuButton from "@modules/layout/components/side-menu-button"
import SideMenu from "@modules/layout/components/side-menu"
import MagneticButton from "@modules/common/components/magnetic-button/index"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useParams, usePathname } from "next/navigation"
import { listRegions } from "@lib/data"
import { fetchCart } from "@modules/layout/components/cart-button"
import { Region } from "@medusajs/medusa"
import { motion } from "framer-motion"
import { Six_Caps, Reem_Kufi } from "next/font/google"
import { FaBagShopping } from "react-icons/fa6"

const logo = Six_Caps({ subsets: ["latin"], weight: "400" })

const Nav = () => {
  const [state, setState] = useState({
    show: "translate-y-0",
    lastScrollY: 0,
    navbarColor: "",
    cartLength: 0,
    cartStatus: "idle",
    isActive: false,
    isBurgerBlack: false,
  })

  const [regions, setRegions] = useState<Region[] | null>(null)
  const [staticNavbar, setStaticNavbar] = useState<boolean>(false)

  const { scrollY } = useScroll()

  const { countryCode } = useParams()

  const router = usePathname()

  const matchLinks = router.substring(
    router.indexOf("/", router.indexOf("/") + 1) + 1
  )

  useEffect(() => {
    if (router !== `/${countryCode}`) {
      setStaticNavbar(true)
    } else {
      setStaticNavbar(false)
    }
  }, [router])

  const handleScrollChange = useCallback(
    (latest: number) => {
      setState((prevState) => {
        const isScrollingDown = latest > prevState.lastScrollY
        const isPastThreshold = latest > 200
        const updatedState = {
          ...prevState,
          navbarColor: isPastThreshold
            ? "white shadow-lg sm:shadow-sm text-black "
            : "",
          isBurgerBlack: isPastThreshold,
          show: isPastThreshold
            ? isScrollingDown
              ? "-translate-y-[6rem] sm:-translate-y-[8rem]"
              : ""
            : "translate-y-0",
        }

        return { ...updatedState, lastScrollY: latest }
      })
    },
    [setState]
  )
  useMotionValueEvent(scrollY, "change", handleScrollChange)

  const fetchCartLength = async () => {
    try {
      setState((prevState) => ({ ...prevState, cartStatus: "loading" }))
      const cartObject = await fetchCart()
      setState((prevState) => ({
        ...prevState,
        cartLength: cartObject?.items?.length || 0,
        cartStatus: "success",
      }))
    } catch (error) {
      setState((prevState) => ({ ...prevState, cartStatus: "error" }))
    }
  }

  useEffect(() => {
    fetchCartLength()
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setState((prevState) => ({ ...prevState, isActive: false }))
      }
    }
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  const fetchRegions = async () => {
    try {
      const regionsData: Region[] | null = await listRegions()
      setRegions(regionsData)
    } catch (error) {
      console.error("Error: no regions found", error)
    }
  }

  useEffect(() => {
    fetchRegions()
  }, [])

  const toggleBurger = () => {
    setState((prevState) => ({ ...prevState, isActive: !prevState.isActive }))
  }

  return (
    <>
      <header
        className={`fixed w-[100vw] flex justify-center items-center sm:h-[6rem] h-[4rem] mb-3  z-[25] top-0 text-white ${
          state.show
        } ${
          state.isActive && "translate-y-0 text-black"
        } transition-all duration-300`}
      >
        <nav
          className={`flex items-center justify-center uppercase align-middle w-[98vw] xsmall:w-[95vw] absolute top-3 h-full rounded-xl transition-all duration-300 bg-${
            state.navbarColor
          } ${state.isActive ? " text-black " : ""} 
          
         ${staticNavbar ? " bg-white text-black shadow-md  lg:shadow-sm " : ""}
        `}
        >
          <div
            className={`logo container flex justify-center transition ease-in-out mx-2 items-center relative
     
          `}
          >
            <div className="absolute left-2 sm:left-1">
              <div className="flex items-center lg:gap-x-6 gap-x-4 h-full flex-1 basis-0 ">
                <LocalizedClientLink
                  className={`hover:text-ui-fg-base flex ${
                    matchLinks === `cart` || matchLinks === `checkout`
                      ? "text-ui-fg-base"
                      : null
                  }`}
                  href="/cart"
                >
                  <span className="relative">
                    <FaBagShopping
                      className="stroke-slate-100 stroke-1"
                      size={22}
                    />
                    <span className="h-3 w-4 bg-gradient-to-tr from-red-600 via-red-700 to-red-500 stroke-slate-300  absolute text-white text-[8px] rounded-full flex justify-center items-center top-0 left-4">
                      <p>
                        {state.cartLength === undefined ? 0 : state.cartLength}
                      </p>
                    </span>
                    <div>
                      {matchLinks === `cart` || matchLinks === `checkout` ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className={`sm:w-2 sm:h-2 w-[6px] h-[6px] hidden lg:block bg-black rounded-full absolute left-[7px] -bottom-3 transition `}
                        ></motion.div>
                      ) : null}
                    </div>
                  </span>
                </LocalizedClientLink>
                <div className=" hidden xsmall:block  items-center gap-x-6 h-full">
                  {process.env.FEATURE_SEARCH_ENABLED && (
                    <LocalizedClientLink
                      className="hover:text-ui-fg-base"
                      href="/search"
                      scroll={false}
                    >
                      <FaSearch size={22} />
                    </LocalizedClientLink>
                  )}
                </div>
              </div>
            </div>
            <>
              <MagneticButton>
                <div className="middle subpixel-antialiased  sm:text-6xl text-4xl py-10 cursor-pointer">
                  <LocalizedClientLink
                    href="/"
                    className={`${logo.className} overflow-hidden tracking-widest text-center  flex justify-center `}
                  >
                    <h2>ALMOSTFAMOUS</h2>
                    {/* <h2>مشهور دائما</h2> */}
                  </LocalizedClientLink>
                </div>
              </MagneticButton>
            </>
            <div className="absolute right-2 sm:right-1 ">
              <div className="flex items-center gap-x-3 lg:gap-x-6 h-full flex-1 basis-0 justify-end">
                <div className="hidden xsmall:block  items-center gap-x-6 h-full relative">
                  <LocalizedClientLink
                    className={`hover:text-ui-fg-basen relative ${
                      router === `/us/account` ? "text-ui-fg-base" : null
                    }`}
                    href="/account"
                  >
                    <FaUser size={22} />
                    <div>
                      {matchLinks === `account` ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className={`sm:w-2 sm:h-2 w-[6px] h-[6px] hidden lg:block bg-black rounded-full absolute left-[7px] -bottom-3 transition `}
                        ></motion.div>
                      ) : null}
                    </div>
                  </LocalizedClientLink>
                </div>
                <span onClick={toggleBurger}>
                  <SideMenuButton
                    staticNavbar={staticNavbar}
                    isBurgerBlack={state.isBurgerBlack}
                    isActive={state.isActive}
                  />
                </span>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AnimatePresence mode="wait">
        {state.isActive && <SideMenu regions={regions} />}
      </AnimatePresence>
      <AnimatePresence>
        {state.isActive && (
          <motion.div
            onClick={toggleBurger}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Nav
