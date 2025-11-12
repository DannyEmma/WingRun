import { Audience } from '@prisma/client'

export const categoryToAudience: Record<string, Audience> = { hommes: Audience.MEN, femmes: Audience.WOMEN, enfants: Audience.KIDS }
