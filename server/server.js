const express = require('express')
const session = require('express-session')
const cors = require('cors')
const db = require('./prisma/prismaController')
const auth = require('./routes/auth')
const rooms = require('./routes/rooms')
const cottage = require('./routes/cottages')
const admin = require('./routes/admin')
const verifyBooking = require('./routes/verifyBooking')

const app = express()
const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET'],
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))
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
)

app.get('/', (req, res) => {
    res.json({
        message: 'welcome to beach-reservation api',
        routes: '/api/auth, /api/rooms/, /api/cottage, /api/admin',
    })
})

// API routes
app.use('/api/auth', auth)
app.use('/api/rooms', rooms)
app.use('/api/cottage', cottage)
app.use('/api/admin', admin)
app.use('/api/verify', verifyBooking)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server listening on port: ${PORT}`))
