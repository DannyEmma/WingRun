'use client'

import styles from './Form.module.css'
import { Select } from 'radix-ui'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Address, CreateAddress, Destination, DestinationGroup } from '@/lib/types'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import { createAddressAction, updateAddressAction } from '@/lib/actions/user'
import { AddressSchema, CreateAddressSchema } from '@/lib/schemas'
import { useUserStore } from '@/lib/stores/user.store'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { $ZodIssue } from 'zod/v4/core'

type DestinationsPerGroup = [DestinationGroup, Destination[]][]

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
          if (props.operation === 'create') addressesUpdated = await createAddressAction(session.userId, address as CreateAddress)

          //-- Update address --
          if (props.operation === 'update') addressesUpdated = await updateAddressAction(session.userId, address as Address)

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
        <label>
          <p className={styles['country-label']}>
            Pays / Régions <sup>*</sup>
          </p>

          <Select.Root defaultValue={defaultDestination} name="destination" required>
            <Select.Trigger className={styles['select-trigger']} aria-label="Country">
              <Select.Value placeholder="Séléctionner" />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content position="popper" className={styles['select-content']}>
                <Select.ScrollUpButton>
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport>
                  {props.destinationsPerGroup.map((row, index) => {
                    const [group, destinations] = row

                    return (
                      <Select.Group className={styles['select-group']} key={index}>
                        <Select.Label className={styles['select-label']}>{group}</Select.Label>

                        {destinations.map((d, index) => {
                          return (
                            <Select.Item className={styles['select-item']} key={index} value={JSON.stringify(d)}>
                              <Select.ItemText>{d.name}</Select.ItemText>
                              <Select.ItemIndicator className="SelectItemIndicator">
                                <CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>
                          )
                        })}
                      </Select.Group>
                    )
                  })}
                </Select.Viewport>
                <Select.ScrollDownButton>
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </label>

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
          defaultValue={props.operation === 'update' ? props.currentAddress?.address_2 : ''}
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
          <Button type="submit" variant="cta-secondary">
            {buttonTitle}
          </Button>

          <Button type="button" variant="link" onClick={props.handleOpenChange}>
            Annuler
          </Button>
        </div>
      </form>
    </>
  )
}
