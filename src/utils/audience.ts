import { Adult, Kid } from '@/lib/types'
import { Audience } from '@prisma/client'

export const isAdult = (value: Audience): value is Adult => {
  return value === Audience.WOMEN || value === Audience.MEN
}
export const isKid = (value: Audience): value is Kid => {
  return value === Audience.BOY || value === Audience.GIRL
}

export const displayAudience = (audiences: Adult[] | Kid[]): string => {
  if (isAdult(audiences[0])) {
    if (audiences.length === 2) return 'adultes'

    return audiences[0] === Audience.MEN ? 'hommes' : 'femmes'
  }
  if (isKid(audiences[0])) {
    if (audiences.length === 2) return 'enfants'

    return audiences[0] === Audience.BOY ? 'garçons' : 'filles'
  }

  return ''
}

export const audienceToLabel = (audience: Audience): string => {
  const audiencesToLabel: Record<Audience, string> = {
    [Audience.MEN]: 'Hommes',
    [Audience.WOMEN]: 'Femmes',
    [Audience.BOY]: 'Garçons',
    [Audience.GIRL]: 'Filles',
    [Audience.KIDS]: 'Enfants',
  }

  return audiencesToLabel[audience]
}
