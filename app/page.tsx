"use client"
// src/app/page.tsx
import { Navigation } from "@/components/MainNavigation"
import { Hero } from "@/components/Hero"
import { MissionSection } from "@/components/MissionSection"
import { Planet } from "@/components/Planet"
import { ParticleBackground } from "@/components/ParticleBackground"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navigation />
      <Hero />
      <MissionSection />
      <Planet />
    </main>
  )
}