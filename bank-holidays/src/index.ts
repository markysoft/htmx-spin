
import { ResponseBuilder } from "@fermyon/spin-sdk"
import * as Sqrl from 'squirrelly'
import { handleError } from "./lib/handleError"
import { getBankHolidays } from './getBankHolidays'
import { holidayTemplate } from "./templates/holiday-list"

export async function handler(req: Request, res: ResponseBuilder) {

    try {
        const contentType = req.headers.get("Content-Type")
        console.log("Content-Type:", contentType)

        const holidays = await getBankHolidays()
        console.log(holidays[0])
        if (contentType === "application/json") {
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
