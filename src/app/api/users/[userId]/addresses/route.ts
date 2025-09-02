import prisma from '@/lib/prisma'

//---------- CREATE ----------
//-- Create an address --
export async function POST(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params

  const address = await request.json()
  const destinationId = address.destinationId
  delete address.destinationId

  try {
    //-- Only one default address --
    if (address.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: userId,
        },
        data: {
          isDefault: false,
        },
      })
    }

    await prisma.address.create({
      data: { ...address, user: { connect: { id: userId } }, destination: { connect: { id: destinationId } } },
    })
  } catch (error) {
    console.log(error)
    return Response.json({ success: false, error }, { status: 500 })
  }

  return Response.json({ success: true }, { status: 201 })
}

//---------- READ ----------
//-- Get all address --
export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params

  let addresses = null

  try {
    addresses = await prisma.address.findMany({
      where: {
        userId,
      },
      include: {
        destination: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        isDefault: 'desc',
      },
    })
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 })
  }

  return Response.json({ success: true, data: addresses }, { status: 200 })
}
