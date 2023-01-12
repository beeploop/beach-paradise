import { useState } from 'react'
import { Modal, Button, Group } from '@mantine/core'
// import EditCottageForm from './EditCottageForm'
import NewEditRoomForm from './NewEditRoomForm'

function NewEditRoom({ room, handleModification }: any) {
    const [opened, setOpened] = useState(false)

    function closeOnSubmit() {
        setOpened(false)
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={`Edit Room ${room.roomNumber}`}
            >
                <NewEditRoomForm
                    room={room}
                    handleModification={handleModification}
                    closeModal={closeOnSubmit}
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

export default NewEditRoom
