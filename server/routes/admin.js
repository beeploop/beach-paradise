const express = require('express');
const db = require('../prisma/prismaController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        routes: '/reservations, /room/add, /room/edit, /cottage/add, /cottage/edit, /stats',
    });
});

// Get reservations
router.get('/reservations', async (req, res) => {
    const reservations = await db.getReservations();
    res.send(reservations);
});

// Add a room
router.post('/room/add', async (req, res) => {
    const body = req.body;
    const room = await db.addRoom(body);
    res.send(room);
});

// Edit room
router.post('/room/edit', async (req, res) => {
    const body = req.body;
    console.log(body);
    const room = await db.editRoom(body);
    console.log('returning edited room: ', room);
    res.send(room);
});

// Add a cottage
router.post('/cottage/add', async (req, res) => {
    const body = req.body;
    console.log(body);
    const cottage = await db.addCottage(body);
    console.log(cottage);
    res.send(cottage);
});

// Edit cottage
router.post('/cottage/edit', async (req, res) => {
    const body = req.body;
    console.log(body);
    const cottage = await db.editCottage(body);
    console.log('returning edited cottage: ', cottage);
    res.send(cottage);
});

router.get('/employee', async (req, res) => {
    const employees = await db.getEmployees();
    res.send(employees);
});

router.post('/employee/add', async (req, res) => {
    const body = req.body;
    console.log(body);
    const employee = await db.addEmployee(body);
    res.send(employee);
});

router.get('/stats', async (req, res) => {
    const data = await db.getDashboardData();
    res.send(data);
});

module.exports = router;
