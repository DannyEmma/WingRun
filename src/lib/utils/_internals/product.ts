import { ProductCart, ProductWithBrand } from '@/lib/types/_internals/product'

export class ProductUtil {
  getFullname(sneaker: ProductWithBrand | ProductCart): string {
    const textCapitalize = (text: string) => {
      return text
        .split(' ')
        .filter((value) => value !== '')
        .map((word) => word.at(0)?.toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }

    return `${textCapitalize(sneaker.line ?? '')} ${textCapitalize(sneaker.model ?? '')} ${textCapitalize(sneaker.edition ?? '')} "${textCapitalize(sneaker.colorway ?? '')}"`
  }

  getIdFromSlug(slug: string): number {
    return Number(slug.split('-').at(-1))
  }

  getFormattedPrice(price: number): string {
    const euroPrice = price / 100
    const formattedPrice = euroPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

    return formattedPrice
  }
}
