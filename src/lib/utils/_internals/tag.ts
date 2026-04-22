import { ProductTag } from '../../../../prisma/generated/enums'

export class TagUtil {
  isTag(value: string): value is ProductTag {
    return value in ProductTag
  }

  tagToLabel(tag: ProductTag): string {
    const tagToLabel: Record<ProductTag, string> = {
      BEST_SELLER: 'meilleurs ventes',
      OUR_PICK: 'notre sélections',
      NEW_ARRIVAL: 'nouveautés',
      POPULAR: 'populaires',
    }

    return tagToLabel[tag]
  }
}
