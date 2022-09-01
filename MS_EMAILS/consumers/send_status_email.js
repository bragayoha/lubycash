const kafka = require('../src/kafka')
const transporter = require('../src/nodeMailer')

const consumer = kafka.consumer({groupId: 'send_status_email'})

const topic = 'send_status_email'

async function runSendStatusEmail() {
    await consumer.connect()

    await consumer.subscribe({topic: topic})

    await consumer.run({
        eachMessage: async ({message}) => {
            const {user, subject, info} = JSON.parse(message.value)

            const mailOptions = {
                from: 'admin@lubycash.com',
                to: user.email,
                subject: subject,
                html: `
                <h1> Hello, ${user.name} </h1>
                <p> Thanks for the registration! Your account status is as ${user.status} </p>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) console.log(err)
                else console.log(`Message sent: ${info}`)
            })
        }
    })
}

module.exports = {runSendStatusEmail}