import {
    TextInput,
    Textarea,
    NumberInput,
    Space,
    Button,
    Group,
} from '@mantine/core'
import { useForm } from '@mantine/form'

function CottageForm({ handleSubmit, closeModal }: any) {
    const form = useForm({
        initialValues: {
            name: '',
            rate: 300,
            description: '',
        },

        validate: {
            rate: (value) =>
                value === undefined
                    ? 'Dont leave field blank'
                    : value < 0
                    ? 'Rate must be at least 0'
                    : null,
            description: (value) =>
                value.length > 150 ? 'Description too long' : null,
        },
    })

    return (
        <form
            onSubmit={form.onSubmit(() => {
                handleSubmit({
                    name: form.getInputProps('name').value,
                    rate: form.getInputProps('rate').value,
                    desc: form.getInputProps('description').value,
                })
                closeModal()
            })}
        >
            <TextInput
                withAsterisk
                label="Name"
                {...form.getInputProps('name')}
            />
            <Space h="md" />
            <NumberInput
                defaultValue={form.getInputProps('rate').value}
                {...form.getInputProps('rate')}
            />
            <Space h="md" />
            <Textarea
                label="Short Description"
                placeholder="Short description of cottage"
                {...form.getInputProps('description')}
                minRows={6}
            />
            <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
        // <Box sx={{ maxWidth: 300 }} mx="auto">
        // </Box>
    )
}

export default CottageForm
