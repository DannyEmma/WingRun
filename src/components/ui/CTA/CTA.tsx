import Link from 'next/link'
import styles from './CTA.module.css'

//-- Props Overload --
interface CTALink {
  variant: 'primary' | 'secondary'
  href: string
  children: React.ReactNode
  fit?: boolean
}
interface CTAButton extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  fit?: boolean
}

type CTAProps = CTALink | CTAButton

//-- Type guards --
function isCTALink(props: Record<string, any>): props is CTALink {
  return 'href' in props
}

export default function CTA(props: CTAProps) {
  if (isCTALink(props)) {
    return (
      <Link href={props.href} className={`${styles.cta} ${styles[props.variant]} ${props.fit && styles.fit}`}>
        {props.children}
      </Link>
    )
  }

  const { variant, children, fit, ...htmlAttributes } = props

  return (
    <button type="button" className={`${styles.cta} ${styles[props.variant]} ${props.fit && styles.fit}`} {...htmlAttributes}>
      {props.children}
    </button>
  )
}
