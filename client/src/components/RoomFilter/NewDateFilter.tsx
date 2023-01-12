import { useEffect, useState } from 'react'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'

function NewDateFilter() {
    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(),
        new Date(),
    ])

    return (
        <DateRangePicker
            placeholder="Pick dates range"
            value={value}
            onChange={(e) => {
                setValue(e)
            }}
        />
    )
}

export default NewDateFilter
