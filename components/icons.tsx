import {
  CakeSlice,
  Check,
  ChefHat,
  ChevronLeft,
  Flower2,
  Grip,
  Heart,
  Link,
  Loader2,
  LucideProps,
  Mail,
  Martini,
  Menu,
  Pen,
  Salad,
  Save,
  Search,
  Star,
  StarHalf,
  Undo,
  User,
  Wheat,
  X,
} from "lucide-react"

export const Icons = {
  logo: ChefHat,
  cakeSlice: CakeSlice,
  check: Check,
  chefHat: ChefHat,
  chevronLeft: ChevronLeft,
  flower: Flower2,
  grip: Grip,
  heart: Heart,
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  link: Link,
  spinner: Loader2,
  mail: Mail,
  martini: Martini,
  menu: Menu,
  pen: Pen,
  salad: Salad,
  save: Save,
  search: Search,
  star: Star,
  starHalf: StarHalf,
  undo: Undo,
  user: User,
  wheat: Wheat,
  close: X,
}

export type Icon = keyof typeof Icons
