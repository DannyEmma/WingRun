import prisma from '@/lib/prisma'
import { Destination, DestinationPerGroup } from '@/lib/types'

const DestinationService = {
  getDestinationsPerGroup: async (): Promise<DestinationPerGroup> => {
    let destinationsPerGroup: DestinationPerGroup = []

    try {
      //-- Get all destinations --
      const destinations = await prisma.destination.findMany({
        where: {
          actif: {
            equals: true,
          },
        },
        orderBy: [{ group: 'asc' }],
      })

      //-- Group destinations by "DestinationGroup" --
      const groupBy = Object.groupBy(destinations, (destination: Destination) => destination.group)
      destinationsPerGroup = Object.entries(groupBy) as DestinationPerGroup
    } catch (error) {
      // console.log(error)
    }

    return destinationsPerGroup
  },
} as const

export default DestinationService
