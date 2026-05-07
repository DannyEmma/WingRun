import z from "zod"
import { CategorySize } from "../../../prisma/generated/enums"

export const SizeSchema = z.object({
  id: z.int(),
  size: z.string(),
  category: z.enum(Object.values(CategorySize)),
})
