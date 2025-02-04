import { getTodayWeather } from "../../hateoas-api/src/lib/getWeatherAccu"

describe('getTides', () => {
    test('parses tideRecord from RSS', async () => {
        const weather = await getTodayWeather()
        expect(weather).toBeDefined()
    })

})