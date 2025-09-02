import styles from './Input.module.css'
import ErrorBanner from '@/components/shared/ErrorBanner/ErrorBanner'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  errorCode: string | undefined
}

export default function Input({ label, id, errorCode, ...props }: InputProps) {
  return (
    <div className={styles['input-container']} data-has-error={errorCode ? 'true' : 'false'}>
      <label htmlFor={id}>
        {label} {props.required ? <sup>*</sup> : ''}
      </label>
      <input id={id} {...props} />
      <div className={styles['error-banner-container']}>
        <ErrorBanner code={errorCode} />
      </div>
    </div>
  )
}
