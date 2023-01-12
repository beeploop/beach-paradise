import {
    Box,
    Button,
    Flex,
    NumberInput,
    Space,
    Textarea,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'

function EditRoomForm({ cottage, handleModification, closeModal }: any) {
    const form = useForm({
        initialValues: {
            id: cottage.cottageId,
            name: cottage.name,
            rate: cottage.price,
            desc: cottage.description,
        },

        validate: {
            name: (value) =>
                value.length < 2 ? 'Name must be at least 2 characters' : null,
            rate: (value) => (value < 0 ? 'Rate must be at least 0' : null),
            desc: (value) =>
                value.length > 147 ? 'Description too long' : null,
        },
    })

    return (
        <form
            onSubmit={form.onSubmit(() => {
                handleModification({
                    id: form.getInputProps('id').value,
                    name: form.getInputProps('name').value,
                    rate: form.getInputProps('rate').value,
                    desc: form.getInputProps('desc').value,
                })
                closeModal()
            })}
        >
            <TextInput
                label="Name"
                value={form.getInputProps('name').value}
                {...form.getInputProps('name')}
            />
            <Space h="md" />
            <NumberInput
                label="Rate"
                value={form.getInputProps('rate')}
                {...form.getInputProps('rate')}
            />
            <Space h="md" />
            <Textarea
                label="Description"
                value={form.getInputProps('desc').value}
                {...form.getInputProps('desc')}
                minRows={6}
            />
            <Flex justify="flex-end" mt="sm">
                <Button type="submit">Apply</Button>
            </Flex>
        </form>
    )
}

export default EditRoomForm
