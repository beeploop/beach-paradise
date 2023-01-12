import {
    NumberInput,
    Textarea,
    Button,
    NativeSelect,
    Flex,
} from '@mantine/core'
import { useForm } from '@mantine/form'

function NewEditRoomForm({ room, handleModification, closeModal }: any) {
    const form = useForm({
        initialValues: {
            roomNumber: room.roomNumber,
            type: room.type,
            bed: room.bed,
            status: room.status,
            rate: room.price,
            desc: room.description,
        },

        // functions will be used to validate values at corresponding key
        validate: {
            bed: (value) =>
                value < 1 ? 'There should be at least 1 bed' : null,
            rate: (value) => (value < 0 ? 'Rate should not be negative' : null),
        },
    })

    return (
        <form
            onSubmit={form.onSubmit((values) => {
                handleModification(values)
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
                {...form.getInputProps('desc')}
            />
            <Flex justify="end">
                <Button type="submit" mt="md">
                    Apply
                </Button>
            </Flex>
        </form>
    )
}

export default NewEditRoomForm
