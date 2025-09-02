import { ERROR_MESSAGES } from '@/lib/constants'

export function displayErrorMessage(code: string) {
  return ERROR_MESSAGES[code] || 'Une erreur est survenue.'
}
