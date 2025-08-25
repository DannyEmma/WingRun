import styles from './AccountPage.module.css'
import { Tabs, Collapsible } from 'radix-ui'
import AdresseForm from '@/components/Form/Adresse'
import Logout from '@/components/Logout/Logout'

export default function AccountPage() {
  return (
    <main className={styles['account-page-container']}>
      <Tabs.Root className={styles.tabs} defaultValue="tab1" orientation="vertical">
        <Tabs.List className={styles['tabs-list']} aria-label="tabs example">
          <Tabs.Trigger value="tab1">Profil</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Adresses</Tabs.Trigger>
          <Logout>Déconnexion</Logout>
        </Tabs.List>
        <Tabs.Content className={styles['tabs-content']} value="tab1">
          <h1>Vos Informations</h1>
          <div className="infos">
            <div className="name-container">
              <p className="label">Nom</p>
              <p className="name">Danny EMMA</p>
            </div>
            <div className="email-container">
              <p className="label">E-mail</p>
              <p className="email">emmadanny91@gmail.com</p>
            </div>
          </div>
          <div className="adresse">
            <div className="default-container">
              <p className="label">Adresse par défaut</p>
              <p className="adresse">
                Danny Emma <br />
                11 avenue du verger <br />
                Bras panon <br />
                Réunion
              </p>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content className={styles['tabs-content']} value="tab2">
          <h1>Vos Adresses</h1>
          <div className="adresse-container">
            <h2>Adresse par défaut</h2>

            <div>
              <p className="adresse">
                Danny Emma <br />
                11 avenue du verger <br />
                Bras panon <br />
                Réunion
              </p>
              <div>
                <Collapsible.Root>
                  <Collapsible.Trigger>Edit</Collapsible.Trigger>
                  <Collapsible.Content>
                    <AdresseForm operation="update" />
                  </Collapsible.Content>
                </Collapsible.Root>
                <button>Delete</button>
              </div>
            </div>
          </div>
          <Collapsible.Root>
            <Collapsible.Trigger>Ajouter une adresse</Collapsible.Trigger>
            <Collapsible.Content>
              <AdresseForm operation="create" />
            </Collapsible.Content>
          </Collapsible.Root>
        </Tabs.Content>
      </Tabs.Root>
    </main>
  )
}
