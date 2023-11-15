import { cn } from "@/lib/utils"
import { HeroBanner } from "@/components/hero-banner"
import { adventPro } from "@/styles/fonts"

export default function HomePage() {
  return (
    <>
      <HeroBanner blobStyle="one">
        <div className="container flex h-[100%] flex-col justify-center">
          <p
            className={cn(
              "text-6xl font-bold md:text-8xl lg:text-9xl",
              adventPro.className
            )}
          >
            Your
          </p>
          <p
            className={cn(
              "ml-16 text-6xl font-bold md:ml-24 md:text-8xl lg:text-9xl xl:ml-32",
              adventPro.className
            )}
          >
            Personal
          </p>
          <p
            className={cn(
              "text-6xl font-bold md:text-8xl lg:text-9xl",
              adventPro.className
            )}
          >
            Cookbook
          </p>
        </div>
      </HeroBanner>
    </>
  )
}
