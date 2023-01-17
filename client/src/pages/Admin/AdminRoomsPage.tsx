import { useEffect, useState } from 'react';
import UtilBar from '../../components/AdminUtilBar/UtilBar';
import ContentHeader from '../../components/ContentHeader';
import RoomList from '../../components/RoomList/RoomList';
import SubmissionLoader from '../../components/SubmissionLoader/SubmissionLoader';

const AdminRoomsPage = () => {
    const [rooms, setRooms] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [isPostSuccess, setIsPostSuccess] = useState(false);
    const [displayAlert, setDisplayAlert] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const { VITE_REACT_APP_BASE_URL } = import.meta.env;

    useEffect(() => {
        setIsLoading(true);
        // fetch(`http://localhost:5000/api/rooms/all/${filter}`)
        fetch(`${VITE_REACT_APP_BASE_URL}/api/rooms/all/${filter}`)
            .then((response) => response.json())
            .then((data) => {
                data.map((room: any) => setRooms((prev) => [...prev, room]));
            });
        setIsLoading(false);
    }, []);

    // TODO: dd functionality to send request to server to modify room
    async function modifyRoom(modifications: any) {
        setSubmissionLoading(true);
        const response = await fetch(
            `${VITE_REACT_APP_BASE_URL}/api/admin/room/edit`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(modifications),
            }
        );
        const edittedRoom = response.json();
        if (!edittedRoom) {
            setUpdateSuccess(false);
        } else {
            setUpdateSuccess(true);
        }
        const updatedRooms = rooms.map((room) => {
            if (room.roomNumber === edittedRoom.roomNumber) {
                return edittedRoom;
            } else {
                return room;
            }
        });
        setRooms(updatedRooms);
        setSubmissionLoading(false);
        handleNotify(true);
    }

    function handleAddRoomModal() {
        setIsAddOpen((curr) => (curr = !curr));
    }

    function closeModal(e: any) {
        if (e.target.classList.contains('btn-cancel')) {
            setIsAddOpen(false);
            setIsEditOpen(false);
        }
    }

    function closeAlert() {
        setDisplayAlert(false);
    }

    function filterRooms(filter: string) {
        setFilter(filter);
    }

    async function submitRoom(details: any) {
        setSubmissionLoading(true);

        const response = await fetch(
            `${VITE_REACT_APP_BASE_URL}/api/admin/room/add`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(details),
            }
        );
        const status = await response.json();

        setSubmissionLoading(false);
        handleAddRoomModal();

        if (status.status === 'fail') {
            setUpdateSuccess(false);
        } else {
            setUpdateSuccess(true);
        }

        setRooms((prev) => [
            ...prev,
            {
                roomNumber: status.roomNumber,
                type: details.type,
                bed: details.bed,
                description: details.shortDesc,
                status: details.status,
                price: details.rate,
            },
        ]);
        handleNotify(true);
    }

    function handleNotify(state: boolean) {
        setDisplayAlert(state);
    }

    function testPost(room: any) {
        console.log(room);
    }

    return (
        <>
            {submissionLoading && <SubmissionLoader />}
            <div className="main">
                <ContentHeader text={'Rooms'} />
                <UtilBar
                    currentFilter={filter}
                    setFilter={filterRooms}
                    handleSubmit={submitRoom}
                />
                {displayAlert ? (
                    updateSuccess ? (
                        <NotifySuccess close={handleNotify} />
                    ) : (
                        <NotifyFail close={handleNotify} />
                    )
                ) : null}
                <RoomList
                    isLoading={isLoading}
                    roomsData={rooms}
                    isAdmin={true}
                    handleModification={modifyRoom}
                    reserveRoom={undefined}
                />
            </div>
        </>
    );
};

export default AdminRoomsPage;

import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

function NotifySuccess({ close }: any) {
    return (
        <Notification
            title="Operation Success"
            icon={<IconCheck size={18} />}
            color="teal"
            mt="sm"
            mb="sm"
            onClose={() => close(false)}
        >
            Operation is successful
        </Notification>
    );
}

function NotifyFail({ close }: any) {
    return (
        <Notification
            title="Operation Fail"
            icon={<IconX size={18} />}
            color="red"
            mt="sm"
            mb="sm"
            onClose={() => close(false)}
        >
            Unfortunately, operation failed
        </Notification>
    );
}
