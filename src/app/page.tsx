import { auth } from '@/lib/auth'
import Header from '@/components/Header/Header'
import LoginForm from '@/components/Form/Login'
import ResetPasswordForm from '@/components/Form/ForgotPassword'
import RegistrationForm from '@/components/Form/Registration'
import { headers } from 'next/headers'
import EmailVerificationToast from '@/components/EmailVerificationToast/EmailVerificationToast'

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const headersList = await headers()
  // const { verifiedEmail } = await searchParams
  // if (verifiedEmail) console.log('ouiiiiiiii')

  const handleClick = async () => {
    //-- Sign in --
    // const { data, error } = await authClient.signIn.email({
    //   email: 'emmadanny91@gmail.com', // required
    //   password: 'password1234',
    //   // rememberMe: false,
    //   // callbackURL: "https://example.com/callback",
    // })
    //-- Sign up --
    /*     const { data, error } = await authClient.signUp.email({
      name: 'Danny',
      email: 'emmadanny91@gmail.com', // required
      password: '1234',
      // rememberMe: false,
      // callbackURL: "https://example.com/callback",
    }) */
    //-- Password reset --
    // const { data, error } = await authClient.requestPasswordReset({
    //   email: 'emmadanny91@gmail.com', // required
    //   redirectTo: '/reset-password',
    // })
    //-- Sign out --
    // await authClient.signOut()
  }

  return (
    <>
      <EmailVerificationToast />
      <main>
        <h1>body</h1>
      </main>
    </>
  )
}
