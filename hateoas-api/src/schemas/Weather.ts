import { z } from 'zod'
import { SunSchema } from './SunSchema'
import { MoonSchema } from './Moon'

export const WeatherSchema = z.object({
  date: z.coerce.date().optional(),
  main: z.string().optional(),
  description: z.string().optional(),
  chanceOfRain: z.number().optional(),
  temp: z.object({
    max: z.number().optional(),
    min: z.number().optional(),
    day: z.number().optional(),
    night: z.number().optional(),
  }),
  wind: z.object({
    speed: z.number().optional(),
    maxSpeed: z.number().optional(),
    degrees: z.number().optional(),
  }),
})

export type Weather = z.infer<typeof WeatherSchema>

export const WeekAheadDaySchema = z.object({
  weather: WeatherSchema,
  sun: SunSchema,
  moon: MoonSchema,
  tides: z.array(z.date()).optional(),
})

export type WeekAheadDay = z.infer<typeof WeekAheadDaySchema>
