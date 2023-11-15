import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { Icons } from "../icons"

interface RecipeEditButtonProps {
  href: string
}

export function RecipeEditButton(props: RecipeEditButtonProps) {
  const { href } = props

  return (
    <div className="hidden border-b border-slate-300 py-[0.7rem] lg:block">
      <div className="container flex items-center justify-end">
        <Link
          href={href}
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          Edit <Icons.pen className="ml-2 h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
