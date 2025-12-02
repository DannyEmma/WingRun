import styles from './AccountPage.module.css'
import DestinationService from '@/lib/services/destination'
import TabsAccount from '@/components/features/account/TabsAccount/TabsAccount'
import UserService from '@/lib/services/user'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import OrderService from '@/lib/services/order'
import { notFound } from 'next/navigation'

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
    user = await UserService.getUser(session.userId)
    addresses = await UserService.getAddresses(session.userId)
    destinationsPerGroup = await DestinationService.getDestinationsPerGroup()
    defaultAddress = addresses.filter((address) => address.isDefault)[0]
    orders = (await OrderService.getOrders(user?.id ?? '')).data
  }

  return (
    <main className={styles['account-page-container']}>
      {user && destinationsPerGroup && (
        <TabsAccount user={user} defaultAddress={defaultAddress} addresses={addresses} destinationsPerGroup={destinationsPerGroup} orders={orders} tab={tab} />
      )}
    </main>
  )
}
