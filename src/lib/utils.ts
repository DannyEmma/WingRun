import { ERROR_MESSAGES } from '@/lib/constants'

export function getErrorMessage(code: string) {
  return ERROR_MESSAGES[code] || 'Une erreur est survenue.'
}
