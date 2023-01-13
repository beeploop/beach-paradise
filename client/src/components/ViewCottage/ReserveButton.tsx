import { Button, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import NewCottageReservationForm from './NewCottageReservationForm';

function ReserveButton({ cottage, handleReserveCottage, dates }: any) {
    const [opened, setOpened] = useState(false);

    function closeModal() {
        setOpened(false);
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
                <Button
                    size="md"
                    onClick={() => setOpened(true)}
                >
                    Reserve
                </Button>
            </Group>
        </>
    );
}

export default ReserveButton;
