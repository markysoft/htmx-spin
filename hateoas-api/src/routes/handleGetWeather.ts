import { ResponseBuilder } from '@fermyon/spin-sdk'
import * as Sqrl from 'squirrelly'
import { isJsonRequest } from '../lib/isJsonRequest'
import { weatherTemplate } from '../templates/weather'
import { oneHourInSeconds } from '../config'
import { getTodayWeather } from '../lib/getWeatherAccu'

export async function handleGetWeather(req: Request, res: ResponseBuilder) {
    console.log('getting weather')
    const weatherRecord = await getTodayWeather()
    res.set('Cache-Control', `public, max-age=${oneHourInSeconds}`)
    if (isJsonRequest(req)) {
        res.set('Content-Type', 'application/json')
        res.send(JSON.stringify(weatherRecord))
    } else {
        res.set('Content-Type', 'text/html')
        res.send(Sqrl.render(weatherTemplate, { weatherRecord }))
    }
}
