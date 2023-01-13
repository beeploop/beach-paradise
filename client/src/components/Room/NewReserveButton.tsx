import { Button, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import NewRoomReservationForm from '../Reservations/NewRoomReservationForm';

function NewReserveButton({ room, dates, handleReserveRoom }: any) {
    const [opened, setOpened] = useState(false);

    function closeModal() {
        setOpened(false);
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Reserve Room"
                size="lg"
            >
                <NewRoomReservationForm
                    room={room}
                    dates={dates}
                    handleReserveRoom={handleReserveRoom}
                    closeModal={closeModal}
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

export default NewReserveButton;
