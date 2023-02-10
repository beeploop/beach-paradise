require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
})

sendVerification = (userEmail, token) => {
    console.log({ userEmail, token })
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: 'EMAIL VERIFICATION FOR BEACH PARADISE RESERVATION',
        html: `
        <h1>Thank you for choosing Beach Paradise</h1>
        <p>To confirm your reservation <a href="http://localhost:5000/api/verify/${token}">click here.</a> </p>
        `,
    }

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) return console.log('error sending mail', err)
        return console.log('email sent')
    })
}

sendConfirmation = (userEmail, bookingDetails) => {
    console.log({ userEmail })
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: 'BEACH PARADISE RESERVATION',
        html: `
        <h1>Thank you for choosing Beach Paradise</h1>
        <h3>Your reservation has been received and confirmed.</h3>
        <p>Booking information:</p>
        <p>Booking ID: ${bookingDetails.bookingId}</p>
        <p>Room: ${bookingDetails.roomNumber}</p>
        <p>Estimated Fee: ₱ ${bookingDetails.price}</p>
        `,
    }

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) return console.log('error sending mail', err)
        return console.log('email sent')
    })
}

module.exports = {
    sendVerification,
    sendConfirmation,
}
