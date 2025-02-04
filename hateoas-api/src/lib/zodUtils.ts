import { z } from 'zod'
import { toHourMinuteString } from './dateUtils'

export const stringOrNumberToDate = z
  .string()
  .or(z.number())
  .transform((val) => new Date(val))
  .transform(toHourMinuteString)
  .optional()

export function splitOnSemiColons(input: string): string[] {
  return input.split(';')
}
