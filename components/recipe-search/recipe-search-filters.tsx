import { RecipeSearchFilterItem } from "./recipe-search-filter-item"

export async function RecipeSearchFilters() {
  return (
    <div className="flex min-w-[200px] flex-row gap-2 overflow-x-scroll pb-3 sm:flex-col sm:overflow-auto md:pb-0">
      <RecipeSearchFilterItem icon="martini" label="cocktails" />
      <RecipeSearchFilterItem icon="cakeSlice" label="sweets and treats" />
      <RecipeSearchFilterItem icon="salad" label="healthy and light" />
      <RecipeSearchFilterItem icon="wheat" label="gluten-free" />
    </div>
  )
}
