import { router } from '../trpc'
import { exampleRouter } from './example'
import { converterRouter } from './converter'

export const appRouter = router({
    example: exampleRouter,
    converter: converterRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
