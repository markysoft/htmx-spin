import { z } from 'zod'

export const stringOrNumberToDate = z
  .string()
  .or(z.number())
  .transform((val) => new Date(val))
  .optional()
