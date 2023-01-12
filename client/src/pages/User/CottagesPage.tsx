import { Notification, Box } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { useEffect, useState } from 'react'
import UtilBar from '../../components/AdminUtilBar/UtilBar'
import ContentHeader from '../../components/ContentHeader'
import CottageFilter from '../../components/CottageFilter/CottageFilter'
import CottageList from '../../components/CottageList/CottageList'
import RoomFilter from '../../components/RoomFilter/RoomFilter'
import SubmissionLoader from '../../components/SubmissionLoader/SubmissionLoader'

type TCottage = {
    cottageId: Number
    name: String
    rate: Number
    desc: String
}

const Cottages = () => {
    const [cottages, setCottages] = useState<TCottage[]>([])
    const [modalOpen, setModalOpen] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false)
    const [displayAlert, setdisplayAlert] = useState(false)
    const [dates, setDates] = useState([])

    useEffect(() => {
        fetchCottages(currentDate(), currentDate())
    }, [])

    function currentDate() {
        return new Date()
    }

    async function fetchCottages(checkin: any, checkout: any) {
        setDates([checkin, checkout])
        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)
        // const response = await fetch('http://localhost:5000/api/cottage')
        const response = await fetch(
            `https://beach-reservation.onrender.com/api/cottage/filter?checkin=${checkinDate}&checkout=${checkoutDate}`
        )
        const cottages = await response.json()
        if (!cottages) return
        setCottages([])
        cottages.map((cottage: TCottage) => {
            setCottages((prev) => [...prev, cottage])
        })
    }

    async function submitReservation(details: any) {
        console.log(details)
        setIsSubmitting(true)

        const response = await fetch(
            // 'http://localhost:5000/api/reserve/cottage',
            'https://beach-reservation.onrender.com/api/reserve/cottage',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(details),
            }
        )

        const status = await response.json()

        setIsSubmitting(false)

        if (status.status === 'fail') {
            setisSubmitSuccess(false)
        } else {
            setisSubmitSuccess(true)
        }

        setdisplayAlert(true)
    }

    return (
        <>
            {isSubmitting ? <SubmissionLoader /> : null}
            <div className="main">
                <ContentHeader text={'Cottages'} />
                <CottageFilter handleFilter={fetchCottages} />
                {displayAlert ? (
                    isSubmitSuccess ? (
                        <NotifySuccess />
                    ) : (
                        <NotifyFail />
                    )
                ) : null}
                <Box mt="md">
                    <CottageList
                        cottages={cottages}
                        isAdmin={false}
                        handleReserveCottage={submitReservation}
                        dates={dates}
                    />
                </Box>
            </div>
        </>
    )
}

export default Cottages

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
