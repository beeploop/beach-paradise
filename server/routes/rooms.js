const express = require('express')
const router = express.Router()
const rooms = require('../controllers/dbRooms')
const reservations = require('../controllers/dbReservations')
const db = require('../prisma/prismaController')

router.get('/', async (req, res) => {
    const rooms = await rooms.getAvailableRooms()
    res.send(rooms)
})

router.get('/all', async (req, res) => {
    const rooms = await rooms.getAllRooms()
    res.send(rooms)
})

router.post('/reserve', async (req, res) => {
    const body = req.body
    console.log({ body })
    const { bookingData, userData } = await reservations.reserveRoom(body)
    res.send(bookingData)
})

// Filter rooms by status. Admin dashboard calls this
router.get('/all/:filter', async (req, res) => {
    const { filter } = req.params
    console.log({ filter })
    const rooms = await db.filterByStatus(filter)
    res.send(rooms)
})

// Filter rooms
router.get('/filter?', async (req, res) => {
    const { checkin, checkout, type } = req.query
    const rooms = await db.filterByDateAndType({
        checkin: checkin,
        checkout: checkout,
        type: type,
    })
    res.send(rooms)
})

// Get specific room
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const room = await rooms.getRoom(id)
    res.send(room)
})

module.exports = router
