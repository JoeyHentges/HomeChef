import { cn } from "@/lib/utils"

import { HeroBannerBlobOne } from "./hero-banner-blob-one"

export interface HeroBannerProps {
  className?: string
  blobStyle?: "one"
  children: React.ReactNode
}

export function HeroBanner(props: HeroBannerProps) {
  const { className, blobStyle, children } = props

  const Blobs = () => {
    switch (blobStyle) {
      case "one": {
        return <HeroBannerBlobOne />
      }
    }
    return
  }

  return (
    <div
      className={cn(
        "relative -mt-20 h-[450px] overflow-hidden rounded-b-[2rem] bg-amber-400 md:h-[600px] md:rounded-b-[4rem]",
        className
      )}
    >
      <Blobs />
      {children}
    </div>
  )
}
