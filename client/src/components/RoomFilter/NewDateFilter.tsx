import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { useState } from 'react';

function NewDateFilter() {
    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(),
        new Date(),
    ]);

    return (
        <DateRangePicker
            placeholder="Pick dates range"
            value={value}
            onChange={(e) => {
                setValue(e);
            }}
        />
    );
}

export default NewDateFilter;
