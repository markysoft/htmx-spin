import { readFileSync } from "fs"
import {  getTideRecord } from "../../hateoas-api/src/lib/getTides"

describe('getTides', () => {
    test('parses tideRecord from RSS', async () => {
        const text = readFileSync(__dirname + '/../testdata/tides.rss', 'utf-8')
        expect(text).toBeDefined()
        const tideRecord = getTideRecord(text)
        console.log(tideRecord)
        expect(tideRecord).toBeDefined()
        expect(tideRecord.date).toBeDefined()
        expect(tideRecord.date).toEqual(new Date('Sun, 19 Jan 2025 00:00:00 GMT'))
        expect(tideRecord.tides).toBeDefined()
        expect(tideRecord.tides.length).toEqual(4)
        expect(tideRecord.tides[0].height).toEqual(1.35)
        expect(tideRecord.tides[0].type).toEqual('Low')
        expect(tideRecord.tides[0].time).toEqual('01:17')
        expect(tideRecord.tides[1].height).toEqual(4.87)
        expect(tideRecord.tides[1].type).toEqual('High')
        expect(tideRecord.tides[1].time).toEqual('07:22')
        expect(tideRecord.tides[2].height).toEqual(1.91)
        expect(tideRecord.tides[2].type).toEqual('Low')
        expect(tideRecord.tides[2].time).toEqual('13:14')
        expect(tideRecord.tides[1].time).toEqual('07:22')
        expect(tideRecord.tides[3].height).toEqual(5.17)
        expect(tideRecord.tides[3].type).toEqual('High')
        expect(tideRecord.tides[3].time).toEqual('19:25')
    })

    test('gracefully handles empty results RSS', () => {
        const tideRecord = getTideRecord('')
        expect(tideRecord).toBeDefined()
        expect(tideRecord.tides).toBeDefined()
        expect(tideRecord.tides.length).toEqual(0)
    })
})