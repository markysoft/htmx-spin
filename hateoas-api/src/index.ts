
import { ResponseBuilder, Router } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { handleError } from './lib/handleError'
import { getBankHolidays } from './getBankHolidays'
import { holidayTemplate } from './templates/holiday-list'
import { getTides } from './lib/getTides'
import { tideTemplate } from './templates/tides'


const router = Router()


router.get(
    '/api/bank-holidays',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetBankHolidays(req, res) })


router.get(
    '/api/tides',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetTides(req, res) })

router.all('*', (_, req, res) => { handleDefaultRoute(req, res) })

async function handleGetBankHolidays(req: Request, res: ResponseBuilder) {
    console.log('getting bank holidays')
    const holidays = await getBankHolidays()
    if (isJsonRequest(req)) {
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(holidays))
    } else {
        res.set('Content-Type', 'text/plain')
        res.send(Sqrl.render(holidayTemplate, { holidays }))
    }
}

async function handleGetTides(req: Request, res: ResponseBuilder) {
    console.log('getting tides')
    const tideRecord = await getTides()
    if (isJsonRequest(req)) {
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(tideRecord))
    } else {
        res.set({ 'content-type': 'text/plain' })
        res.send(Sqrl.render(tideTemplate, { tideRecord }))
    }
}

async function handleDefaultRoute(req: Request, res: ResponseBuilder) {
    res.set({ 'content-type': 'text/plain' })
    res.send('no such route, try another')
}

export async function handler(req: Request, res: ResponseBuilder) {
    try {
        await router.handleRequest(req, res)
    }
    catch (error: unknown) {
        console.log(error)
        handleError(res, error)
    }

}

function isJsonRequest(req: Request) {
    return req.headers.get('Content-Type') === 'application/json'
}