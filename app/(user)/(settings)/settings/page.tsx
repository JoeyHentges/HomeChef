import { redirect } from "next/navigation"
import { Session } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SessionProvider } from "@/components/session-provider"
import { UserSettingsForm } from "@/components/user-settings-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage({ session }: { session: Session }) {
  const user = await getCurrentUser()
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (!user || !dbUser) {
    redirect(authOptions?.pages?.signIn || `/login&from=/dashboard/settings`)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <SessionProvider session={session}>
          <UserSettingsForm user={dbUser} userProvider={user.provider || ""} />
        </SessionProvider>
      </div>
    </DashboardShell>
  )
}
