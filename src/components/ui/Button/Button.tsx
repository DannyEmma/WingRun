import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant: 'cta-primary' | 'cta-secondary' | 'link'
  fit?: boolean
}

export default function Button({ variant, fit, children, ...props }: ButtonProps) {
  return (
    <button className={`${variant !== 'link' && styles.cta} ${styles[variant]} ${fit && styles['cta-fit']}`} {...props}>
      {children}
    </button>
  )
}
