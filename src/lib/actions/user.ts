'use server'

import UserService from '@/lib/services/user'
import { Address, CreateAddress } from '@/lib/types'

//-- Use to create an address on a client component --
export async function createAddressAction(userId: string, address: CreateAddress): Promise<Address[] | []> {
  return await UserService.createAddress(userId, address)
}
//-- Use to update an address on a client component --
export async function updateAddressAction(userId: string, address: Address): Promise<Address[] | []> {
  return await UserService.updateAddress(userId, address)
}

//-- Use to delete an addresse on a client component --
export async function deleteAddressAction(userId: string, addressId: number): Promise<Address[] | []> {
  return await UserService.deleteAddress(userId, addressId)
}
