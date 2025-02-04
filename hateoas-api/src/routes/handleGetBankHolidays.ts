import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { isJsonRequest } from '../lib/isJsonRequest'
import { getBankHolidays } from '../getBankHolidays'
import { holidayTemplate } from '../templates/holiday-list'
import { twentyFourHoursInSeconds } from '../config'

export async function handleGetBankHolidays(req: Request, res: ResponseBuilder) {
    console.log('getting bank holidays')
    const holidays = await getBankHolidays()
    res.set('Cache-Control', `public, max-age=${twentyFourHoursInSeconds}`)
    if (isJsonRequest(req)) {
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(holidays))
    } else {
        res.set('Content-Type', 'text/plain')
        res.send(Sqrl.render(holidayTemplate, { holidays }))
    }
}
