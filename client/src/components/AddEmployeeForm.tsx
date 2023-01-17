import {
    Button,
    Flex,
    LoadingOverlay,
    PasswordInput,
    Select,
    SimpleGrid,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useEmployee from '../hooks/useEmployee';

export default function AddEmployeeForm() {
    const { loading, setEmployees } = useEmployee();

    const roles = ['admin', 'staff', 'user'];
    const form = useForm({
        initialValues: {
            name: '',
            role: '',
            email: '',
            phone: '',
            password: '',
        },
        validate: {
            name: (value) =>
                value.length > 4 ? null : 'name must be at least 4 characters',
            role: (value) =>
                value.length < 1 || undefined ? 'assign a role' : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'input a proper email',
            phone: (value) =>
                value.length !== 11 ? 'input a proper phone number' : null,
            password: (value) =>
                value.length > 8
                    ? null
                    : 'password must be at least 8 characters long',
        },
    });

    return (
        <form
            onSubmit={form.onSubmit((values) => {
                setEmployees(values);
            })}
        >
            <LoadingOverlay visible={loading} />
            <SimpleGrid
                cols={2}
                mt="xl"
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
            >
                <TextInput
                    label="Name"
                    placeholder="Firstname Lastname"
                    {...form.getInputProps('name')}
                />
                <Select
                    data={roles}
                    label="Role"
                    required
                    {...form.getInputProps('role')}
                />
            </SimpleGrid>
            <TextInput
                label="Email"
                placeholder="juandelacruz@gmail.com"
                {...form.getInputProps('email')}
            />
            <TextInput
                label="Phone"
                placeholder="09xxxxxxxxx"
                {...form.getInputProps('phone')}
            />
            <PasswordInput
                label="Password"
                {...form.getInputProps('password')}
            />
            <Flex
                justify="end"
                my="md"
            >
                <Button type="submit">Add</Button>
            </Flex>
        </form>
    );
}
