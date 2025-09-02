export const PASSWORD_MIN_LENGTH: number = 8

export const ERROR_MESSAGES: Record<string, string> = {
  //---------- BETTER AUTH ----------//
  INVALID_EMAIL: 'Votre adresse e-mail est invalide.',
  PASSWORD_TOO_SHORT: 'Votre mot de passe doit comporter au minimum ' + PASSWORD_MIN_LENGTH + ' caractères.',
  USER_ALREADY_EXISTS: 'Cette adresse e-mail est déjà utilisé par un autre utilisateur.',
  INVALID_EMAIL_OR_PASSWORD: 'Impossible de vous connecter, vérifiez votre e-mail et/ou votre mot de passe.',
  EMAIL_NOT_VERIFIED: 'Adresse e-mail non confirmée. Un e-mail de validation vient de vous être renvoyé.',
  INVALID_TOKEN: 'Le token est invalide.',

  //---------- CUSTOM AUTH ----------//
  CUSTOM_PASSWORDS_DO_NOT_MATCH: 'Les mots de passe ne correspondent pas.',
  CUSTOM_RESET_PASSWORD_TOKEN_INVALID: 'Le token permettant la réinitialisation du mot de passe est invalide.',

  //---------- CUSTOM ACCOUNT ----------//
  //-- Firstname --
  CUSTOM_FIRSTNAME_REQUIRED: 'Veuillez saisir votre prénom.',
  CUSTOM_FIRSTNAME_TOO_LONG: 'Votre prénom est trop long.',

  //-- Name --
  CUSTOM_NAME_REQUIRED: 'Veuillez saisir votre nom.',
  CUSTOM_NAME_TOO_LONG: 'Votre nom est trop long.',

  //-- Address  --
  CUSTOM_ADDRESS_REQUIRED: 'Veuillez saisir votre adresse.',
  CUSTOM_ADDRESS_TOO_LONG: 'Votre adresse est trop longue.',

  //-- Address 2 --
  CUSTOM_ADDRESS_2_TOO_LONG: 'Votre adresse complémentaire est trop longue.',

  //-- City --
  CUSTOM_CITY_REQUIRED: 'Veuillez saisir votre ville.',
  CUSTOM_CITY_TOO_LONG: 'Votre ville est trop longue.',

  //-- Cp --
  CUSTOM_CP_INVALID: 'Votre code postal est invalide.',

  //-- Phone --
  CUSTOM_PHONE_INVALID: 'Votre numéro de téléphone est invalide.',
}
