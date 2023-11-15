export function getRecipePath(title: string, id: string) {
  return `${title.toLowerCase().replace(/\s/g, "-")}-${id}`
}
