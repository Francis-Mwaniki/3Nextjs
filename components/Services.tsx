// src/components/Services.tsx
"use client"

import { motion } from "framer-motion"

const services = [
  {
    title: "Digital Transformation",
    description: "Empowering businesses with cutting-edge digital solutions.",
  },
  {
    title: "Cloud Services",
    description: "Scalable and secure cloud infrastructure for your needs.",
  },
  {
    title: "Cybersecurity",
    description: "Protecting your digital assets with advanced security measures.",
  },
]

export function Services() {
  return (
    <section className=" py-16">
      <div className="container mx-auto">
        <motion.h2
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="rounded-lg bg-white p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}