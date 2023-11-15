import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
  className?: string
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props} className={cn(className, "bg-amber-200")}>
      {user.image && <AvatarImage alt="Picture" src={user.image} />}
      <AvatarFallback className="bg-amber-200">
        <span className="sr-only">{user.name}</span>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  )
}
