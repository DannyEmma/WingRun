import prisma from '@/lib/prisma'

//-- Update an address --
export async function PATCH(request: Request, { params }: { params: Promise<{ addressId: string }> }) {
  const addressId = await params

  console.log('addressId', addressId)
  return Response.json({ message: "L'adresse a bien été mis à jour." }, { status: 200 })
}
