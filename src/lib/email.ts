const nodemailer = require('nodemailer')

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'my.smtp.server.dev@gmail.com',
    pass: 'ibpttzxqahwlfffm',
  },
})

const sendEmail = async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
  await transporter.sendMail({
    from: '"WingRun" <my.smtp.server.dev@gmail.com>',
    to,
    subject,
    text,
    // html: '<b>Hello world?</b>', // HTML body
  })
}

export default sendEmail
