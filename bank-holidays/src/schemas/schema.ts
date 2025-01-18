import { z } from 'zod'
import { dashDateStringToDate } from '../lib/dateUtils'

export const BankHolidaySchema = z.object({
    title: z.string(),
    date: z.string().transform(dashDateStringToDate),
    notes: z.string(),
    bunting: z.boolean()
}).transform((val) => {
    return {
        ...val,
        substituteDay: val.notes === "Substitute day"
    }
})

export type BankHoliday = z.infer<typeof BankHolidaySchema>