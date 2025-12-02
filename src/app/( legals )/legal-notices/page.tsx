import styles from '@/app/( legals )/Legals.module.css'

export default function LegalNoticesPage() {
  return (
    <div className={styles['page']}>
      <h1 className={styles['title']}>
        Mentions légales <br />
        <small className={styles['sub-title']}>⚠️ Ce document est fourni à titre fictif dans le cadre d’un projet personnel et ne constitue pas un document légal réel. ⚠️</small>
      </h1>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>éditeur du site</h2>

        <ul className={styles['list']}>
          <li>
            <strong>Nom de l’entreprise :</strong> [Nom de ton entreprise]
          </li>
          <li>
            <strong>Forme juridique :</strong> [Auto-entrepreneur / SAS / SARL, etc.]
          </li>
          <li>
            <strong>Capital social :</strong> [Le cas échéant]
          </li>
          <li>
            <strong>Adresse du siège social :</strong> [Adresse complète]
          </li>
          <li>
            <strong>SIRET :</strong> [Numéro SIRET]
          </li>
          <li>
            <strong>Numéro RCS :</strong> [Numéro d’immatriculation au Registre du Commerce]
          </li>
          <li>
            <strong>Responsable de la publication :</strong> [Nom et prénom]
          </li>
          <li>
            <strong>Email de contact :</strong> [Email professionnel]
          </li>
          <li>
            <strong>Téléphone :</strong> [Numéro de téléphone, facultatif]
          </li>
        </ul>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>hébergeur du site</h2>

        <ul className={styles['list']}>
          <li>
            <strong>Nom de l’hébergeur : </strong>[Nom de l’hébergeur, ex : OVH / Hostinger / Shopify]
          </li>
          <li>
            <strong>Adresse de l’hébergeur : </strong>[Adresse complète]
          </li>
          <li>
            <strong>Téléphone : </strong>[Téléphone de l’hébergeur]
          </li>
        </ul>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>propriété intellectuelle</h2>
        <p className={styles['text']}>
          L'ensemble des contenus présents sur le site [Nom du site / URL], incluant de façon non limitative les graphismes, images, textes, vidéos, animations, sons, logos, gifs
          et icônes ainsi que leur mise en forme, sont la propriété exclusive de [Nom de ton entreprise], à l’exception des marques, logos ou contenus appartenant à d'autres
          sociétés partenaires ou auteurs. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est
          strictement interdite sans l’accord écrit de [Nom de ton entreprise].
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}> Données personnelles</h2>
        <p className={styles['text']}>
          Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), les utilisateurs disposent d’un
          droit d’accès, de rectification, de suppression et d’opposition aux données personnelles les concernant. Pour exercer ce droit, veuillez nous contacter à l’adresse
          suivante : [Adresse email ou formulaire de contact]. Le site peut collecter automatiquement certaines informations concernant l’utilisateur lors de sa navigation
          (cookies, adresse IP, etc.), notamment à des fins statistiques ou d’amélioration de l’expérience utilisateur.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Cookies</h2>
        <p className={styles['text']}>
          Le site peut être amené à demander l’acceptation des cookies pour des besoins de statistiques et d’affichage. Un cookie est une information déposée sur le disque dur de
          l’utilisateur par le serveur du site visité. L’utilisateur peut configurer son navigateur pour refuser les cookies.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>Droit applicable et juridiction compétente</h2>
        <p className={styles['text']}>
          Tout litige en relation avec l’utilisation du site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </section>
    </div>
  )
}
