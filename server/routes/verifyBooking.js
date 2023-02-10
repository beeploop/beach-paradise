const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.get('/:token', async (req, res) => {
    const { token } = req.params

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decoded) => {
        if (err) return res.redirect(`${process.env.FRONT_END_URL}/404`)

        const tokenStoredInDB = await prisma.token.findFirst({
            where: {
                token: token,
                status: 'pending',
            },
        })
        if (!tokenStoredInDB) return

        let booking
        if (tokenStoredInDB.type === 'room') {
            const userBooking = await prisma.roomBooking.update({
                where: {
                    bookingId: tokenStoredInDB.bookingId,
                },
                data: {
                    status: 'verified',
                },
            })
            booking = userBooking
        } else {
            const userBooking = await prisma.cottageBooking.update({
                where: {
                    bookingId: tokenStoredInDB.bookingId,
                },
                data: {
                    status: 'verified',
                },
            })
            booking = userBooking
        }

        const user = await prisma.user.findUnique({
            where: {
                userId: booking.userId,
            },
            select: {
                profileId: true,
            },
        })
        const userProfile = await prisma.profile.findUnique({
            where: {
                profileId: user.profileId,
            },
        })

        sendConfirmation(userProfile.email, booking)
        res.redirect(`${process.env.FRONT_END_URL}`)
    })
})

module.exports = router
