"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { UserAvatar } from "@/components/user-avatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <Icons.chefHat
            fill="white"
            className="absolute -top-[0.85em] left-[1em] z-10 h-6 w-6 rotate-[30deg]"
          />
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
            className="h-8 w-8 border-2 border-slate-800"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1 flex flex-col px-4 py-2" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer py-2">
          <Link href="/recipes/saved">Saved Recipes</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer py-2">
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer py-2 text-red-500"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}${pathname}`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
