import prisma from '@/lib/prisma'
import { Address, CreateAddress, ServiceResponse, UserWithAddresses } from '@/lib/types'

export class UserService {
  async getUser(userId: string): Promise<ServiceResponse<UserWithAddresses>> {
    let response: ServiceResponse<UserWithAddresses> = { data: null, error: null }

    try {
      response.data = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          addresses: {
            include: {
              destination: true,
            },
          },
        },
      })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }

  async getAddresses(userId: string): Promise<ServiceResponse<Address[]>> {
    let response: ServiceResponse<Address[]> = { data: null, error: null }

    try {
      response.data = await prisma.address.findMany({
        where: {
          userId,
        },
        include: {
          destination: true,
        },
        orderBy: {
          isDefault: 'desc',
        },
      })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    }

    return response
  }

  async createAddress(userId: string, createAddress: CreateAddress): Promise<ServiceResponse<Address[]>> {
    let response: ServiceResponse<Address[]> = { data: null, error: null }

    try {
      //-- Is the first address of the user ? --
      const addresses = await prisma.address.findMany({ where: { userId } })
      const isFirstAddress = addresses.length === 0
      const isAddressDefault = createAddress.isDefault
      const isDefault = isFirstAddress || isAddressDefault

      //-- Only one address default --
      if (isDefault) {
        await prisma.address.updateMany({
          where: {
            userId: userId,
          },
          data: {
            isDefault: false,
          },
        })
      }

      //-- Create the address --
      //-- Use to delete destinationId and destination before creation --
      const { destinationId, destination, ...safeAddress } = createAddress

      await prisma.address.create({
        data: { ...safeAddress, isDefault, user: { connect: { id: userId } }, destination: { connect: { id: createAddress.destinationId } } },
        include: { destination: true },
      })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    } finally {
      //-- Use to refresh addresses on the front end --
      response.data = (await this.getAddresses(userId)).data
    }

    return response
  }

  async updateAddress(userId: string, address: Address): Promise<ServiceResponse<Address[]>> {
    let response: ServiceResponse<Address[]> = { data: null, error: null }

    const { destination, ...safeAddress } = address

    try {
      //-- User address is default, no problem --
      if (safeAddress.isDefault) {
        await prisma.address.updateMany({
          where: {
            userId: userId,
          },
          data: {
            isDefault: false,
          },
        })
      }

      /*
        -- User address is not default, Huuumm don't trust him --
        -- Check if the current address is a default address or not  -- 
      */
      const isDefaultAddress = await prisma.address.findUnique({
        where: {
          id: safeAddress.id,
          isDefault: true,
        },
      })

      //-- Don't allow user to delete default address --
      if (isDefaultAddress) safeAddress.isDefault = true

      //-- Update Address --
      await prisma.address.update({
        where: {
          id: address.id,
        },
        data: safeAddress,
      })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    } finally {
      response.data = (await this.getAddresses(userId)).data
    }

    return response
  }

  async deleteAddress(userId: string, addressId: number): Promise<ServiceResponse<Address[]>> {
    let response: ServiceResponse<Address[]> = { data: null, error: null }

    try {
      await prisma.address.delete({
        where: {
          id: addressId,
        },
      })
    } catch (error) {
      if (error instanceof Error) response.error = error.message
    } finally {
      response.data = (await this.getAddresses(userId)).data
    }

    return response
  }
}
