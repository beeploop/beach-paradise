import { Tabs } from '@mantine/core';
import { useEffect, useState } from 'react';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { MdOutlineBedroomChild } from 'react-icons/md';
import ContentHeader from '../../components/ContentHeader';
import CottagesReservations from '../../components/Reservations/CottagesReservations';
import RoomReservations from '../../components/Reservations/RoomReservations';

type TReservation = {
    bookingId: Number;
    roomNumber: Number;
    cottageName: String;
    userId: Number;
    checkin: String;
    checkout: String;
    adults: Number;
    kids: Number;
    price: Number;
    createdAt: String;
};

const ReservationsPage = () => {
    const [roomReservations, setRoomReservations] = useState<TReservation[]>(
        []
    );
    const [cottageReservations, setCottageReservations] = useState<
        TReservation[]
    >([]);
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
        <div className="main">
            <ContentHeader text={'Reservations'} />
            <Tabs
                variant="outline"
                defaultValue="gallery"
                mt="md"
            >
                <Tabs.List>
                    <Tabs.Tab
                        value="gallery"
                        icon={<MdOutlineBedroomChild size={24} />}
                    >
                        Rooms
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="messages"
                        icon={<FaUmbrellaBeach size={24} />}
                    >
                        Cottages
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel
                    value="gallery"
                    pt="xs"
                >
                    <RoomReservations roomReservations={roomReservations} />
                </Tabs.Panel>
                <Tabs.Panel
                    value="messages"
                    pt="xs"
                >
                    <CottagesReservations
                        cottageReservations={cottageReservations}
                    />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default ReservationsPage;
