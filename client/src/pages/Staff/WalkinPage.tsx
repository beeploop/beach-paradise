import {
    Button,
    Flex,
    NumberInput,
    Paper,
    Text,
    TextInput,
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';

export default function WalkinPage() {
    const form = useForm({
        initialValues: {
            roomNumber: '',
            firstname: '',
            lastname: '',
            street: '',
            city: '',
            state: '',
            postal: '',
            phone: '',
            email: '',
            adults: 1,
            kids: 0,
            rate: '',
        },

        // functions will be used to validate values at corresponding key
        validate: {
            firstname: (value) =>
                value.length < 2 ? 'Dont leave this blank' : null,
            lastname: (value) =>
                value.length < 2 ? 'Dont leave this blank' : null,
            street: (value) =>
                value.length < 2 ? 'Dont leave this blank' : null,
            city: (value) =>
                value.length < 2 ? 'Dont leave this blank' : null,
            state: (value) =>
                value.length < 2 ? 'Dont leave this blank' : null,
            postal: (value) =>
                value.length < 4 ? 'Provide a valid postal code' : null,
            phone: (value) =>
                value.length < 11 ? 'Provide a valid phone' : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            adults: (value) =>
                value < 1 ? 'There should be at least 1 adult' : null,
            kids: (value) => (value < 0 ? 'Value cannot be negative' : null),
        },
    });

    return (
        <form
            onSubmit={form.onSubmit((values) => {
                console.log(values);
            })}
        >
            <Flex
                justify="center"
                mb="md"
            >
                <Text
                    fz="xl"
                    fw="bold"
                >
                    Book
                </Text>
            </Flex>
            <Text fz="xl">Fullname</Text>

            <Flex
                justify="center"
                gap="md"
                mb="sm"
            >
                <TextInput
                    label="First Name"
                    placeholder="First Name"
                    sx={{ flex: 1 }}
                    {...form.getInputProps('firstname')}
                />
                <TextInput
                    label="Last Name"
                    placeholder="Last Name"
                    sx={{ flex: 1 }}
                    {...form.getInputProps('lastname')}
                />
            </Flex>

            <Text fz="xl">Address</Text>

            <Flex
                justify="center"
                mb="md"
            >
                <TextInput
                    label="Street/House No."
                    placeholder="street"
                    sx={{ flex: 1 }}
                    {...form.getInputProps('street')}
                />
            </Flex>
            <Flex
                justify="center"
                gap="md"
                mb="md"
            >
                <TextInput
                    label="City"
                    placeholder="city"
                    sx={{ flex: 1 }}
                    {...form.getInputProps('city')}
                />
                <TextInput
                    label="State/Province"
                    placeholder="state"
                    sx={{ flex: 1 }}
                    {...form.getInputProps('state')}
                />
            </Flex>
            <Flex
                justify="center"
                mb="md"
            >
                <TextInput
                    label="Postal Code"
                    placeholder="postal"
                    sx={{ flex: 1 }}
                    {...form.getInputProps('postal')}
                />
            </Flex>

            <Text fz="xl">Contact</Text>

            <Flex
                justify="center"
                gap="md"
                mb="md"
            >
                <TextInput
                    label="Phone"
                    placeholder="09xxxxxxxxx"
                    sx={{ flex: 1 }}
                    {...form.getInputProps('phone')}
                />
                <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    sx={{ flex: 1 }}
                    {...form.getInputProps('email')}
                />
            </Flex>
            <Flex mb="md">
                <DateRangePicker
                    clearable={false}
                    // disabled
                    sx={{ flex: 1 }}
                    label="Checkin & Checkout Date"
                    placeholder="Pick dates range"
                    // value={date}
                />
            </Flex>

            <Flex
                mb="md"
                gap="md"
            >
                <NumberInput
                    sx={{ flex: 1 }}
                    label="Number of Adults"
                    {...form.getInputProps('adults')}
                />
                <NumberInput
                    sx={{ flex: 1 }}
                    label="Number of Kids"
                    {...form.getInputProps('kids')}
                />
            </Flex>

            <Flex mb="md">
                <Text fz="xl">Room Rate: ₱</Text>
            </Flex>

            <Flex justify="end">
                <Button
                    type="submit"
                    mt="sm"
                >
                    Submit
                </Button>
            </Flex>
        </form>
    );
}
