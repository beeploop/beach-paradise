const express = require('express')
const router = express.Router()
const cottages = require('../controllers/dbCottages')
const reservations = require('../controllers/dbReservations')

router.get('/', (req, res) => {
    res.send({
        routes: '/all, /reserve, /filter?,  /:id',
    })
})

router.get('/all', async (req, res) => {
    const cottagesData = await cottages.getAllCottages()
    res.send(cottagesData)
})

router.post('/reserve', async (req, res) => {
    const body = req.body
    console.log(body)
    const { bookingData } = await reservations.reserveCottage(body)
    res.send(bookingData)
})

router.get('/filter?', async (req, res) => {
    const { checkin, checkout } = req.query
    const cottagesData = await cottages.getAvailableCottages(checkin, checkout)
    res.send(cottagesData)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    const cottage = await cottages.getCottage(id)
    res.send(cottage)
})

module.exports = router
