require('dotenv').config()
const nodemailer = require('nodemailer')

const smtpConfig = {
    service: 'gmail.com',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
};

sendVerification = (userEmail, token, guest, bookingDetails, type, price) => {
    console.log({ userEmail, token, guest, bookingDetails, type, price })
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: 'EMAIL VERIFICATION FOR BEACH PARADISE RESERVATION',
        html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Booking Confirmation - Beach Paradise</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd;"
            >
              <!-- Header -->
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #0073e6; color: #ffffff;">
                  <h1 style="margin: 0;">Beach Paradise</h1>
                </td>
              </tr>

              <!-- Booking Confirmation Message -->
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <h2 style="color: #333333;">Booking Confirmation Needed</h2>
                  <p style="font-size: 16px; color: #333333;">
                    Thank you for choosing Beach Paradise! Please confirm your booking by clicking the button below.
                  </p>
                </td>
              </tr>

              <!-- Confirmation Button -->
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <a
                    href="http://127.0.0.1:5000/api/verify/${token}"
                    style="
                      display: inline-block;
                      padding: 12px 24px;
                      color: #ffffff;
                      background-color: #28a745;
                      text-decoration: none;
                      border-radius: 5px;
                      font-size: 16px;
                    "
                    >Click Here to Confirm Your Booking</a
                  >
                </td>
              </tr>

              <!-- Booking Details -->
              <tr>
                <td style="padding: 20px;">
                  <table width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Booking ID:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${bookingDetails.bookingId}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Guest Name:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${guest}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Check-in Date:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${bookingDetails.checkin}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Check-out Date:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${bookingDetails.checkout}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Booking Type:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${type}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Total Price:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${price}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
                  <p style="font-size: 14px; color: #888888;">
                    If you did not make this booking, please ignore this email.
                  </p>
                  <p style="font-size: 12px; color: #888888;">
                    &copy; 2024 Beach Paradise. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `,
    }

    const transporter = nodemailer.createTransport(smtpConfig);
    transporter.verify((err, _success) => {
        if (err) return console.log('could not send email due to transporter error: ', err);

        transporter.sendMail(mailOptions, (err, _res) => {
            if (err) return console.log('error sending mail', err)
            return console.log('email sent')
        })
    })
}

sendConfirmation = (userEmail, guest, bookingDetails, type) => {
    console.log({ userEmail, guest, bookingDetails, type })
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: 'BEACH PARADISE RESERVATION',
        html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Booking Confirmed - Beach Paradise</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd;"
            >
              <!-- Header -->
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #0073e6; color: #ffffff;">
                  <h1 style="margin: 0;">Beach Paradise</h1>
                </td>
              </tr>

              <!-- Confirmation Message -->
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <h2 style="color: #333333;">Your Booking is Confirmed!</h2>
                  <p style="font-size: 16px; color: #333333;">
                    We’re excited to have you stay with us at Beach Paradise. Your reservation has been successfully confirmed.
                  </p>
                </td>
              </tr>

              <!-- Booking Details -->
              <tr>
                <td style="padding: 20px;">
                  <table width="100%" style="border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Booking ID:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${bookingDetails.bookingId}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Guest Name:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${guest}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Check-in Date:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${bookingDetails.checkin}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Check-out Date:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${bookingDetails.checkout}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Booking Type:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${type}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;"><strong>Total Price:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${bookingDetails.price}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Additional Information -->
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <p style="font-size: 14px; color: #333333;">
                    We look forward to welcoming you! If you need to make any changes to your booking, please contact our support team.
                  </p>
                </td>
              </tr>

              <!-- Contact Support Button -->
              <tr>
                <td style="padding: 20px; text-align: center;">
                  <a
                    href="{{support_link}}"
                    style="
                      display: inline-block;
                      padding: 12px 24px;
                      color: #ffffff;
                      background-color: #0073e6;
                      text-decoration: none;
                      border-radius: 5px;
                      font-size: 16px;
                    "
                    >Contact Support</a
                  >
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
                  <p style="font-size: 14px; color: #888888;">
                    Thank you for choosing Beach Paradise. We wish you a pleasant stay!
                  </p>
                  <p style="font-size: 12px; color: #888888;">
                    &copy; 2024 Beach Paradise. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `,
    }

    const transporter = nodemailer.createTransport(smtpConfig);
    transporter.verify((err, _success) => {
        if (err) return console.log('could not send email due to transporter error: ', err);

        transporter.sendMail(mailOptions, (err, _res) => {
            if (err) return console.log('error sending mail', err)
            return console.log('email sent')
        })
    })

}

module.exports = {
    sendVerification,
    sendConfirmation,
}
