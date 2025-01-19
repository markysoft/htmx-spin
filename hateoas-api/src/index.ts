
import { ResponseBuilder, Router } from "@fermyon/spin-sdk"
import * as Sqrl from 'squirrelly'
import { handleError } from "./lib/handleError"
import { getBankHolidays } from './getBankHolidays'
import { holidayTemplate } from "./templates/holiday-list"


const router = Router()

router.get(
    "/bank-holidays",
    (_, req: Request, res: ResponseBuilder) => { handleGetBankHolidays(req, res) })

async function handleGetBankHolidays(req: Request, res: ResponseBuilder) {

    try {
        const holidays = await getBankHolidays()
        if (req.headers.get("Content-Type") === "application/json") {
            res.set("Content-Type", "application/json")
            res.send(JSON.stringify(holidays))
        } else {
            res.set("Content-Type", "text/plain")
            res.send(Sqrl.render(holidayTemplate, { holidays }));
        }
    }
    catch (error: unknown) {
        handleError(res, error)
    }
}


export async function handler(req: Request, res: ResponseBuilder) {
    await router.handleRequest(req, res)
}