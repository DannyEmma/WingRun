// import prisma from '@/lib/prisma'

// //---------- GET ALL DESTINATIONS ----------
// export async function GET(request: Request) {
//   let destinations = null

//   try {
//     destinations = await prisma.destination.findMany({
//       where: {
//         actif: {
//           equals: true,
//         },
//       },
//       orderBy: [{ group: 'asc' }],
//     })
//   } catch (error) {
//     console.log(error)

//     return Response.json({ error, success: false }, { status: 500 })
//   }

//   return Response.json({ data: destinations, success: true }, { status: 200 })
// }
