import { Adult, Kid } from '@/lib/types'
import { Audience } from '@/../prisma/generated/enums'

export class AudienceUtil {
  isAdult(value: Audience): value is Adult {
    return value === Audience.WOMEN || value === Audience.MEN
  }

  isKid(value: Audience): value is Kid {
    return value === Audience.BOY || value === Audience.GIRL
  }

  audienceToLabel(audience: Audience): string {
    const audiencesToLabel: Record<Audience, string> = {
      [Audience.MEN]: 'Hommes',
      [Audience.WOMEN]: 'Femmes',
      [Audience.BOY]: 'Garçons',
      [Audience.GIRL]: 'Filles',
      [Audience.KIDS]: 'Enfants',
    }

    return audiencesToLabel[audience]
  }

  displayAudience(audiences: Adult[] | Kid[]): string {
    if (this.isAdult(audiences[0])) {
      if (audiences.length === 2) return 'adultes'

      return audiences[0] === Audience.MEN ? 'hommes' : 'femmes'
    }
    if (this.isKid(audiences[0])) {
      if (audiences.length === 2) return 'enfants'

      return audiences[0] === Audience.BOY ? 'garçons' : 'filles'
    }

    return ''
  }

  labelToAudience(label: string): Audience {
    const data: Record<string, Audience> = { hommes: Audience.MEN, femmes: Audience.WOMEN, enfants: Audience.KIDS }

    return data[label]
  }
}
