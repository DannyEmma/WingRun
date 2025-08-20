import styles from './Button.module.css'

export default function Button({
  children,
  type = 'button',
  variant = 'cta',
}: {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset' | undefined
  variant?: 'cta' | 'link'
}) {
  const buttonStyle = variant === 'cta' ? styles['btn-cta'] : styles['btn-link']

  return (
    <button type={type} className={`${styles.btn} ${buttonStyle}`}>
      {children}
    </button>
  )
}
