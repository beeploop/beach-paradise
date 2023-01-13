import { Button, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import EditCottageForm from './EditCottageForm';

function EditCottage({ cottage, handleModification }: any) {
    const [opened, setOpened] = useState(false);

    function closeOnSubmit() {
        setOpened(false);
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={`Edit ${cottage.name}`}
            >
                <EditCottageForm
                    closeModal={closeOnSubmit}
                    cottage={cottage}
                    handleModification={handleModification}
                />
            </Modal>

            <Group position="center">
                <Button
                    size="md"
                    onClick={() => setOpened(true)}
                >
                    Modify
                </Button>
            </Group>
        </>
    );
}

export default EditCottage;
