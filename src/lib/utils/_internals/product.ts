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

  getPageUrl(sneaker: ProductWithBrand): string {
    //-- Create the slug of the product --
    let slug = ''
    if (sneaker.line) slug += sneaker.line + '-'
    if (sneaker.model) slug += sneaker.model + '-'
    if (sneaker.edition) slug += sneaker.edition + '-'
    if (sneaker.colorway) slug += sneaker.colorway + '-'
    slug += sneaker.id

    //-- Return the page url to display the product

    return '/products/' + slug.replaceAll(' ', '-').toLowerCase()
  }
}
