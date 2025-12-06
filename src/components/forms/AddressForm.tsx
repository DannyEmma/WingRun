'use client'

import styles from './Form.module.css'
import { Address, CreateAddress, DestinationsPerGroup } from '@/lib/types'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/ActionLink/ActionLink'
import { AddressSchema, CreateAddressSchema } from '@/lib/schemas'
import { useUserStore } from '@/lib/stores/user.store'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { $ZodIssue } from 'zod/v4/core'
import DestinationSelector from '@/components/forms/DestinationSelector/DestinationSelector'
import { action } from '@/lib/actions'
import CTA from '@/components/ui/CTA/CTA'
import ActionLink from '@/components/ui/ActionLink/ActionLink'

interface AddressFormProps {
  disabledDefaultAddress: boolean
  destinationsPerGroup: DestinationsPerGroup
  handleOpenChange: () => void
  setAddresses: Dispatch<SetStateAction<Address[]>>
}

interface AddressFormCreateProps extends AddressFormProps {
  operation: 'create'
}

interface AddressFormUpdateProps extends AddressFormProps {
  operation: 'update'
  currentAddress: Address
  titleSuffix: string
}

type ErrorsCodes = Record<string, $ZodIssue[]> | null

export function AddressForm(props: AddressFormCreateProps): React.JSX.Element
export function AddressForm(props: AddressFormUpdateProps): React.JSX.Element
export default function AddressForm(props: AddressFormCreateProps | AddressFormUpdateProps) {
  const [errorsCodes, setErrorsCodes] = useState<ErrorsCodes>(null)
  const session = useUserStore((state) => state.session)
  const defaultDestination = props.operation === 'create' ? JSON.stringify(props.destinationsPerGroup[0][1][0]) : JSON.stringify(props.currentAddress?.destination)
  const formTitle = props.operation === 'create' ? 'Ajouter une nouvelle adresse' : 'Adresse ' + props.titleSuffix + ' - Mise à jour'
  const buttonTitle = props.operation === 'create' ? 'Ajouter' : 'Mettre à jour'

  //---------- EVENTS HANDLERS ----------//

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (session) {
      //-- Data extraction  --
      const data = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())
      const destination = JSON.parse(data.destination as string)
      let validatedAddress, toastTitle, toastDescription

      //-- Data validation  --
      if (props.operation === 'create') {
        toastTitle = 'Adresse enregistrée !'
        toastDescription = 'Votre adresse a été enregistrée avec succès.'
        validatedAddress = CreateAddressSchema.safeParse({ ...data, destination, destinationId: destination.id, isDefault: data.isDefault ? true : false })
      }
      if (props.operation === 'update') {
        toastTitle = 'Adresse mise à jour !'
        toastDescription = 'Votre adresse a été mise à jour avec succès.'
        validatedAddress = AddressSchema.safeParse({ ...data, id: Number(data.id), destination, destinationId: destination.id, isDefault: data.isDefault ? true : false })
      }

      if (validatedAddress) {
        if (!validatedAddress.success) {
          setErrorsCodes(Object.groupBy(validatedAddress.error.issues, (item) => item.path[0]) as ErrorsCodes)
        } else {
          const address = validatedAddress.data
          let addressesUpdated = null

          //-- Create address --
          if (props.operation === 'create') addressesUpdated = (await action.user.createAddressAction(session.userId, address as CreateAddress)).data

          //-- Update address --
          if (props.operation === 'update') addressesUpdated = (await action.user.updateAddressAction(session.userId, address as Address)).data

          if (addressesUpdated) {
            //-- Use to refresh the list of addresses on the front --
            props.setAddresses(addressesUpdated)

            //-- Close the current form --
            props.handleOpenChange()

            toast.success(toastTitle, { description: toastDescription })
          }
        }
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles['address-form']}`}>
        <div className={styles['secondary-title-container']}>
          <h2 className={styles['secondary-title']}>{formTitle} </h2>
          <button type="button" onClick={() => props.handleOpenChange()}>
            <Image src="/icons/cross.svg" width={12} height={12} alt="Cross icon" />
          </button>
        </div>
        <hr />
        {/* ----- Address ID - Use on the update form only ----- */}
        {props.operation === 'update' && <input type="hidden" value={props.currentAddress.id} name="id" />}
        {/* ----- First Name ----- */}
        <Input
          id="firstname"
          type="text"
          label="prénom"
          name="firstname"
          defaultValue={props.operation === 'update' ? props.currentAddress?.firstname : ''}
          errorCode={errorsCodes?.firstname && errorsCodes?.firstname[0].message}
          required
        />

        {/* ----- Last Name ----- */}
        <Input
          id="lastname"
          type="text"
          label="nom"
          name="lastname"
          defaultValue={props.operation === 'update' ? props.currentAddress?.lastname : ''}
          errorCode={errorsCodes?.lastname && errorsCodes?.lastname[0].message}
          required
        />

        {/* ----- Country / Region ----- */}
        <DestinationSelector defaultDestination={defaultDestination} destinationsPerGroup={props.destinationsPerGroup} />

        {/* ----- Adresse ----- */}
        <Input
          id="address"
          type="text"
          label="adresse"
          name="address"
          defaultValue={props.operation === 'update' ? props.currentAddress?.address : ''}
          errorCode={errorsCodes?.address && errorsCodes?.address[0].message}
          required
        />

        {/* ----- address 2 ---- */}
        <Input
          id="address_2"
          type="text"
          label="Adresse complémentaire"
          name="address_2"
          defaultValue={props.operation === 'update' ? (props.currentAddress.address_2 ?? '') : ''}
          errorCode={errorsCodes?.address_2 && errorsCodes?.address_2[0].message}
        />

        {/* ----- City ----- */}
        <Input
          id="city"
          type="text"
          label="Ville"
          name="city"
          defaultValue={props.operation === 'update' ? props.currentAddress?.city : ''}
          errorCode={errorsCodes?.city && errorsCodes?.city[0].message}
          required
        />

        {/* ----- Code postal ----- */}
        <Input
          id="cp"
          type="text"
          label="Code postal"
          name="cp"
          defaultValue={props.operation === 'update' ? props.currentAddress?.cp : ''}
          errorCode={errorsCodes?.cp && errorsCodes?.cp[0].message}
          required
        />

        {/* ----- Phone ----- */}
        <Input
          id="phone"
          type="text"
          label="Téléphone"
          name="phone"
          defaultValue={props.operation === 'update' ? props.currentAddress?.phone : ''}
          errorCode={errorsCodes?.phone && errorsCodes?.phone[0].message}
          required
        />

        {/* ----- Default ----- */}
        {!props.disabledDefaultAddress && (
          <div className={styles['is-default-container']}>
            <input id="isDefault" type="checkbox" name="isDefault" defaultChecked={props.operation === 'update' && props.currentAddress?.isDefault} />
            <label htmlFor="isDefault">Définir comme adresse par défaut</label>
          </div>
        )}

        <div className={styles['actions-container']}>
          <CTA type="submit" variant="secondary">
            {buttonTitle}
          </CTA>

          <ActionLink onClick={props.handleOpenChange}>Annuler</ActionLink>
        </div>
      </form>
    </>
  )
}
