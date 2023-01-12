import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContentHeader from '../../components/ContentHeader'
import RoomFilter from '../../components/RoomFilter/RoomFilter'
import RoomList from '../../components/RoomList/RoomList'
import SubmissionLoader from '../../components/SubmissionLoader/SubmissionLoader'

const RoomsPage = () => {
    const [rooms, setRooms] = useState<any[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [displayAlert, setDisplayAlert] = useState(false)
    const [success, setSuccess] = useState(false)
    const [dates, setDates] = useState([])

    useEffect(() => {
        filterRooms(currentDate(), currentDate(), 'all')
    }, [])

    function currentDate() {
        return new Date()
    }

    async function reserveRoom(details: any) {
        setIsSubmitting(true)

        // const response = await fetch('http://localhost:5000/api/reserve/room', {
        const response = await fetch(
            'https://beach-reservation.onrender.com/api/reserve/room',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(details),
            }
        )

        const status = await response.json()
        if (!status) {
            setSuccess(false)
        } else {
            setSuccess(true)
        }
        setDisplayAlert(true)
        setIsSubmitting(false)
    }

    // Filters out rooms
    async function filterRooms(checkin: any, checkout: any, type: any) {
        setDates([checkin, checkout])
        const checkinDate = checkin.toLocaleDateString('en-CA')
        const checkoutDate = checkout.toLocaleDateString('en-CA')
        setIsLoading(true)

        const response = await fetch(
            // `http://localhost:5000/api/rooms/filter?type=${type}&checkin=${checkin}&checkout=${checkout}`
            `https://beach-reservation.onrender.com/api/rooms/filter?type=${type}&checkin=${checkinDate}&checkout=${checkoutDate}`
        )
        const data = await response.json()

        setIsLoading(false)

        // Remove current rooms from state
        setRooms([])

        if (!data) return

        // Set new rooms to state
        data.map((room: any) => {
            setRooms((prev) => [...prev, room])
        })
    }

    function handleNotify(state: boolean) {
        setDisplayAlert(state)
    }

    return (
        <>
            {isSubmitting && <SubmissionLoader />}

            <div className="main">
                <ContentHeader text={'Rooms'} />
                <RoomFilter handleFilter={filterRooms} />
                {displayAlert ? (
                    success ? (
                        <NotifySuccess close={handleNotify} />
                    ) : (
                        <NotifyFail close={handleNotify} />
                    )
                ) : null}
                <RoomList
                    roomsData={rooms}
                    handleReserveRoom={reserveRoom}
                    isLoading={isLoading}
                    dates={dates}
                />
                <Outlet />
            </div>
        </>
    )
}

export default RoomsPage

import { Notification } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

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
    )
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
    )
}
