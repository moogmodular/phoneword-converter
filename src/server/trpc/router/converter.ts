import { z } from 'zod'
import { prisma } from '../../db/client'

import { publicProcedure, router } from '../trpc'
import { convertNumberInput } from '../../../components/ConverterForm'

const keyboardMap = {
    0: ' ',
    1: '',
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
} as Record<string, string>

const getMatches = async (letters: string) => {
    const matches = await prisma.words.findMany({
        where: {
            word: {
                equals: letters.toLowerCase(),
            },
        },
    })
    return matches.map((match) => match.word)
}

export const converterRouter = router({
    convertNumber: publicProcedure.input(convertNumberInput).query(async ({ input }) => {
        const digits = input.number.split('')

        const wordList = digits.reduce((acc, digit) => {
            const letters = keyboardMap[digit] ?? ''
            if (acc.length === 0) {
                return letters.split('')
            }
            return acc.flatMap((word) => letters.split('').map((letter) => word + letter))
        }, [] as string[])

        const res = await Promise.all(
            wordList.map(async (word) => {
                return {
                    letters: word,
                    exactMatches: await getMatches(word),
                }
            }),
        )

        return {
            wordList: input.onlyMatches
                ? res.filter((word) => word.exactMatches.length > 0)
                : res.sort((a, b) => b.exactMatches.length - a.exactMatches.length),
        }
    }),
})
