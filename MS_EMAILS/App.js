const statusEmail = require('./consumers/send_status_email')
const resetPassword = require('./consumers/reset_password_email')

statusEmail.runSendStatusEmail().catch(console.error)
resetPassword.runResetPasswordEmail().catch(console.error)