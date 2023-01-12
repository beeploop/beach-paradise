import { Button, Flex, NativeSelect } from '@mantine/core'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'
import { useState } from 'react'

const RoomFilter = ({ handleFilter }: any) => {
    const [type, setType] = useState('all')
    const [date, setDate] = useState<DateRangePickerValue>([
        new Date(),
        new Date(),
    ])

    return (
        <Flex justify="end" mt="sm" mb="sm" gap="sm">
            <DateRangePicker
                placeholder="Pick dates range"
                value={date}
                minDate={new Date()}
                onChange={(e) => {
                    setDate(e)
                }}
            />
            <NativeSelect
                data={['all', 'deluxe', 'suite']}
                onChange={(e) => setType(e.currentTarget.value)}
            />
            <Button
                onClick={() => {
                    handleFilter(date[0], date[1], type)
                }}
            >
                Filter
            </Button>
        </Flex>
    )
}

export default RoomFilter
