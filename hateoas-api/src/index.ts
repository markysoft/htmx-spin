
import { ResponseBuilder, Router } from '@fermyon/spin-sdk'
import { handleError } from './lib/handleError'
import { handleDefaultRoute } from './routes/handleDefaultRoute'
import { handleGetBankHolidays } from './routes/handleGetBankHolidays'
import { handleGetTides } from './routes/handleGetTides'

const router = Router()

router.get(
    '/api/bank-holidays',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetBankHolidays(req, res) })


router.get(
    '/api/tides',
    async (_, req: Request, res: ResponseBuilder) => { await handleGetTides(req, res) })

router.all('*', (_, req, res) => { handleDefaultRoute(req, res) })

export async function handler(req: Request, res: ResponseBuilder) {
    try {
        await router.handleRequest(req, res)
    }
    catch (error: unknown) {
        console.error(error)
        handleError(res, error)
    }
}
