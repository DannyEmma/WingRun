import { Audience } from '@prisma/client'

export const audienceToCategory: Record<Audience, string> = { [Audience.MEN]: 'hommes', [Audience.WOMEN]: 'femmes', [Audience.KIDS]: 'enfants' }
