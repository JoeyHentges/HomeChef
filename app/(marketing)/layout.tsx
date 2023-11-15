import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { getCurrentUser } from "@/lib/session"
import { AuthNavLinks } from "@/components/auth-nav-links"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <div className="mx-[-32px] flex h-20 items-center justify-between bg-white px-[32px] py-6 md:bg-transparent">
          <MainNav items={marketingConfig.mainNav} />
          <nav className="flex gap-4 lg:gap-8">
            <Link
              href="/search"
              className="hidden items-center text-lg font-medium transition-colors hover:text-foreground/70 sm:text-base md:flex"
            >
              <Icons.search className="mr-2 h-4 w-4" />
              Search
            </Link>
            {user ? (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            ) : (
              <AuthNavLinks />
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 pb-4">{children}</main>
      <SiteFooter />
    </div>
  )
}
