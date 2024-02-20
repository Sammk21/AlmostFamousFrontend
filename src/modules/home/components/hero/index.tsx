"use client"
import React, { useState, useRef, useEffect } from "react"
import { AiOutlinePause } from "react-icons/ai"
import { LiaPlaySolid } from "react-icons/lia"
import { Six_Caps, GFS_Didot, Reem_Kufi } from "next/font/google"
import HackerText from "@modules/common/components/hacker-text/index"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion } from "framer-motion"

const arabicLogo = Reem_Kufi({ subsets: ["arabic"] })
const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const videoSrc =
    "https://www.dior.com/couture/var/dior/storage/original/video/f1ac5ae186d49e6e4aad07ef90d90a00.mp4"
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  const playPauseIcon = isPlaying ? <AiOutlinePause /> : <LiaPlaySolid />

  return (
    <div className="relative lg:aspect-video lg:h-[100vh] lg:w-[100vw] group">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        loop
        className="w-full h-[100vh] object-cover -z-100"
      />

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute z-10 bottom-10 border-[1px] mt-24 border-white right-5 sm:p-4 p-2 transition-all bg-opacity-50 text-white text-3xl rounded-full md:p-10 cursor-pointer hover:bg-opacity-70"
      >
        {playPauseIcon}
      </button>
      <div className="absolute top-[35%] left-0 right-0 m-auto translate-y-1/2 text-center text-white">
        <h2 className="text-[12vw] font-bold cursor-crosshair">
          <p className="text-lg leading-3 font-light uppercase tracking-widest">
            Explore
          </p>
          <HackerText text={"Almost Famous"} />
        </h2>
      </div>
      <motion.div className="absolute bottom-[15%] sm:bottom-[10%] left-0 right-0 m-auto translate-y-1/2 text-center text-blue-600 w-48 h-[5vw] flex justify-center items-center rounded-lg cursor-pointer capitalize ">
        <span className="text-sm font-semibold flex ">
          <LocalizedClientLink href="/store">
            <span className="explore">
              Explore products
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </span>
          </LocalizedClientLink>
        </span>
      </motion.div>
    </div>
  )
}

export default Hero
