'use server'

import { service } from '@/lib/services'
import { Address, CreateAddress, ServiceResponse } from '@/lib/types'

//-- Use to create an address on a client component --
export async function createAddressAction(userId: string, address: CreateAddress): Promise<ServiceResponse<Address[]>> {
  return await service.user.createAddress(userId, address)
}

//-- Use to update an address on a client component --
export async function updateAddressAction(userId: string, address: Address): Promise<ServiceResponse<Address[]>> {
  return await service.user.updateAddress(userId, address)
}

//-- Use to delete an addresse on a client component --
export async function deleteAddressAction(userId: string, addressId: number): Promise<ServiceResponse<Address[]>> {
  return await service.user.deleteAddress(userId, addressId)
}
