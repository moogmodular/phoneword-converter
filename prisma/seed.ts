import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    await prisma.words.deleteMany({})

    const allFileContents = fs.readFileSync(path.join(__dirname, './wordlist.txt'), 'utf-8')
    const wordLines = allFileContents.split(/\r?\n/)

    try {
        await Promise.all(
            wordLines.map(async (line) => {
                console.log(line)
                if (!line) {
                    return
                }
                return await prisma.words
                    .create({
                        data: {
                            word: line,
                        },
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }),
        )

        console.log('Done!')
    } catch (e) {
        console.log('Failed!', e)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
