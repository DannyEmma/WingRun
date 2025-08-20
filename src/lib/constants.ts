export const PASSWORD_MIN_LENGTH: number = 8

export const ERROR_MESSAGES: Record<string, string> = {
  //-- BETTER AUTH --
  INVALID_EMAIL: 'Votre adresse e-mail est invalide.',
  PASSWORD_TOO_SHORT: 'Votre mot de passe doit comporter au minimum ' + PASSWORD_MIN_LENGTH + ' caractères.',
  USER_ALREADY_EXISTS: 'Cette adresse e-mail est déjà utilisé par un autre utilisateur.',
  INVALID_EMAIL_OR_PASSWORD: 'Impossible de vous connecter, vérifiez votre e-mail et/ou votre mot de passe.',
  EMAIL_NOT_VERIFIED: 'Adresse e-mail non confirmée. Un e-mail de validation vient de vous être renvoyé.',
  INVALID_TOKEN: 'Le token est invalide.',

  //-- CUSTOM --
  CUSTOM_PASSWORDS_DO_NOT_MATCH: 'Les mots de passe ne correspondent pas.',
  CUSTOM_RESET_PASSWORD_TOKEN_INVALID: 'Le token permettant la réinitialisation du mot de passe est invalide.',
}
