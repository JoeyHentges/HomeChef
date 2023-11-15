import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center gap-4 py-5 text-sm md:flex-row md:py-3">
        <p className="leading-loose md:text-left">© 2023 Homechef</p>
        <Link href="/contact" className="duration-300 hover:text-amber-800">
          Contact
        </Link>
      </div>
    </footer>
  )
}
