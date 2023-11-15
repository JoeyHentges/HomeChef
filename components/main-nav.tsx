"use client"

import * as React from "react"
import Link from "next/link"
import { MainNavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { adventPro } from "@/styles/fonts"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav(props: MainNavProps) {
  const { items, children } = props
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className={cn("flex gap-6 md:gap-12")}>
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span
          className={cn(
            "hidden text-3xl font-bold sm:inline-block",
            adventPro.className
          )}
        >
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden w-full justify-center gap-4 md:flex lg:gap-12">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/70 sm:text-base",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}
