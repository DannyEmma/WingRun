export const getFullname = ({ line, model, edition, colorway }: { line: string | null; model: string | null; edition: string | null; colorway: string | null }): string => {
  const fullnameArray = [line, model, edition, colorway].filter((value) => value !== null)
  fullnameArray[fullnameArray.length - 1] = `"${colorway}"`

  return fullnameArray.join(' ')
}

export const getIdFromSlug = (slug: string): number => {
  return Number(slug.split('-').at(-1))
}

export const getFormattedPrice = (price: number): string => {
  const euroPrice = price / 100
  const formattedPrice = euroPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

  return formattedPrice
}
