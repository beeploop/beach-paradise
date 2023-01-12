import { useEffect, useState } from 'react'
import AddCottage from '../../components/AddCottage/AddCottage'
import ContentHeader from '../../components/ContentHeader'
import CottageList from '../../components/CottageList/CottageList'
import SubmissionLoader from '../../components/SubmissionLoader/SubmissionLoader'

type TCottage = {
    cottageId: Number
    name: String
    rate: Number
    desc: String
}

const AdminCottagesPage = () => {
    const [cottages, setCottages] = useState<TCottage[]>([])
    const [notify, setNotify] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [submissionLoading, setSubmissionLoading] = useState(false)

    useEffect(() => {
        fetchCottages()
    }, [])

    async function fetchCottages() {
        setSubmissionLoading(true)
        // const response = await fetch('http://localhost:5000/api/cottage')
        const response = await fetch(
            'https://beach-reservation.onrender.com/api/cottage/all'
        )
        const result = await response.json()
        if (!result) return
        result.map((cottage: TCottage) => {
            setCottages((cur) => [...cur, cottage])
        })
        setSubmissionLoading(false)
    }

    async function handleSubmit(cottageDetails: any) {
        setSubmissionLoading(true)
        const response = await fetch(
            // 'http://localhost:5000/api/admin/cottage/add',
            'https://beach-reservation.onrender.com/api/admin/cottage/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(cottageDetails),
            }
        )
        const cottage = await response.json()
        if (!cottage) {
            setUpdateSuccess(false)
        } else {
            setUpdateSuccess(true)
        }
        setCottages((cur) => [...cur, cottage])
        setSubmissionLoading(false)
        handleNotify(true)
    }

    async function handleModification(modifications: any) {
        setSubmissionLoading(true)
        const response = await fetch(
            // 'http://localhost:5000/api/admin/cottage/edit',
            'https://beach-reservation.onrender.com/api/admin/cottage/edit',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(modifications),
            }
        )
        const editedCottage = await response.json()
        if (!editedCottage) {
            setUpdateSuccess(false)
        } else {
            setUpdateSuccess(true)
        }
        const updatedCottages = cottages.map((cottage) => {
            if (cottage.cottageId === editedCottage.cottageId) {
                console.log('edited cottage: ', editedCottage)
                return editedCottage
            } else {
                console.log('current cottage: ', cottage)
                return cottage
            }
        })
        setCottages(updatedCottages)
        handleNotify(true)
        setSubmissionLoading(false)
        window.scrollTo(0, 0)
    }

    function handleNotify(state: boolean) {
        setNotify(state)
    }

    return (
        <>
            {submissionLoading && <SubmissionLoader />}
            <div className="main">
                <ContentHeader text={'Cottages'} />
                <AddCottage handleSubmit={handleSubmit} />
                {notify ? (
                    updateSuccess ? (
                        <NotififySuccess close={handleNotify} />
                    ) : (
                        <NotifyFail close={handleNotify} />
                    )
                ) : null}
                <CottageList
                    cottages={cottages}
                    handleModification={handleModification}
                    isAdmin={true}
                />
            </div>
        </>
    )
}

export default AdminCottagesPage

import { Notification } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'

function NotififySuccess({ close }: any) {
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
