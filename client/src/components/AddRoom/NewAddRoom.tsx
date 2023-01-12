import { useState } from 'react'
import { Modal, Button, Group } from '@mantine/core'
import NewAddRoomForm from './NewAddRoomForm'

function NewAddRoom({ handleSubmit }: any) {
    const [opened, setOpened] = useState(false)

    function closeModal() {
        setOpened(false)
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add Room"
            >
                <NewAddRoomForm
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            </Modal>

            <Group position="center">
                <Button
                    variant="outline"
                    radius="xl"
                    onClick={() => setOpened(true)}
                >
                    Add Room
                </Button>
            </Group>
        </>
    )
}

export default NewAddRoom
