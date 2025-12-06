import prisma from '@/lib/prisma'
import { Destination, DestinationsPerGroup } from '@/lib/types'
import { ServiceResponse } from '@/lib/types'

export class DestinationService {
  async getDestinationsPerGroup(): Promise<ServiceResponse<DestinationsPerGroup>> {
    let response: ServiceResponse<DestinationsPerGroup> = { data: null, error: null }

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
      response.data = Object.entries(groupBy) as DestinationsPerGroup
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }
}
