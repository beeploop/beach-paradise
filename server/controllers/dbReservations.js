require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { validateAdultsAndKids, computePrice } = require('../utils/helper')
const { sendVerification } = require('../utils/mailer')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const userDB = require('./dbUser')

const getReservations = async () => {
    const roomReservations = await prisma.roomBooking.findMany({
        where: {
            status: 'verified',
        },
    })
    const cottageReservations = await prisma.cottageBooking.findMany({
        where: {
            status: 'verified',
        },
    })
    return { rooms: roomReservations, cottages: cottageReservations }
}

const reserveCottage = async (bookingDetails) => {
    const user = await userDB.checkUserThenInsert({
        firstname: bookingDetails.firstname,
        lastname: bookingDetails.lastname,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        street: bookingDetails.street,
        city: bookingDetails.city,
        state: bookingDetails.state,
        postal: bookingDetails.postal,
    })
    console.log({ user })

    const cottage = await prisma.cottage.findUnique({
        where: {
            cottageId: parseInt(bookingDetails.cottageId),
        },
    })

    const totalPrice = computePrice(bookingDetails.checkin, bookingDetails.checkout, bookingDetails.rate);
    const booking = await prisma.cottageBooking.create({
        data: {
            cottageName: cottage.name,
            userId: user.userId,
            checkin: new Date(bookingDetails.checkin),
            checkout: new Date(bookingDetails.checkout),
            price: totalPrice,
        },
    })

    const jwtToken = jwt.sign(
        {
            userEmail: user.email,
            userId: user.userId,
            bookingId: booking.bookingId,
        },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: '1m' }
    )

    const token = await prisma.token.create({
        data: {
            bookerId: user.userId,
            bookingId: booking.bookingId,
            type: 'cottage',
            token: jwtToken,
        },
    })

    console.log({ user, token })
    const guest = `${bookingDetails.firstname} ${bookingDetails.lastname}`;
    sendVerification(user.email, token.token, guest, booking, 'cottage', totalPrice);
    return { bookingData: booking, userData: user }
}

const reserveRoom = async (bookingDetails) => {
    const user = await userDB.checkUserThenInsert({
        firstname: bookingDetails.firstname,
        lastname: bookingDetails.lastname,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        street: bookingDetails.street,
        city: bookingDetails.city,
        state: bookingDetails.state,
        postal: bookingDetails.postal,
    })
    console.log({ user })

    const { adults, kids } = validateAdultsAndKids({
        adults: bookingDetails.numOfAdults,
        kids: bookingDetails.numOfKids,
    })

    const totalPrice = computePrice(bookingDetails.checkin, bookingDetails.checkout, bookingDetails.rate);
    const booking = await prisma.roomBooking.create({
        data: {
            roomNumber: parseInt(bookingDetails.roomNumber),
            userId: user.userId,
            checkin: new Date(bookingDetails.checkin),
            checkout: new Date(bookingDetails.checkout),
            adults: adults,
            kids: kids,
            price: totalPrice,
        },
    })

    const jwtToken = jwt.sign(
        {
            userEmail: user.email,
            userId: user.userId,
            bookingId: booking.bookingId,
        },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: '1m' }
    )

    console.log({ jwtToken })

    const token = await prisma.token.create({
        data: {
            token: jwtToken,
            bookerId: user.userId,
            bookingId: booking.bookingId,
            type: 'room',
        },
    })

    console.log({ user, token })
    const guest = `${bookingDetails.firstname} ${bookingDetails.lastname}`;
    sendVerification(user.email, token.token, guest, booking, 'room', totalPrice);
    return { bookingData: booking, userData: user }
}

module.exports = {
    getReservations,
    reserveRoom,
    reserveCottage,
}
