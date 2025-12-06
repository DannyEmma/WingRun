import styles from './AccountPage.module.css'
import TabsAccount from '@/components/features/account/TabsAccount/TabsAccount'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { service } from '@/lib/services'

type Tab = 'profil' | 'addresses' | 'orders'

function isTab(tab: string): tab is Tab {
  return ['profil', 'addresses', 'orders'].includes(tab)
}

interface AccountPageProps {
  params: Promise<any>
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { tab } = await params

  if (!isTab(tab)) return notFound()

  const result = await auth.api.getSession({
    headers: await headers(),
  })
  const session = result?.session

  let user, defaultAddress, addresses, destinationsPerGroup, orders

  if (session) {
    user = (await service.user.getUser(session.userId)).data
    addresses = (await service.user.getAddresses(session.userId)).data
    destinationsPerGroup = (await service.destination.getDestinationsPerGroup()).data
    defaultAddress = addresses?.filter((address) => address.isDefault)[0]
    orders = (await service.order.getOrders(user?.id ?? '')).data
  }

  return (
    <main className={styles['account-page-container']}>
      {user && destinationsPerGroup && (
        <TabsAccount user={user} defaultAddress={defaultAddress} addresses={addresses} destinationsPerGroup={destinationsPerGroup} orders={orders} tab={tab} />
      )}
    </main>
  )
}
