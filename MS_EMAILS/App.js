const statusEmail = require('./consumers/send_status_email')

statusEmail.runSendStatusEmail().catch(console.error)