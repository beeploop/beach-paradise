const express = require('express')
const router = express.Router()
const reservations = require('../controllers/dbReservations')
const rooms = require('../controllers/dbRooms')
const cottages = require('../controllers/dbCottages')
const employee = require('../controllers/dbEmployee')
const db = require('../prisma/prismaController')

router.get('/', (req, res) => {
    res.send({
        routes: '/reservations, /room/add, /room/edit, /cottage/add, /cottage/edit, /stats',
    })
})

// Get reservations
router.get('/reservations', async (req, res) => {
    const reservationsData = await reservations.getReservations()
    res.send(reservationsData)
})

// Add a room
router.post('/room/add', async (req, res) => {
    const body = req.body
    const room = await rooms.addRoom(body)
    res.send(room)
})

// Edit room
router.post('/room/edit', async (req, res) => {
    const body = req.body
    console.log(body)
    const room = await rooms.editRoom(body)
    console.log('returning edited room: ', room)
    res.send(room)
})

// Add a cottage
router.post('/cottage/add', async (req, res) => {
    const body = req.body
    console.log(body)
    const cottage = await cottages.addCottage(body)
    console.log(cottage)
    res.send(cottage)
})

// Edit cottage
router.post('/cottage/edit', async (req, res) => {
    const body = req.body
    console.log(body)
    const cottage = await cottages.editCottage(body)
    console.log('returning edited cottage: ', cottage)
    res.send(cottage)
})

// Get the employees
router.get('/employee', async (req, res) => {
    const employees = await employee.getEmployees()
    res.send(employees)
})

// Add Employees
router.post('/employee/add', async (req, res) => {
    const body = req.body
    console.log(body)
    const employeeData = await employee.addEmployee(body)
    res.send(employeeData)
})

// Get analytics data
router.get('/stats', async (req, res) => {
    const data = await db.getDashboardData()
    res.send(data)
})

module.exports = router
