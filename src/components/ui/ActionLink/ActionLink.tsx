import styles from './ActionLink.module.css'

interface ActionLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function ActionLink({ children, ...props }: ActionLinkProps) {
  return (
    <button className={styles.link} {...props}>
      {children}
    </button>
  )
}
