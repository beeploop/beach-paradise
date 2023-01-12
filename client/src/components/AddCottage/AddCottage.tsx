import { useState } from 'react'
import { Modal, Button, Group, Flex } from '@mantine/core'
import CottageForm from './CottageForm'

interface TPropFunction {
    handleSubmit: Function
}

function AddCottage({ handleSubmit }: TPropFunction) {
    const [opened, setOpened] = useState(false)

    function closeModal() {
        setOpened(false)
    }

    return (
        <Flex align="center" justify="flex-end" mt="xs" mb="lg">
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add Cottage"
            >
                <CottageForm
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
                    Add Cottage
                </Button>
            </Group>
        </Flex>
    )
}

export default AddCottage
