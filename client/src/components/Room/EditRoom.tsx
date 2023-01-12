import { useState } from 'react'
import { Modal, Button, Group } from '@mantine/core'
import EditRoomForm from './EditRoomForm'

function EditRoom() {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Introduce yourself!"
            >
                <EditRoomForm
                    cottage={undefined}
                    handleModification={undefined}
                    closeModal={undefined}
                />
            </Modal>

            <Group position="center">
                <Button size="md" onClick={() => setOpened(true)}>
                    Modify
                </Button>
            </Group>
        </>
    )
}

export default EditRoom
