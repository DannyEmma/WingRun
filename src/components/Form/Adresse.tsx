'use client'

import styles from './Form.module.css'
import { useEffect, useState } from 'react'
import { Select } from 'radix-ui'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import useFetchAPI from '@/hooks/useFetchAPi'
import { AddressSchema, Destination } from '@/lib/types'
import { useUserStore } from '@/lib/stores/user.store'

export default function Adresse({ operation }: { operation: 'create' | 'update' }) {
  const userId = useUserStore((state) => state.session?.userId)
  const [destinationsPerGroup, setDestinationsPerGroup] = useState<[string, Destination[]][]>([])
  const { data: destinations, fetchCallback: fetchDestinations } = useFetchAPI<Destination[]>()
  const { fetchCallback: createAddress } = useFetchAPI()

  useEffect(() => {
    if (!destinations) (async () => await fetchDestinations('/api/destinations', 'GET'))()
  }, [])

  useEffect(() => {
    if (destinations) {
      const groupBy = Object.groupBy(destinations, ({ group }) => group)
      const objectToArray = Object.entries(groupBy)
      const data = objectToArray.filter((array): array is [string, Destination[]] => array[1] !== undefined)

      setDestinationsPerGroup(data)
    }
  }, [destinations])

  //---------- EVENTS HANDLERS ----------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const address = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())

    // console.log(address)

    //-- Zod validation --
    const result = AddressSchema.safeParse({ ...address, destinationId: Number(address.destinationId), isDefault: address.isDefault ? true : false })

    if (!result.success) {
      console.log(result.error)
      //set error
    } else {
      console.log('create address')
      createAddress(`/api/users/${userId}/addresses`, 'POST', result.data)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ----- First Name ----- */}
      <div className={styles['input-container']}>
        <label htmlFor="firstname">
          prénom <sup>*</sup>
        </label>
        <input id="firstname" type="text" name="firstname" required />
      </div>
      {/* ----- Last Name ----- */}
      <div className={styles['input-container']}>
        <label htmlFor="lastname">
          nom <sup>*</sup>
        </label>
        <input id="lastname" type="text" name="lastname" required />
      </div>
      {/* ----- Country / Region ----- */}
      <Select.Root defaultValue="France" name="destinationId" required>
        <Select.Trigger className="select-trigger" aria-label="Country">
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
              {destinationsPerGroup.map((row, index) => {
                const [group, destinations] = row

                return (
                  <Select.Group key={index}>
                    <Select.Label className={styles['select-label']}>{group}</Select.Label>

                    {destinations.map((d, index) => {
                      return (
                        <Select.Item key={index} value={d.id.toString()}>
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

      {/* ----- Adresse ----- */}
      <div className={styles['input-container']}>
        <label htmlFor="address">
          Adresse <sup>*</sup>
        </label>
        <input id="address" type="text" name="address" required />
      </div>
      {/* ----- address 2 ---- */}
      <div className={styles['input-container']}>
        <label htmlFor="address_2">Complément d'adresse</label>
        <input id="address_2" type="text" name="address_2" />
      </div>
      <div>
        {/* ----- City ----- */}
        <div className={styles['input-container']}>
          <label htmlFor="city">
            ville <sup>*</sup>
          </label>
          <input id="city" type="text" name="city" required />
        </div>

        {/* ----- Code postal ----- */}
        <div className={styles['input-container']}>
          <label htmlFor="cp">
            code postal <sup>*</sup>
          </label>
          <input id="cp" type="text" name="cp" required />
        </div>
      </div>
      {/* ----- Phone ----- */}
      <div className={styles['input-container']}>
        <label htmlFor="phone">
          Téléphone <sup>*</sup>
        </label>
        <input id="phone" type="text" name="phone" required />
      </div>
      {/* ----- Default ----- */}
      <div>
        <label>
          <input type="checkbox" name="isDefault" />
          Définir comme adresse par défaut
        </label>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  )
}
