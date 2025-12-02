import styles from '@/app/( legals )/Legals.module.css'

export default function PrivacyPolicyPage() {
  return (
    <div className={styles['page']}>
      <h1 className={styles['title']}>
        Politique de confidentialité <br />
        <small className={styles['sub-title']}>⚠️ Ce document est fourni à titre fictif dans le cadre d’un projet personnel et ne constitue pas un document légal réel. ⚠️</small>
      </h1>
      <section className={styles['section']}>
        <strong>Dernière mise à jour : [Date]</strong>
        <br />
        <br />
        <p className={styles['text']}>
          La présente politique de confidentialité a pour but d’informer les utilisateurs du site [Nom du site – URL complète] sur la manière dont sont collectées, utilisées et
          protégées leurs données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française Informatique et Libertés.
        </p>
      </section>
      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Responsable du traitement</h2>

        <p className={styles['text']}>Le responsable du traitement des données personnelles est :</p>
        <br />
        <ul className={styles['list']}>
          <li>
            <strong>[Nom de l’entreprise ou du responsable légal]:</strong>
          </li>

          <li>
            <strong>Adresse :</strong> [Adresse du siège social]
          </li>
          <li>
            <strong>Email :</strong> [Adresse email de contact]
          </li>
          <li>
            <strong>SIRET :</strong> [Numéro de SIRET]
          </li>
        </ul>
      </section>
      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Données collectées</h2>

        <p className={styles['text']}>Nous collectons les données suivantes via notre site lors de :</p>
        <br />
        <ol className={styles['list']}>
          <li>
            <strong>Commandes ou inscriptions :</strong>
            <ul className={styles['list-disc']}>
              <li>Nom, prénom</li>
              <li>Adresse postale</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Adresse IP</li>
              <li>Informations de paiement (via un prestataire sécurisé : [Stripe / PayPal / Shopify Payments…])</li>
            </ul>
          </li>
          <li>
            <strong>Navigation sur le site :</strong>
            <ul className={styles['list-disc']}>
              <li>Données de connexion (adresse IP, type de navigateur, pages visitées, temps de visite)</li>
              <li>Cookies (voir section Cookies)</li>
            </ul>
          </li>
          <li>
            <strong>Formulaires de contact ou inscription à la newsletter :</strong>
            <ul className={styles['list-disc']}>
              <li>Nom, prénom</li>
              <li>Adresse e-mail</li>
              <li>Message ou demande envoyée</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Finalité de la collecte</h2>

        <p>Les données collectées ont pour finalité :</p>
        <br />
        <ul className={styles['list-disc']}>
          <li>Le traitement des commandes et la gestion du service client</li>
          <li>L’envoi d’informations promotionnelles (si accord préalable)</li>
          <li>L’amélioration de l’expérience utilisateur et du site</li>
          <li>Le respect des obligations légales et réglementaires</li>
        </ul>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Base légale du traitement</h2>

        <p>Les traitements sont fondés sur :</p>
        <br />
        <ul className={styles['list-disc']}>
          <li>L’exécution d’un contrat (commande)</li>
          <li>Le consentement (formulaires, newsletter, cookies)</li>
          <li>L’intérêt légitime du responsable de traitement</li>
          <li>Le respect des obligations légales</li>
        </ul>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Durée de conservation</h2>

        <p>Les données sont conservées :</p>
        <br />
        <ul className={styles['list-disc']}>
          <li>Pendant toute la durée de la relation commerciale</li>
          <li>Jusqu’à 3 ans après le dernier contact pour les prospects</li>
          <li>10 ans pour les factures et données comptables (obligation légale)</li>
        </ul>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Destinataires des données</h2>

        <p>Les données peuvent être transmises à :</p>
        <br />
        <ul className={styles['list-disc']}>
          <li>Nos prestataires techniques (hébergeur, service de paiement, logistique)</li>
          <li>Nos partenaires marketing (uniquement si vous y avez consenti)</li>
          <li>Les autorités administratives ou judiciaires sur demande légale</li>
        </ul>

        <p>Nous ne revendons jamais vos données personnelles.</p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Sécurité des données</h2>

        <p>Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données personnelles :</p>
        <br />
        <ul className={styles['list-disc']}>
          <li>Hébergement sécurisé</li>
          <li>Protocoles de chiffrement SSL/TLS</li>
          <li>Accès restreint aux données</li>
        </ul>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Vos droits</h2>

        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <br />
        <ul className={styles['list-disc']}>
          <li>Droit d’accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l’effacement (dans les limites légales)</li>
          <li>Droit d’opposition au traitement</li>
          <li>Droit à la portabilité</li>
          <li>Droit à la limitation du traitement</li>
        </ul>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Cookies</h2>

        <p>Ce site n'utilise pas de cookies.</p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Modifications de la politique</h2>

        <p className={styles['text']}>
          Nous nous réservons le droit de modifier cette politique à tout moment. Les utilisateurs seront informés via le site ou par email si nécessaire.
        </p>
      </section>
    </div>
  )
}

//   <section className={styles['section']}>
//     <h2 className={styles['secondary-title']}>éditeur du site</h2>

//     <ul className={styles['list']}>
