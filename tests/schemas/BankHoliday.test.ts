
import { BankHoliday, BankHolidaySchema } from '../../hateoas-api/src/schemas/BankHoliday';

describe('Bank Holiday Schema', () => {
    test('Schema is defined', () => {
        expect(BankHolidaySchema).toBeDefined()
    })
    test('Schema parses valid object', () => {
        const bankHoliday: BankHoliday = BankHolidaySchema.parse({ title: 'Boxing Day', date: '2022-12-28', notes: 'Substitute day', bunting: true })
        expect(bankHoliday).toBeDefined()
        expect(bankHoliday.title).toEqual('Boxing Day')
        expect(bankHoliday.date.getFullYear()).toEqual(2022)
        // because months are 0-indexed...
        expect(bankHoliday.date.getMonth()).toEqual(11)
        expect(bankHoliday.date.getDate()).toEqual(28)
        expect(bankHoliday.dateString).toEqual('Wednesday 28 December 2022')
        expect(bankHoliday.notes).toEqual('Substitute day')
        expect(bankHoliday.bunting).toEqual(true)
        expect(bankHoliday.substituteDay).toEqual(true)
    })
})