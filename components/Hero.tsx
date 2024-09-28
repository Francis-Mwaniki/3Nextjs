// src/components/Hero.tsx
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const Star = ({ x, y, size }: { x: number; y: number; size: number }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      x,
      y,
      width: size,
      height: size,
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      repeatType: "loop",
    }}
  />
)

const Astronaut = () => (
  <motion.img
    src="/astronaut.png"
    alt="Floating Astronaut"
    className="absolute w-40 h-40"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
)

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 + "%",
    y: Math.random() * 100 + "%",
    size: Math.random() * 2 + 1,
  }))

  return (
    <motion.div
      ref={ref}
      className="relative h-screen overflow-hidden bg-transparent"
      style={{ y }}
    >
      {stars.map((star) => (
        <Star key={star.id} x={parseFloat(star.x)} y={parseFloat(star.y)} size={star.size} />
      ))}
      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
        <Astronaut />
        <motion.h1
          className="text-6xl font-bold text-slate-900"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Cosmic Voyager
        </motion.h1>
      </div>
    </motion.div>
  )
}