import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel'
import { Box, Flex, Image } from '@mantine/core'
import { useState } from 'react'
// import Modal from '../Modal/Modal'
import SubmissionLoader from '../SubmissionLoader/SubmissionLoader'
import ReserveButton from './ReserveButton'

function Cottagecard({ cottage, dates }: any) {
    const [modalOpen, setModalOpen] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false)
    const [displayAlert, setdisplayAlert] = useState(false)

    function closeModal() {
        setModalOpen(false)
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

        closeModal()
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
            {isSubmitting ? (
                <SubmissionLoader />
            ) : displayAlert ? (
                isSubmitSuccess ? (
                    <NotifySuccess />
                ) : (
                    <NotifyFail />
                )
            ) : null}
            <Flex
                style={{ marginTop: '2em', border: '1px solid' }}
                h={450}
                gap="sm"
            >
                <Roomcarousel />
                <RoomInformation
                    cottage={cottage}
                    handleReserveCottage={submitReservation}
                    dates={dates}
                />
            </Flex>
        </>
    )
}

export default Cottagecard

function Roomcarousel() {
    // const TRANSITION_DURATION = 10
    // const [opened, setOpened] = useState(false)
    // const [embla, setEmbla] = useState<Embla | null>(null)

    // useAnimationOffsetEffect(embla, TRANSITION_DURATION)

    return (
        <Carousel
            sx={{ width: 500 }}
            withIndicators
            height="100%"
            // slideGap="md"
        >
            <Carousel.Slide
                style={{ backgroundColor: 'lightgray', padding: '.5em' }}
            >
                <Image
                    height={430}
                    src="https://images.unsplash.com/photo-1611043714658-af3e56bc5299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                />
            </Carousel.Slide>
            <Carousel.Slide
                style={{ backgroundColor: 'lightgray', padding: '.5em' }}
            >
                <Image
                    height={430}
                    src="https://images.unsplash.com/photo-1615320367500-bafc931a2ff0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                />
            </Carousel.Slide>
            <Carousel.Slide
                style={{ backgroundColor: 'lightgray', padding: '.5em' }}
            >
                <Image
                    height={430}
                    src="https://images.unsplash.com/photo-1611043714658-af3e56bc5299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                />
            </Carousel.Slide>
        </Carousel>
    )
}

function RoomInformation({ cottage, handleReserveCottage, dates }: any) {
    return (
        <Box
            style={{
                width: '600px',
                paddingInline: '.5em',
                position: 'relative',
            }}
        >
            <h1>{cottage.name}</h1>
            <div className="room-tags">
                {/* • Type: {cottage.type} <br />• Beds: {cottage.bed} <br /> */}
            </div>
            <br />
            <p>{cottage.description}</p>
            <Flex
                justify="space-between"
                align="center"
                style={{
                    paddingInline: '.5em',
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    left: '0',
                    marginBottom: '1em',
                }}
            >
                <Box>
                    <h1>₱ {cottage.price}</h1>
                </Box>
                <Box>
                    <ReserveButton
                        cottage={cottage}
                        handleReserveCottage={handleReserveCottage}
                        dates={dates}
                    />
                </Box>
            </Flex>
        </Box>
    )
}

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
            // onClose={() => close(false)}
        >
            We have sent you an email to confirm your reservation
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
            // onClose={() => close(false)}
        >
            Unfortunately, an error has occured
        </Notification>
    )
}
