import { Box, Flex, LoadingOverlay } from '@mantine/core'
import { useEffect, useState } from 'react'
import Header from './Header'
import { MonthlyGoal } from './MonthlyGoal'
import { StatsGrid } from './StatsGrid'
import { StatsRing } from './StatsRing'

type TData = {
    cottageReservations: number
    roomReservations: number
    users: number
    cottageIncome: { _sum: { price: number } }
    roomIncome: { _sum: { price: number } }
    totalRooms: number
    totalCottages: number
    pendingRoom: number
    pendingCottage: number
}

function DashboardLayout() {
    const [data, setData] = useState<TData>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchReservations()
    }, [])

    function fetchReservations() {
        setIsLoading(true)
        // fetch('http://localhost:5000/api/admin/stats')
        fetch('https://beach-reservation.onrender.com/api/admin/stats')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                console.log(data)
                setIsLoading(false)
            })
    }

    function computeIncome() {
        return data?.cottageIncome._sum.price + data?.roomIncome._sum.price
    }

    function computeReservation() {
        return data?.roomReservations + data?.cottageReservations
    }

    function computeProgress(whole: number, part: number) {
        if (part < 1) return 0
        return whole / part
    }

    function computePending() {
        return data?.pendingCottage + data?.pendingRoom
    }

    return (
        <div>
            <Flex gap="xl" mt="sm">
                <LoadingOverlay
                    visible={isLoading}
                    loaderProps={{ variant: 'dots' }}
                />
                <Box style={{ flex: '1' }}>
                    <StatsGrid
                        data={[
                            {
                                title: 'Users',
                                icon: 'user',
                                value: data?.users.toString(),
                                diff: 0,
                            },
                            {
                                title: 'Reservations',
                                icon: 'receipt',
                                value: computeReservation().toString(),
                                diff: 0,
                            },
                            {
                                title: 'Pending Bookings',
                                icon: 'user',
                                value: computePending().toString(),
                                diff: 0,
                            },
                        ]}
                    />
                    <StatsRing
                        data={[
                            {
                                label: 'Rooms Reserved',
                                stats: data?.roomReservations.toString(),
                                progress: computeProgress(
                                    data?.totalRooms,
                                    data?.roomReservations
                                ),
                                color: 'teal',
                                icon: 'up',
                            },
                            {
                                label: 'Cottages Reserved',
                                stats: data?.cottageReservations.toString(),
                                progress: computeProgress(
                                    data?.totalCottages,
                                    data?.cottageReservations
                                ),
                                color: 'teal',
                                icon: 'up',
                            },
                        ]}
                    />
                </Box>
                <Header />
            </Flex>
            <Flex py="md">
                <MonthlyGoal income={computeIncome()} />
            </Flex>
        </div>
    )
}

export default DashboardLayout
