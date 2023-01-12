import { useState } from 'react'
import { Modal, Button, Group, Box } from '@mantine/core'
import CottageForm from './CottageForm'
import NewCottageReservationForm from './NewCottageReservationForm'

function ReserveButton({ cottage, handleReserveCottage, dates }: any) {
    const [opened, setOpened] = useState(false)

    function closeModal() {
        setOpened(false)
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Reserve Cottage"
                size="lg"
            >
                <NewCottageReservationForm
                    cottage={cottage}
                    handleReserveCottage={handleReserveCottage}
                    closeModal={closeModal}
                    dates={dates}
                />
            </Modal>

            <Group position="center">
                <Button size="md" onClick={() => setOpened(true)}>
                    Reserve
                </Button>
            </Group>
        </>
    )
}

export default ReserveButton
