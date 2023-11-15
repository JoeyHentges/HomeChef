import * as React from "react"
import Link from "next/link"
import { MainNavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLockBody } from "@/hooks/use-lock-body"

import { Icons } from "./icons"

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody()

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto pb-32 shadow-md md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 border-b bg-popover px-9 py-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex space-x-2">
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/search"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
          >
            Search
          </Link>
        </nav>
        {children}
      </div>
    </div>
  )
}
