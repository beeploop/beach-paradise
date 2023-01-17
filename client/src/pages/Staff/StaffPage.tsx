import { Button, Container, Flex, Paper, Tabs } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import { TableSort } from '../../components/TableSort';

const ReceptionistPage = () => {
    const navigate = useNavigate();
    return (
        <Container sx={{ width: '100%', borderInline: '1px solid' }}>
            <ContentHeader text={'Receptionist'} />
            <Flex
                justify="end"
                my="sm"
            >
                <Button
                    onClick={() => {
                        sessionStorage.clear();
                        navigate('/');
                    }}
                >
                    Logout
                </Button>
            </Flex>
            <Paper>
                <Tabs
                    defaultValue="checkin"
                    variant="outline"
                    my="sm"
                >
                    <Tabs.List>
                        <Tabs.Tab value="checkin">Check in</Tabs.Tab>
                        <Tabs.Tab value="checkout">Check out</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel
                        value="checkin"
                        pt="xs"
                    >
                        <TableSort
                            data={[
                                {
                                    name: 'john doe',
                                    email: 'johndoe@gmail.com',
                                    company: 'none',
                                },
                                {
                                    name: 'marcus tee',
                                    email: 'marcustee@gmail.com',
                                    company: 'none',
                                },
                                {
                                    name: 'alexander digret',
                                    email: 'alexdig@gmail.com',
                                    company: 'none',
                                },
                            ]}
                        />
                    </Tabs.Panel>

                    <Tabs.Panel
                        value="checkout"
                        pt="xs"
                    >
                        Messages tab content
                    </Tabs.Panel>
                </Tabs>
            </Paper>
        </Container>
    );
};

export default ReceptionistPage;
