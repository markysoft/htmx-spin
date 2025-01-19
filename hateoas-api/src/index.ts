
import { ResponseBuilder, Router } from "@fermyon/spin-sdk"
import * as Sqrl from 'squirrelly'
import { handleError } from "./lib/handleError"
import { getBankHolidays } from './getBankHolidays'
import { holidayTemplate } from "./templates/holiday-list"


const router = Router()


router.get(
    "/api/bank-holidays",
    async (_, req: Request, res: ResponseBuilder) => { await handleGetBankHolidays(req, res) })

router.all("*", (_, req, res) => { handleDefaultRoute(req, res) })

async function handleGetBankHolidays(req: Request, res: ResponseBuilder) {
    console.log("bank hols received")
    try {
        const holidays = await getBankHolidays()
        if (req.headers.get("Content-Type") === "application/json") {
            res.set("Content-Type", "application/json")
            res.send(JSON.stringify(holidays))
        } else {
            res.set("Content-Type", "text/plain")
            res.send(Sqrl.render(holidayTemplate, { holidays }))
        }
    }
    catch (error: unknown) {
        handleError(res, error)
    }
}
async function handleDefaultRoute(_req: Request, res: ResponseBuilder) {
    res.set({ "content-type": "text/plain" })
    res.send("no such route, try another")
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