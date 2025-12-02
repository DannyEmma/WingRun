import prisma from '@/lib/prisma'
import { Address, CreateAddress, UserWithAddresses } from '@/lib/types'

const UserService = {
  getUser: async (userId: string): Promise<UserWithAddresses | null> => {
    let user

    try {
      user = await prisma.user.findUnique({
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
      // console.log(error)
    }

    return user ?? null // ?? use to don't have undefined
  },
  getAddresses: async (userId: string): Promise<Address[] | []> => {
    let addresses: Address[] = []

    try {
      addresses = (await prisma.address.findMany({
        where: {
          userId,
        },
        include: {
          destination: true,
        },
        orderBy: {
          isDefault: 'desc',
        },
      })) as Address[]
    } catch (error) {
      // console.log(error)
    }

    return addresses
  },
  createAddress: async (userId: string, createAddress: CreateAddress): Promise<Address[] | []> => {
    let updatedAddresses = []

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
      console.log(error)
    } finally {
      //-- Use to refresh addresses on the front end --
      updatedAddresses = await UserService.getAddresses(userId)
    }

    return updatedAddresses
  },

  updateAddress: async (userId: string, address: Address): Promise<Address[] | []> => {
    let updatedAddresses = []
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
      console.log(error)
    } finally {
      updatedAddresses = await UserService.getAddresses(userId)
    }

    return updatedAddresses
  },

  deleteAddress: async (userId: string, addressId: number): Promise<Address[] | []> => {
    let updatedAddresses = []

    try {
      await prisma.address.delete({
        where: {
          id: addressId,
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      updatedAddresses = await UserService.getAddresses(userId)
    }

    return updatedAddresses
  },
} as const

export default UserService
