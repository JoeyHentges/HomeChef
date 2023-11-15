import { MarketingConfig } from "@/types"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Featured",
      href: "/",
    },
    {
      title: "Recipes",
      href: "/recipes",
    },
    {
      title: "Blog",
      href: "/blog",
      disabled: true,
    },
    {
      title: "Shop",
      href: "/shop",
      disabled: true,
    },
  ],
}
