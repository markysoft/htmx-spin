import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { isJsonRequest } from '../lib/isJsonRequest'
import { getTides } from '../lib/getTides'
import { tideTemplate } from '../templates/tides'

export async function handleGetTides(req: Request, res: ResponseBuilder) {
    console.log('getting tides')
    const tideRecord = await getTides()
    if (isJsonRequest(req)) {
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(tideRecord))
    } else {
        res.set({ 'content-type': 'text/plain' })
        res.set({ 'Last-Modified': 'text/plain' })
        res.send(Sqrl.render(tideTemplate, { tideRecord }))
    }
}
