import { useState } from 'react'
import { Modal, Button, Group, Box } from '@mantine/core'
import ReservationForm from '../ReservationForm/ReservationForm'

function ReserveButton({ room, handleSubmit }: any) {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} size={800}>
                <Box>
                    <ReservationForm
                        closeModal={() => setOpened(false)}
                        roomNumber={room.roomNumber}
                        state={undefined}
                        handleSubmit={handleSubmit}
                    />
                </Box>
            </Modal>

            <Group position="center">
                <Button size="md" onClick={() => setOpened(true)}>
                    Reserve Room
                </Button>
            </Group>
        </>
    )
}

export default ReserveButton
