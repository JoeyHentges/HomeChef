import { KitchenToolCategory } from "@/types/recipe"

type KitchenTool = {
  category: KitchenToolCategory
  name: string
  provider: string
  link: string
}

// List provided by https://greatist.com/eat/ultimate-list-kitchen-tools-healthy-cooking#prep
export const kitchenTools: KitchenTool[] = [
  {
    category: "paring knife",
    name: "Mercer Culinary M20003 Genesis 3.5-Inch Paring Knife",
    provider: "Amazon",
    link: "https://www.amazon.com/dp/B000IBVD0W?tag=healthline-subtag-20&ascsubtag=033c0327-fd79-4531-92a3-ae6183fda11a&correlationId=033c0327-fd79-4531-92a3-ae6183fda11a&th=1",
  },
  {
    category: "chef's knife",
    name: "ZWILLING PRO 8-inch, Chef's knife",
    provider: "ZWILLING",
    link: "https://www.zwilling.com/us/zwilling-pro-8-inch-chefs-knife-38401-203/38401-203-0.html",
  },
  {
    category: "cutting board",
    name: "Sonder Los Angeles Motley Cutting Board",
    provider: "Amazon",
    link: "https://www.amazon.com/dp/B07HNCYZM2?tag=healthline-subtag-20&ascsubtag=d36e316a-edb1-462c-b744-a5891f4940cd&correlationId=d36e316a-edb1-462c-b744-a5891f4940cd",
  },
  {
    category: "measuring cups and spoons",
    name: "Prepworks by Progressive Ultimate 19-Piece Measuring Cups & Spoon Set",
    provider: "Amazon",
    link: "https://www.amazon.com/dp/B00EZQQEMS?tag=healthline-subtag-20&ascsubtag=22dcacec-b9ca-4e6d-b37f-6c3d58029b49&correlationId=22dcacec-b9ca-4e6d-b37f-6c3d58029b49",
  },
  {
    category: "kitchen shears",
    name: "Kitchen Shears",
    provider: "Crate & Barrel",
    link: "https://www.crateandbarrel.com/kitchen-shears/s243884",
  },
  {
    category: "colander",
    name: "Cook Pro 10-Inch Stainless Steel Mesh Colander",
    provider: "Amazon",
    link: "https://www.amazon.com/dp/B001U0O2US?tag=healthline-subtag-20&ascsubtag=4b81a3c3-59b0-4a60-9981-fbff5fcdbf39&correlationId=4b81a3c3-59b0-4a60-9981-fbff5fcdbf39&th=1",
  },
  {
    category: "can opener",
    name: "Swing-A-Way Comfort Grip Can Opener",
    provider: "Amazon",
    link: "https://www.amazon.com/dp/B0000505J0?tag=healthline-subtag-20&ascsubtag=116a1464-73b6-4172-8f34-ee2d013ab355&correlationId=116a1464-73b6-4172-8f34-ee2d013ab355&th=1",
  },
  { category: "mixing bowls", name: "", provider: "", link: "" },
  { category: "blender", name: "", provider: "", link: "" },
  { category: "grater", name: "", provider: "", link: "" },
  { category: "whisk", name: "", provider: "", link: "" },
  { category: "vegetable peeler", name: "", provider: "", link: "" },
  { category: "rolling pin", name: "", provider: "", link: "" },
  { category: "food processor", name: "", provider: "", link: "" },
  { category: "food scale", name: "", provider: "", link: "" },
  { category: "spatula", name: "", provider: "", link: "" },
  { category: "saucepan", name: "", provider: "", link: "" },
  { category: "sauté pan", name: "", provider: "", link: "" },
  { category: "skillet", name: "", provider: "", link: "" },
  { category: "baking sheet", name: "", provider: "", link: "" },
  { category: "oven mits", name: "", provider: "", link: "" },
  { category: "roasting pan", name: "", provider: "", link: "" },
  { category: "dutch oven", name: "", provider: "", link: "" },
  { category: "cooling rack", name: "", provider: "", link: "" },
  { category: "grill pan", name: "", provider: "", link: "" },
  { category: "potato masher", name: "", provider: "", link: "" },
  { category: "wok", name: "", provider: "", link: "" },
  { category: "meat thermometer", name: "", provider: "", link: "" },
  { category: "flatware", name: "", provider: "", link: "" },
  { category: "plates", name: "", provider: "", link: "" },
  { category: "bowls", name: "", provider: "", link: "" },
  { category: "glasses", name: "", provider: "", link: "" },
  { category: "mugs", name: "", provider: "", link: "" },
  { category: "salad bowl", name: "", provider: "", link: "" },
  { category: "serving bowl", name: "", provider: "", link: "" },
  { category: "serving plates", name: "", provider: "", link: "" },
  { category: "serving spoons", name: "", provider: "", link: "" },
  { category: "tongs", name: "", provider: "", link: "" },
  { category: "wine opener", name: "", provider: "", link: "" },
  { category: "pitcher", name: "", provider: "", link: "" },
  { category: "food storage containers", name: "", provider: "", link: "" },
  { category: "french press", name: "", provider: "", link: "" },
  { category: "teakettle", name: "", provider: "", link: "" },
  {
    category: "immersion blender",
    name: "Cuisinart Hand Blender",
    provider: "Amazon",
    link: "https://www.amazon.com/dp/B079NXBWDR?tag=healthline-subtag-20&ascsubtag=25022862-b543-408f-8095-61d3ab9a6940&correlationId=25022862-b543-408f-8095-61d3ab9a6940",
  },
  {
    category: "stand mixer",
    name: "KitchenAid Classic Series 4.5 Quart Tilt-Head Stand Mixer",
    provider: "Amazon",
    link: "https://www.amazon.com/KitchenAid-Classic-Quart-Tilt-Head-K45SSOB/dp/B003OXNBYC/ref=as_li_ss_tl?keywords=artisan%2Bstanding%2Bmixer&qid=1560547927&s=gateway&sr=8-5&linkCode=sl1&tag=joyfoodsunsh-20&linkId=7d69ea772f634a1036971616aa2b2e3f&language=en_US&th=1",
  },
  { category: "apron", name: "", provider: "", link: "" },
  {
    category: "parchment paper",
    name: "asmov 500 Count Parchment Paper",
    provider: "Amazon",
    link: "https://www.amazon.com/Fasmov-Parchment-Paper-Baking-Sheets/dp/B076K7NMK8/ref=as_li_ss_tl?keywords=parchment+paper&qid=1563574618&s=gateway&sr=8-15&linkCode=sl1&tag=joyfoodsunsh-20&linkId=2f9bae718c718aafc0f20523cf61d301&language=en_US",
  },
]
