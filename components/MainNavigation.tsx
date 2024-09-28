// src/components/Navigation.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu, X } from "lucide-react"

const navItems = [
  { 
    title: "Home", 
    href: "/" 
  },
  { 
    title: "Missions", 
    href: "/missions",
    children: [
      { title: "Mars Colonization", href: "/missions/mars" },
      { title: "Asteroid Mining", href: "/missions/asteroid" },
      { title: "Deep Space Exploration", href: "/missions/deep-space" },
    ]
  },
  { 
    title: "Gallery", 
    href: "/gallery",
    children: [
      { title: "Space Photos", href: "/gallery/photos" },
      { title: "3D Models", href: "/gallery/models" },
      { title: "Virtual Tours", href: "/gallery/tours" },
    ]
  },
  { 
    title: "Contact", 
    href: "/contact" 
  },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-black text-2xl font-bold">
            Cosmic Voyager
          </Link>
          {isDesktop ? (
            <DesktopNavigation items={navItems} />
          ) : (
            <button onClick={toggleMobileMenu} className="text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {!isDesktop && mobileMenuOpen && <MobileNavigation items={navItems} />}
      </AnimatePresence>
    </nav>
  )
}

function DesktopNavigation({ items }: { items: typeof navItems }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.children ? (
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            ) : (
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <motion.span
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.title}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-white"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            )}
            {item.children && (
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.children.map((child) => (
                    <ListItem key={child.title} title={child.title} href={child.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNavigation({ items }: { items: typeof navItems }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden"
    >
      <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {items.map((item) => (
          <li key={item.title}>
            <Link href={item.href}>
              <motion.a
                className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.title}
              </motion.a>
            </Link>
            {item.children && (
              <ul className="pl-4 mt-2 space-y-1">
                {item.children.map((child) => (
                  <li key={child.title}>
                    <Link href={child.href}>
                      <motion.a
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {child.title}
                      </motion.a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"