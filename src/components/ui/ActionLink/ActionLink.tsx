import Link from 'next/link'
import styles from './ActionLink.module.css'

interface ButtonAction extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

interface LinkAction {
  children: React.ReactNode
  href: string
}

type ActionLinkProps = ButtonAction | LinkAction

//-- Type guards --
function isLink(props: Record<string, any>): props is LinkAction {
  return 'href' in props
}

export default function ActionLink(props: ActionLinkProps) {
  //-- Need a link --
  if (isLink(props)) {
    return (
      <Link href={props.href} className={styles.link}>
        {props.children}
      </Link>
    )
  }

  const { children, ...htmlAttributes } = props
  return (
    <button className={styles.link} {...htmlAttributes}>
      {children}
    </button>
  )
}
