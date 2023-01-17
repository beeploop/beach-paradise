const express = require('express');
const db = require('../prisma/prismaController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        routes: '/all, /reserve, /filter?,  /:id',
    });
});

router.get('/all', async (req, res) => {
    const cottages = await db.getAllCottages();
    res.send(cottages);
});

router.post('/reserve', async (req, res) => {
    const body = req.body;
    console.log(body);
    const { bookingData, userData } = await db.reserveCottage(body);
    res.send(bookingData);
});

router.get('/filter?', async (req, res) => {
    const { checkin, checkout } = req.query;
    const cottages = await db.getAvailableCottages(checkin, checkout);
    res.send(cottages);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const room = await db.getCottage(id);
    res.send(room);
});

module.exports = router;
