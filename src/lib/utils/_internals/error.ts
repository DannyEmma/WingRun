import { ERROR_MESSAGES } from '@/lib/constants'

export class ErrorUtil {
  displayErrorMessage(code: string): string {
    return ERROR_MESSAGES[code] || 'Une erreur est survenue.'
  }
}
