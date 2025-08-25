import prisma from '@/lib/prisma'

//---------- ADD ADDRESS ----------
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  //-- userId is an alias --
  const { id: userId } = await params
  const address = await request.json()
  const destinationId = address.destinationId
  delete address.destinationId

  try {
    //-- Get the name of the destination --
    await prisma.address.create({
      data: { ...address, user: { connect: { id: userId } }, destination: { connect: { id: destinationId } } },
    })
  } catch (error) {
    console.log(error)

    return Response.json({ message: 'Une erreur est survenue' }, { status: 500 })
  }

  return Response.json({ message: "L'adresse a bien été ajouté." }, { status: 201 })
}
