
import { ResponseBuilder } from "@fermyon/spin-sdk";
import { handleError } from "./lib/handleError";
import { getBankHolidays } from './getBankHolidays';

export async function handler(req: Request, res: ResponseBuilder) {

    try {
        res.set("Content-Type", "application/json");
        res.send(JSON.stringify(await getBankHolidays()));
    }
    catch (error: unknown) {
        handleError(res, error);
    }
}
