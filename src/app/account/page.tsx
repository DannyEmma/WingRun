import styles from './AccountPage.module.css'
import DestinationService from '@/lib/services/destination'
import TabsAccount from '@/components/features/account/TabsAccount/TabsAccount'
import UserService from '@/lib/services/user'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function AccountPage() {
  const result = await auth.api.getSession({
    headers: await headers(),
  })
  const session = result?.session

  let user, defaultAddress, addresses, destinationsPerGroup

  if (session) {
    user = await UserService.getUser(session.userId)
    addresses = await UserService.getAddresses(session.userId)
    destinationsPerGroup = await DestinationService.getDestinationsPerGroup()
    defaultAddress = addresses.filter((address) => address.isDefault)[0]
  }

  return (
    <main className={styles['account-page-container']}>
      {user && destinationsPerGroup && <TabsAccount user={user} defaultAddress={defaultAddress} addresses={addresses} destinationsPerGroup={destinationsPerGroup} />}
    </main>
  )
}
