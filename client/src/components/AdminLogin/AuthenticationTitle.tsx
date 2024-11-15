import {
    Anchor,
    Button,
    Container,
    Group,
    LoadingOverlay,
    Paper,
    PasswordInput,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoginAlert from './LoginAlert';

interface TPropFunction {
    setAuth: Function;
}

export function AuthenticationTitle({ setAuth }: TPropFunction) {
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { VITE_REACT_APP_BASE_URL } = import.meta.env;
    const { setToken } = useAuth();

    const form = useForm({
        initialValues: { email: '', password: '' },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            password: (value) =>
                value.length <= 0 ? 'Please input password' : null,
        },
    });

    const navigate = useNavigate();

    const validateCredentials = async () => {
        setIsSubmitting(true);
        const response = await fetch(
            // 'http://localhost:5000/api/admin/authenticate',
            `${VITE_REACT_APP_BASE_URL}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: form.getInputProps('email').value,
                    password: form.getInputProps('password').value,
                }),
            }
        );
        // const { result } = await response.json();
        const data = await response.json();
        setIsSubmitting(false);
        if (!data.token) return setError(true);
        // setAuth(result);
        setToken(data);
        // navigate('/admin/dashboard');
    };

    return (
        <Container
            size={420}
            my={40}
        >
            <LoadingOverlay
                visible={isSubmitting}
                // overlayBlur={1}
                overlayColor="lightgray"
                loaderProps={{ variant: 'dots' }}
            />
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                })}
            >
                Welcome Admin!
            </Title>

            {error ? <LoginAlert /> : null}

            <Paper
                withBorder
                shadow="md"
                p="lg"
                mt={10}
                radius="md"
                sx={{ width: '20em' }}
            >
                <form onSubmit={form.onSubmit(validateCredentials)}>
                    <TextInput
                        label="Email"
                        placeholder="you@mantine.dev"
                        onInput={() => setError(false)}
                        {...form.getInputProps('email')}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        {...form.getInputProps('password')}
                        required
                        mt="md"
                    />
                    <Group
                        position="apart"
                        mt="lg"
                    >
                        {/* <Checkbox label="Remember me" sx={{ lineHeight: 1 }} /> */}
                        <Anchor<'a'>
                            onClick={(event) => event.preventDefault()}
                            href="#"
                            size="sm"
                        >
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button
                        type="submit"
                        fullWidth
                        mt="xl"
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
