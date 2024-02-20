import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Region } from "@medusajs/medusa"
import { listRegions } from "@lib/data"

const SideMenuButton = ({
  isActive,
  isBurgerBlack,
  staticNavbar,
}: {
  isActive: boolean
  isBurgerBlack: boolean
  staticNavbar: boolean
}) => {
  const [regions, setRegions] = useState<Region[] | null>(null)
  const fetchRegions = async () => {
    try {
      const regionsData: Region[] | null = await listRegions()
      setRegions(regionsData)
    } catch (error) {
      alert("Error : no regions found")
    }
  }

  useEffect(() => {
    fetchRegions()
  }, [])

  const rotateValue = isActive ? 45 : 0
  const rotateValueNeg = isActive ? -45 : 0
  const margin = isActive ? -1.5 : 2

  return (
    <div className="flex flex-col cursor-pointer ">
      <motion.div
        className={` w-[20px] h-[3px] rounded-xl  ${
          isBurgerBlack || isActive || staticNavbar ? "bg-black" : "bg-white"
        }`}
        initial={{ rotate: rotateValue, marginBottom: margin }}
        animate={{
          rotate: rotateValue,
          marginBottom: margin,
        }}
      ></motion.div>
      <motion.div
        className={` w-[20px] h-[3px] rounded-xl   ${
          isBurgerBlack || isActive || staticNavbar ? "bg-black" : "bg-white"
        }`}
        initial={{ rotate: rotateValue, marginTop: margin }}
        animate={{
          rotate: rotateValueNeg,
          marginTop: margin,
        }}
      ></motion.div>
    </div>
  )
}

export default SideMenuButton
