import { redirect } from "next/navigation"
import dayjs from "dayjs"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

interface VerifyPageProps {
  searchParams: {
    token: string
  }
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { token } = searchParams

  if (!token) {
    return redirect(authOptions?.pages?.signIn || "/login")
  }

  const verificationToken = await db.verificationToken.findFirst({
    where: {
      token,
    },
    select: {
      identifier: true,
      expires: true,
    },
  })

  if (!verificationToken) {
    return redirect(authOptions?.pages?.signIn || "/login")
  }

  if (dayjs().diff(dayjs(verificationToken?.expires), "seconds") > 0) {
    return redirect(authOptions?.pages?.signIn || "/login")
  }

  await db.user.update({
    data: {
      emailVerified: dayjs().toDate(),
    },
    where: {
      email: verificationToken.identifier,
    },
  })

  await db.verificationToken.delete({
    where: {
      token,
    },
  })

  return redirect("/dashboard/settings")
}
