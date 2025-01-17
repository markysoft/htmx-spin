import { z } from 'zod';
import { getOneYearsTime } from './lib/dateUtils';
import { BankHoliday, BankHolidaySchema } from './schemas/schema';

export async function getBankHolidays() {
    
    const holidaysResponse = await fetch("https://www.gov.uk/bank-holidays.json");
    if (!holidaysResponse.ok) {
        throw new Error(`Failed to fetch bank holidays: ${holidaysResponse.statusText}`);
    }
    const {
        'england-and-wales': { events },

    } = await holidaysResponse.json();

    const now = new Date();
    const filter = (e: BankHoliday) => e.date > now && e.date < getOneYearsTime(now)

    var holidays = z.array(BankHolidaySchema).parse(events).filter(filter);
    return holidays;
}
