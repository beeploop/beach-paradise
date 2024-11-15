import { Button, Flex } from '@mantine/core';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { useState } from 'react';

function CottageFilter({ handleFilter }: any) {
    const [dates, setDates] = useState<DateRangePickerValue>([
        new Date(),
        new Date(),
    ]);

    return (
        <Flex
            justify="end"
            gap="md"
            mt="md"
        >
            <DateRangePicker
                placeholder="Pick dates range"
                minDate={new Date()}
                value={dates}
                onChange={setDates}
            />
            <Button
                onClick={() => {
                    handleFilter(dates[0], dates[1]);
                }}
            >
                Filter
            </Button>
        </Flex>
    );
}

export default CottageFilter;
