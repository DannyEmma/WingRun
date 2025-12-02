import styles from '@/app/( legals )/Legals.module.css'

export default function TermsOfSalePage() {
  return (
    <div className={styles['page']}>
      <h1 className={styles['title']}>
        Conditions Générales de Vente <br />
        <small className={styles['sub-title']}>⚠️ Ce document est fourni à titre fictif dans le cadre d’un projet personnel et ne constitue pas un document légal réel. ⚠️</small>
      </h1>
      <section className={styles['section']}>
        <strong>Dernière mise à jour : [Date]</strong>

        <p className={styles['text']}>Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations contractuelles entre :</p>

        <br />
        <strong>Le vendeur :</strong>
        <br />
        <br />
        <ul className={styles['list']}>
          <li>[Nom de ton entreprise]</li>
          <li>[Adresse complète] </li>
          <li>[Numéro SIRET] </li>
          <li>Email : [adresse email] </li>
          <li>(ci-après « le Vendeur »)</li>
          <li>Et</li>
        </ul>

        <strong>Toute personne physique effectuant un achat via le site Internet [URL de ton site], (ci-après « le Client »).</strong>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>objet</h2>

        <p className={styles['text']}>
          Les présentes CGV définissent les droits et obligations des parties dans le cadre de la vente en ligne de sneakers et accessoires proposés par le Vendeur au Client.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>produits</h2>

        <p className={styles['text']}>
          Les produits proposés sont ceux qui figurent sur le site [Nom du site], dans la limite des stocks disponibles. Chaque produit est présenté avec une description détaillée.
          Les photographies sont les plus fidèles possibles, mais ne peuvent assurer une similitude parfaite avec le produit, notamment en ce qui concerne les couleurs.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>prix</h2>

        <p className={styles['text']}>
          Les prix sont indiqués en <strong>euros (€), toutes taxes comprises (TTC)</strong>, hors frais de livraison. Le Vendeur se réserve le droit de modifier ses prix à tout
          moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>commandes</h2>

        <p className={styles['text']}>
          Le Client peut passer commande sur le site [URL]. Toute commande vaut acceptation des prix et description des produits disponibles à la vente. Le Vendeur accusera
          réception de la commande par l’envoi d’un email de confirmation.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>paiment</h2>

        <p className={styles['text']}>
          Le paiement s’effectue en ligne par carte bancaire, PayPal ou tout autre moyen proposé sur le site. Les transactions sont sécurisées via un prestataire de paiement
          ([Stripe ]). Aucune donnée bancaire n’est conservée par le Vendeur.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>livraison</h2>

        <p className={styles['text']}>
          Les produits sont livrés à l’adresse indiquée par le Client au moment de la commande. Délais indicatifs : entre [X] et [Y] jours ouvrés selon la destination. Frais de
          livraison : [gratuit / précisés avant validation de la commande]. Le Vendeur ne peut être tenu responsable des retards de livraison dus au transporteur ou à un cas de
          force majeure.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>droit et rétractation</h2>

        <p className={styles['text']}>
          Conformément à l’article L221-18 du Code de la consommation, le Client dispose d’un délai de 14 jours à compter de la réception du produit pour exercer son droit de
          rétractation, sans justification ni pénalité. Pour exercer ce droit, le Client doit notifier sa décision par email à [adresse email] ou via le formulaire de rétractation
          disponible ici : [URL du formulaire si tu en as un]. Le produit doit être retourné dans son état d’origine, non porté, dans l’emballage d’origine, à l’adresse suivante :
          [Adresse de retour] Les frais de retour sont à la charge du Client. Le remboursement sera effectué sous 14 jours après réception du retour. ⚠️ Les produits portés,
          utilisés ou endommagés ne seront ni repris ni remboursés.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>garanties</h2>

        <p className={styles['text']}>
          Tous les produits bénéficient de la garantie légale de conformité (articles L217-4 à L217-14 du Code de la consommation) et de la garantie des vices cachés (articles 1641
          à 1649 du Code civil). En cas de produit non conforme ou défectueux, le Client peut demander un remplacement ou un remboursement, sans frais.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>resonsabilité</h2>

        <p className={styles['text']}>
          Le Vendeur ne saurait être tenu pour responsable de l’inexécution du contrat en cas de rupture de stock, indisponibilité du produit, force majeure ou perturbation des
          services postaux ou de transport.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>données personnelles</h2>

        <p className={styles['text']}>
          Les informations collectées lors de la commande font l’objet d’un traitement informatique destiné à la gestion de la relation commerciale. Le Client dispose d’un droit
          d’accès, de rectification, de suppression et d’opposition à ses données, conformément à la loi « Informatique et Libertés » et au RGPD. Voir notre Politique de
          confidentialité pour plus de détails : [Lien vers la page dédiée].
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>droit applicable et litiges</h2>

        <p className={styles['text']}>
          Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux
          compétents seront ceux du ressort du siège social du Vendeur.
        </p>
      </section>

      <section className={styles['section']}>
        <h2 className={styles['secondary-title']}>contact</h2>

        <p>Pour toute question, demande ou réclamation, vous pouvez nous contacter à :</p>
        <br />
        <ul className={styles['list']}>
          <li>📧 [Adresse email]</li>
          <li>📞 [Numéro de téléphone, si tu en as un]</li>
        </ul>
      </section>
    </div>
  )
}
