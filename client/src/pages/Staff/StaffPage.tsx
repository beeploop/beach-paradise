import { Button, Container, Flex, Paper, Tabs } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../components/ContentHeader';
import CottagesReservations from './CottagesReservation';
import RoomsReservation from './RoomsReservation';
import WalkinPage from './WalkinPage';

type TReservation = {
    bookingId: string;
    roomNumber: string;
    cottageName: string;
    userId: string;
    checkin: string;
    checkout: string;
    adults: string;
    kids: string;
    price: string;
    createdAt: string;
};

const ReceptionistPage = () => {
    const navigate = useNavigate();
    const [roomReservations, setRoomReservations] = useState<any[]>([]);
    const [cottageReservations, setCottageReservations] = useState<any[]>([]);
    const { VITE_REACT_APP_BASE_URL } = import.meta.env;

    useEffect(() => {
        fetchReservations();
    }, []);

    function fetchReservations() {
        // fetch('http://localhost:5000/api/admin/reservations')
        fetch(`${VITE_REACT_APP_BASE_URL}/api/admin/reservations`)
            .then((response) => response.json())
            .then((data) => {
                data.rooms.map((reservation: any) => {
                    setRoomReservations((prev) => [...prev, reservation]);
                });
                data.cottages.map((reservation: any) => {
                    setCottageReservations((prev) => [...prev, reservation]);
                });
            });
    }
    return (
        <Container
            size="lg"
            sx={{ width: '100%' }}
        >
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
                    defaultValue="room"
                    variant="outline"
                    my="sm"
                >
                    <Tabs.List>
                        <Tabs.Tab value="room">Room</Tabs.Tab>
                        <Tabs.Tab value="cottage">Cottage</Tabs.Tab>
                        <Tabs.Tab value="walkin">Walk-in</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel
                        value="room"
                        pt="xs"
                    >
                        <RoomsReservation data={roomReservations} />
                    </Tabs.Panel>

                    <Tabs.Panel
                        value="cottage"
                        pt="xs"
                    >
                        <CottagesReservations data={cottageReservations} />
                    </Tabs.Panel>
                    <Tabs.Panel
                        value="walkin"
                        pt="xs"
                    >
                        <WalkinPage />
                    </Tabs.Panel>
                </Tabs>
            </Paper>
        </Container>
    );
};

export default ReceptionistPage;
