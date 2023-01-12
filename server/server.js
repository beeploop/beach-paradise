const express = require('express');
const session = require('express-session');
const cors = require('cors');
const db = require('./prisma/prismaController');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(process.env.SESSION_AGE),
            httpOnly: true,
        },
    })
);

app.get('/', (req, res) => {
    res.json({
        message: 'welcome to beach-reservation api',
    });
});

// Get all available rooms
app.get('/api/rooms/', async (req, res) => {
    const rooms = await db.getAvailableRooms();
    res.send(rooms);
});

app.get('/api/rooms/all', async (req, res) => {
    const rooms = await db.getAllRooms();
    res.send(rooms);
});

// Filter rooms by status. Admin dashboard calls this
app.get('/api/rooms/all/:filter', async (req, res) => {
    const { filter } = req.params;
    const rooms = await db.filterByStatus(filter);
    res.send(rooms);
});

// Filter rooms
app.get('/api/rooms/filter?', async (req, res) => {
    const { checkin, checkout, type } = req.query;
    const rooms = await db.filterByDateAndType({
        checkin: checkin,
        checkout: checkout,
        type: type,
    });
    res.send(rooms);
});

// Get specific room
app.get('/api/rooms/:id', async (req, res) => {
    const { id } = req.params;
    const room = await db.getRoom(id);
    res.send(room);
});

app.get('/api/cottage/all', async (req, res) => {
    const cottages = await db.getAllCottages();
    res.send(cottages);
});

app.get('/api/cottage/filter?', async (req, res) => {
    const { checkin, checkout } = req.query;
    const cottages = await db.getAvailableCottages(checkin, checkout);
    res.send(cottages);
});

app.get('/api/cottage/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const room = await db.getCottage(id);
    res.send(room);
});

// Admin auth endpoint
app.post('/api/admin/authenticate', async (req, res) => {
    const body = req.body;
    console.log(body);
    const admin = await db.AdminAuth({
        email: body.email,
        password: body.password,
    });
    if (admin.result) req.session.admin = admin.result;
    console.log('session: ', req.session.admin);
    res.send(admin);
});

// Get reservations
app.get('/api/admin/reservations', async (req, res) => {
    const reservations = await db.getReservations();
    res.send(reservations);
});

app.post('/api/reserve/cottage', async (req, res) => {
    const body = req.body;
    console.log(body);
    const { bookingData, userData } = await db.reserveCottage(body);
    res.send(bookingData);
});

// Reserve a room
app.post('/api/reserve/room', async (req, res) => {
    const body = req.body;
    console.log({ body });
    const { bookingData, userData } = await db.reserveRoom(body);
    res.send(bookingData);
});

// Add a room
app.post('/api/admin/room/add', async (req, res) => {
    const body = req.body;
    const room = await db.addRoom(body);
    res.send(room);
});

// Add a cottage
app.post('/api/admin/cottage/add', async (req, res) => {
    const body = req.body;
    console.log(body);
    const cottage = await db.addCottage(body);
    console.log(cottage);
    res.send(cottage);
});

// Edit cottage
app.post('/api/admin/cottage/edit', async (req, res) => {
    const body = req.body;
    console.log(body);
    const cottage = await db.editCottage(body);
    console.log('returning edited cottage: ', cottage);
    res.send(cottage);
});

// Edit room
app.post('/api/admin/room/edit', async (req, res) => {
    const body = req.body;
    console.log(body);
    const room = await db.editRoom(body);
    console.log('returning edited room: ', room);
    res.send(room);
});

// Recieve email verification for reservation
app.get('/api/reservation/verify/:token', async (req, res) => {
    const { token } = req.params;
    console.log('recieved token: ', token);
    const booking = await db.verifyReservation(token);

    if (!booking) {
        res.redirect('https://beach-reservation.netlify.app/404');
    } else {
        res.redirect('https://beach-reservation.netlify.app/');
    }
});

app.get('/api/admin/stats', async (req, res) => {
    const data = await db.getDashboardData();
    res.send(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
