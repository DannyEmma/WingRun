'use client'

import styles from './ListAddresses.module.css'
import { Address } from '@/lib/types'
import { Collapsible } from 'radix-ui'
import Button from '@/components/ui/Button/Button'
import { deleteAddressAction } from '@/lib/actions/user'
import { Dispatch, SetStateAction, useState } from 'react'
import AddressForm from '@/components/forms/AddressForm'
import { Destination, DestinationGroup } from '@prisma/client'

type DestinationsPerGroup = [DestinationGroup, Destination[]][]

interface ListAddressesProps {
  addresses: Address[]
  destinationsPerGroup: DestinationsPerGroup
  userId: string
  setAddresses: Dispatch<SetStateAction<Address[]>>
}

export default function ListAddresses({ addresses, destinationsPerGroup, userId, setAddresses }: ListAddressesProps) {
  const [opensForms, setOpensForms] = useState<boolean[]>(Array(addresses.length).fill(false))

  //---------- EVENTS HANDLERS ----------
  const handleOpenChange = (index: number) => {
    setOpensForms((prevState) => {
      return prevState.map((openForm, currentIndex) => {
        return index === currentIndex ? !openForm : openForm
      })
    })
  }

  const handleDelete = async (address: Address) => {
    if (confirm('Voulez vous vraiment supprimer cette addresse ?')) {
      const updatedAddresses = await deleteAddressAction(userId, address.id)
      setAddresses(updatedAddresses)
    }
  }

  return (
    <div className={styles['list-addresses']}>
      <ul data-has-form-open={opensForms.some((item) => item) ? 'true' : 'false'}>
        {addresses &&
          addresses.map((a, index) => {
            const titleSuffix = a.isDefault ? 'par défaut' : (index + 1).toString()

            return (
              <li key={index} data-is-open-form={opensForms[index] ? 'true' : 'false'}>
                <div className={styles['address-container']}>
                  <h2 className={styles.title}>{a.isDefault ? 'Adresse ' + titleSuffix : 'Adresse ' + titleSuffix}</h2>
                  <p>{a.firstname + ' ' + a.lastname}</p>
                  <p>{a.address + ' ' + a.address_2}</p>
                  <p>{a.city + ', ' + a.cp}</p>
                  <p>{a.phone}</p>
                  <p>{a.destination?.name}</p>
                </div>

                <div className={styles['actions-container']}>
                  <Collapsible.Root open={opensForms[index]} onOpenChange={() => handleOpenChange(index)}>
                    {opensForms[index] || (
                      <Collapsible.Trigger asChild>
                        <Button variant="cta-secondary" fit>
                          Edit
                        </Button>
                      </Collapsible.Trigger>
                    )}
                    <Collapsible.Content>
                      <AddressForm
                        operation="update"
                        destinationsPerGroup={destinationsPerGroup}
                        currentAddress={a}
                        handleOpenChange={() => handleOpenChange(index)}
                        setAddresses={setAddresses}
                        disabledDefaultAddress={a.isDefault}
                        titleSuffix={titleSuffix}
                      />
                    </Collapsible.Content>
                  </Collapsible.Root>
                  {opensForms[index] || (
                    <Button
                      type="button"
                      onClick={() => handleDelete(a)}
                      variant="cta-secondary"
                      fit
                      disabled={a.isDefault}
                      title={a.isDefault ? 'Vous ne pouvez pas supprimer votre addresse par défaut.' : ''}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
