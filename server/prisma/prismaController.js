require('dotenv').config()
const { computePrice, validateAdultsAndKids } = require('../utils/helper')
const { sendVerification, sendConfirmation } = require('../utils/mailer')
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

let db = {}

db.filterByStatus = async (filter) => {
    if (filter === 'all') {
        const rooms = await prisma.room.findMany({
            orderBy: {
                roomNumber: 'asc',
            },
        })
        return rooms
    } else {
        const rooms = await prisma.room.findMany({
            where: {
                status: filter,
            },
            orderBy: {
                roomNumber: 'asc',
            },
        })
        return rooms
    }
}

db.filterByDateAndType = async ({ checkin, checkout, type }) => {
    const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)
    if (type === 'all') {
        const rooms = await prisma.room.findMany({
            where: {
                status: 'operational',
                NOT: {
                    Booking: {
                        some: {
                            checkout: { gte: checkinDate },
                            checkin: { lte: checkoutDate },
                        },
                    },
                },
            },
        })
        return rooms
    } else {
        const rooms = await prisma.room.findMany({
            where: {
                status: 'operational',
                type: type,
                NOT: {
                    Booking: {
                        some: {
                            checkout: { gte: checkinDate },
                            checkin: { lte: checkoutDate },
                        },
                    },
                },
            },
        })
        return rooms
    }
}

db.cancelBooking = async (token, bookingId) => {
    await prisma.token.delete({
        where: {
            tokenId: token,
        },
    })
    const booking = await prisma.roomBooking.delete({
        where: {
            bookingId: bookingId,
        },
    })
    return booking
}

db.AdminAuth = async ({ email, password }) => {
    console.log(email)
    try {
        const admin = await prisma.admin.findFirst({
            where: {
                email: email,
            },
        })
        // console.log({ admin });
        if (!admin) return { result: null }

        const isValid = await bcrypt.compare(password, admin.password)
        if (isValid) return { result: admin, error: null }
        return { result: null, error: 'mismatch password' }
    } catch (error) {
        console.log('there was an error')
        return { error: error }
    }
}

db.getDashboardData = async () => {
    const users = await prisma.user.count()
    const roomReservations = await prisma.roomBooking.count()
    const cottageReservations = await prisma.cottageBooking.count()
    const totalRooms = await prisma.room.count()
    const totalCottages = await prisma.cottage.count()
    const pendingRoom = await prisma.roomBooking.count({
        where: {
            status: 'pending',
        },
    })
    const pendingCottage = await prisma.cottageBooking.count({
        where: {
            status: 'pending',
        },
    })
    const roomIncome = await prisma.roomBooking.aggregate({
        _sum: {
            price: true,
        },
    })
    const cottageIncome = await prisma.cottageBooking.aggregate({
        _sum: {
            price: true,
        },
    })
    // if (!pendingRoom && !pendingCottage) return
    console.log({ pendingRoom, pendingCottage })
    return {
        users,
        roomReservations,
        cottageReservations,
        pendingCottage,
        pendingRoom,
        roomIncome,
        cottageIncome,
        totalCottages,
        totalRooms,
    }
}

module.exports = db
