import { Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'

function LoginAlert() {
    return (
        <Alert
            icon={<IconAlertCircle size={16} />}
            title="Warning!"
            color="red"
            radius="md"
            mt={20}
        >
            The credentials you provided are incorrect.
        </Alert>
    )
}

export default LoginAlert
