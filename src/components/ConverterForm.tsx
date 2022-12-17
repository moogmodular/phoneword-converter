import { z } from 'zod'
import { useZodForm } from '../utils/useZodForm'
import { RouterOutputs, trpc } from '../utils/trpc'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { ConvertedDisplay } from './ConvertedDisplay'

type ConvertNumberOutput = RouterOutputs['converter']['convertNumber']
export const convertNumberInput = z.object({
    number: z.string(),
    onlyMatches: z.boolean(),
})

interface ConverterFormProps {}

export const ConverterForm = ({}: ConverterFormProps) => {
    const [converterResult, setConverterResult] = useState<ConvertNumberOutput>({ wordList: [] })
    const utils = trpc.useContext()

    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useZodForm({
        schema: convertNumberInput,
        defaultValues: {
            number: '',
            onlyMatches: true,
        },
    })

    useEffect(() => {
        watch((value, { name, type }) => {
            const { number, onlyMatches } = value
            utils.converter.convertNumber
                .fetch({ number: number ?? '', onlyMatches: onlyMatches ?? true })
                .then((res) => {
                    setConverterResult(res)
                })
        })
    }, [watch])

    return (
        <div className={'flex w-2/5 flex-col items-center gap-8'}>
            <div>
                <b className={'mr-4'}>Examples:</b>
                <Button variant={'outlined'} color={'secondary'} onClick={() => setValue('number', '722248')}>
                    RABBIT
                </Button>
                <Button variant={'outlined'} color={'secondary'} onClick={() => setValue('number', '23')}>
                    23
                </Button>
                <Button variant={'outlined'} color={'secondary'} onClick={() => setValue('number', '3569377')}>
                    FLOWERS
                </Button>
            </div>
            <div className={'flex flex-row gap-4'}>
                <TextField
                    fullWidth
                    error={Boolean(errors.number)}
                    helperText={errors.number?.message}
                    id="outlined-number"
                    label="Number"
                    inputProps={{ maxLength: 7 }}
                    type="number"
                    variant="outlined"
                    {...register('number')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                ></TextField>
                <FormControlLabel
                    label="only wordlist matches"
                    className={'w-36 '}
                    control={<Checkbox {...register('onlyMatches')} />}
                />
            </div>
            {converterResult &&
                converterResult.wordList.map((result, index) => {
                    return <ConvertedDisplay key={index} letters={result.letters} matches={result.exactMatches} />
                })}
        </div>
    )
}
