'use client'

import styles from './TabsAccount.module.css'
import { useState } from 'react'
import { Tabs, Collapsible } from 'radix-ui'
import Logout from '@/components/features/auth/Logout/Logout'
import Button from '@/components/ui/Button/Button'
import ListAddresses from '@/components/features/account/ListAddresses/ListAddresses'
import AdresseForm from '@/components/forms/AddressForm'
import { Address, DestinationPerGroup, User } from '@/lib/types'

interface TabsAccountProps {
  user: User
  destinationsPerGroup: DestinationPerGroup
  addresses: Address[] | null | undefined
  defaultAddress: Address | null | undefined
}

export default function TabsAccount({ user, destinationsPerGroup, addresses: initialAddresses, defaultAddress }: TabsAccountProps) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses || [])
  const [tabValue, setTabValue] = useState('tab1')
  const [openAddForm, setOpenAddForm] = useState(false)

  const isAddressesEmpty = addresses?.length === 0

  const handleOpenChange = () => setOpenAddForm(!openAddForm)

  return (
    <Tabs.Root value={tabValue} onValueChange={setTabValue} orientation="vertical" className={`${styles.tabs}`}>
      <Tabs.List className={styles['tabs-list']} aria-label="tabs account">
        <Tabs.Trigger className={`${styles['tabs-trigger']}`} value="tab1">
          Profil
        </Tabs.Trigger>

        <hr />

        <Tabs.Trigger className={`${styles['tabs-trigger']}`} value="tab2">
          Adresses
        </Tabs.Trigger>

        <hr />

        <Logout>Déconnexion</Logout>
      </Tabs.List>

      <Tabs.Content className={styles['tabs-content']} value="tab1">
        <h1>Vos Informations</h1>

        <hr />

        <div className={styles.infos}>
          <div className={styles['name-container']}>
            <p className={styles.label}>Nom</p>
            <p className={styles.name}>{user.name}</p>
          </div>

          <div className={styles['email-container']}>
            <p className={styles.label}>E-mail</p>
            <p className={styles.email}>{user.email}</p>
          </div>
        </div>

        <hr />

        {defaultAddress && (
          <div className={styles['address-container']}>
            <div className={styles['default-container']}>
              <p className={styles.label}>Adresse par défaut</p>
              <p className={styles.address}>
                {defaultAddress.firstname + ' ' + defaultAddress.lastname} <br />
                {defaultAddress.address + ' ' + defaultAddress.address_2} <br />
                {defaultAddress.city} <br />
                {defaultAddress.destination.name}
              </p>
            </div>
          </div>
        )}
        <Button onClick={() => setTabValue('tab2')} variant="cta-secondary" fit>
          {defaultAddress ? "Changer l'adresse par défaut" : 'Ajouter une adresse par défaut'}
        </Button>
      </Tabs.Content>

      <Tabs.Content className={styles['tabs-content']} value="tab2">
        <h1>Vos Adresses</h1>

        <hr />

        <div className="adresse-container">
          {addresses && <ListAddresses userId={user.id} addresses={addresses} destinationsPerGroup={destinationsPerGroup} setAddresses={setAddresses} />}
        </div>

        <Collapsible.Root className={styles['add-address-container']} open={openAddForm} onOpenChange={handleOpenChange}>
          <Collapsible.Trigger asChild>
            <Button variant="cta-secondary" fit>
              Ajouter une adresse
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content className={styles.content}>
            <AdresseForm
              destinationsPerGroup={destinationsPerGroup}
              operation="create"
              disabledDefaultAddress={isAddressesEmpty}
              handleOpenChange={handleOpenChange}
              setAddresses={setAddresses}
            />
          </Collapsible.Content>
        </Collapsible.Root>
      </Tabs.Content>
    </Tabs.Root>
  )
}
