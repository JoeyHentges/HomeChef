import { cn } from "@/lib/utils"
import { HeroBanner } from "@/components/hero-banner"
import { Icons } from "@/components/icons"
import { RecipeSearch } from "@/components/recipe-search"
import { adventPro } from "@/styles/fonts"

export default function RecipesPage() {
  return (
    <>
      <HeroBanner blobStyle="one">
        <div className="absolute left-[40%] top-[80%] flex max-w-[250px] gap-x-3 md:left-[35%] md:top-[28%]">
          <Icons.heart
            fill="white"
            className="h-4 -rotate-45 text-white md:h-8"
          />
          <p className="text-sm md:text-base">
            New pumpkin season has started, let&apos;s cook!
          </p>
        </div>
        <div className="xl:[15em] absolute bottom-0 right-0 hidden md:mr-[5em] md:flex lg:mr-[12em] xl:mr-[15em] 2xl:mr-[25em]">
          <img
            src="/images/halloween-pumpkins.png"
            className="max-h-[450px] max-w-[400px] lg:max-w-[500px] xl:max-w-[550px]"
          />
        </div>

        <div className="container flex h-[100%] flex-col justify-center">
          <p
            className={cn(
              "text-6xl font-bold md:text-8xl lg:text-9xl",
              adventPro.className
            )}
          >
            Chef
          </p>
          <p
            className={cn(
              "ml-20 text-6xl font-bold md:text-8xl lg:ml-24 lg:text-9xl xl:ml-32",
              adventPro.className
            )}
          >
            Secret
          </p>
          <p
            className={cn(
              "text-6xl font-bold md:text-8xl lg:text-9xl",
              adventPro.className
            )}
          >
            Recipes
          </p>
        </div>
      </HeroBanner>
      <RecipeSearch />
    </>
  )
}
