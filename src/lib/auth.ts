import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import sendEmail from '@/lib/email' // your email sending function
import { PASSWORD_MIN_LENGTH } from '@/lib/constants'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "sqlite", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: PASSWORD_MIN_LENGTH,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: 'Réinitialiser votre mot de passe',
        text: `
Bonjour ${user.name},

Vous avez demandé à réinitialiser le mot de passe de votre compte WingRun.
Pour définir un nouveau mot de passe, cliquez sur le lien ci-dessous :

${url}

Ce lien expirera dans 1h heure pour des raisons de sécurité.
Si vous n’êtes pas à l’origine de cette demande, ignorez simplement cet e-mail.

L’équipe WingRun.`,
      })
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      user.name
      await sendEmail({
        to: user.email,
        subject: 'Confirmation de votre addresse e-mail',
        text: `
Bonjour ${user.name},

Merci de vous être inscrit(e) sur WingRun.
Pour finaliser la création de votre compte et commencer à profiter de nos services, veuillez confirmer votre adresse e-mail en cliquant sur le lien ci-dessous :

${url}

Ce lien expirera dans 1h heure pour des raisons de sécurité.
Si vous n’êtes pas à l’origine de cette inscription, ignorez simplement cet e-mail.

L’équipe WingRun`,
      })
    },
    async afterEmailVerification(user, request) {
      // Your custom logic here, e.g., grant access to premium features
      // console.log(`${user.email} has been successfully verified!`)
      const cookieStore = await cookies()
      cookieStore.set('verified_email_success', 'true')
    },
  },
})
