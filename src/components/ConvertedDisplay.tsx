import { Tooltip } from '@mui/material'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'

interface ConvertedDisplayProps {
    letters: string
    matches: string[]
}

export const ConvertedDisplay = ({ letters, matches }: ConvertedDisplayProps) => {
    return (
        <div className={'border-grey-400 flex h-16 w-28 flex-row items-center justify-between rounded border p-4'}>
            <div className={`${matches.length > 0 ? 'font-bold text-amber-800' : 'font-bold'}`}>{letters}</div>
            {matches.length > 0 && (
                <Tooltip title="Matches wordlist">
                    <PlaylistAddCheckIcon />
                </Tooltip>
            )}
        </div>
    )
}
