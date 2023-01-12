import {
    NumberInput,
    Textarea,
    Button,
    NativeSelect,
    Flex,
} from '@mantine/core'
import { useForm } from '@mantine/form'

function NewAddRoomForm({ handleSubmit, closeModal }: any) {
    const form = useForm({
        initialValues: {
            type: 'suite',
            bed: 1,
            status: 'operational',
            rate: 0,
            desc: '',
        },

        // functions will be used to validate values at corresponding key
        validate: {
            bed: (value) =>
                value < 1 ? 'There should be at least 1 bed' : null,
            rate: (value) => (value < 0 ? 'Rate should not be negative' : null),
            desc: (value) =>
                value.length < 10
                    ? 'Please provide a description'
                    : value.length > 150
                    ? 'Description too long'
                    : null,
        },
    })

    return (
        <form
            onSubmit={form.onSubmit((values) => {
                handleSubmit(values)
                closeModal()
            })}
        >
            <Flex justify="center" gap="md" mt="md">
                <NativeSelect
                    sx={{ flex: 1 }}
                    label="Room Type"
                    data={['deluxe', 'suite']}
                    {...form.getInputProps('type')}
                />
                <NativeSelect
                    sx={{ flex: 1 }}
                    label="Room Status"
                    data={['operational', 'unoperational']}
                    {...form.getInputProps('status')}
                />
            </Flex>
            <Flex justify="center" gap="md" mt="md">
                <NumberInput
                    sx={{ flex: 1 }}
                    label="Number of beds"
                    placeholder="Beds"
                    {...form.getInputProps('bed')}
                />
                <NumberInput
                    sx={{ flex: 1 }}
                    label="Rate"
                    placeholder="rate"
                    {...form.getInputProps('rate')}
                />
            </Flex>
            <Textarea
                placeholder="short description"
                label="Short Description"
                mt="md"
                withAsterisk
                {...form.getInputProps('desc')}
            />
            <Flex justify="end">
                <Button type="submit" mt="md">
                    Add Room
                </Button>
            </Flex>
        </form>
    )
}

export default NewAddRoomForm
