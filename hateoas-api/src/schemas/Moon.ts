import { z } from 'zod'
import { stringOrNumberToDate } from '../lib/zodUtils'
export const MoonSchema = z.object({
  phase: z.number().optional(),
  angle: z.number().optional(),
  rise: stringOrNumberToDate,
  set: stringOrNumberToDate,
})


export type Moon = z.infer<typeof MoonSchema>