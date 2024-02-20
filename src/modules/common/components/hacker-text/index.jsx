import React from "react"
import localFont from "next/font/local"
const garffiti = localFont({ src: "./fonts/aAnotherTag.ttf" })

const HackerText = ({ text }) => {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let interval = null

  const handleMouseOver = (event) => {
    let iteration = 0
    clearInterval(interval)

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index]
          }

          return letters[Math.floor(Math.random() * 26)]
        })
        .join("")

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)
  }

  return (
    <p
      className={`${garffiti.className} drop-shadow-md text-white`}
      data-value={text}
      onMouseOver={handleMouseOver}
    >
      {text}
    </p>
  )
}

export default HackerText
// bg-gradient-to-r from-[#9900ff] via-[#fd1d1d] to-[#fcb045] inline-block text-transparent bg-clip-text text-stroke
