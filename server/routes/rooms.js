const express = require('express');
const router = express.Router();
const db = require('../prisma/prismaController');

router.get('/', async (req, res) => {
    const rooms = await db.getAvailableRooms();
    res.send(rooms);
});

router.get('/all', async (req, res) => {
    const rooms = await db.getAllRooms();
    res.send(rooms);
});

router.post('/reserve', async (req, res) => {
    const body = req.body;
    console.log({ body });
    const { bookingData, userData } = await db.reserveRoom(body);
    res.send(bookingData);
});

// Filter rooms by status. Admin dashboard calls this
router.get('/all/:filter', async (req, res) => {
    const { filter } = req.params;
    const rooms = await db.filterByStatus(filter);
    res.send(rooms);
});

// Filter rooms
router.get('/filter?', async (req, res) => {
    const { checkin, checkout, type } = req.query;
    const rooms = await db.filterByDateAndType({
        checkin: checkin,
        checkout: checkout,
        type: type,
    });
    res.send(rooms);
});

// Get specific room
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const room = await db.getRoom(id);
    res.send(room);
});

module.exports = router;
