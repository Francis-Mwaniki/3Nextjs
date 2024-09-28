// src/components/MissionSection.tsx
"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const missions = [
  { title: "Mars Colonization", description: "Establishing the first human settlement on the Red Planet." },
  { title: "Asteroid Mining", description: "Extracting valuable resources from near-Earth asteroids." },
  { title: "Deep Space Exploration", description: "Venturing into the unknown reaches of our galaxy." },
]

export function MissionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-4xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Our Missions
        </motion.h2>
        <motion.div
          ref={ref}
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              className="rounded-lg bg-gray-800 p-6 text-white"
              variants={itemVariants}
            >
              <h3 className="mb-4 text-2xl font-semibold">{mission.title}</h3>
              <p>{mission.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}