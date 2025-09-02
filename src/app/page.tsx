import EmailVerificationToast from '@/components/providers/EmailVerificationToast/EmailVerificationToast'

export default async function Home() {
  return (
    <>
      <EmailVerificationToast />
      <main>
        <h1>body</h1>
      </main>
    </>
  )
}
