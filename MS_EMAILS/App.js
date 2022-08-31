const welcomeEmail = require('./consumers/send_welcome_email')

welcomeEmail.runSendWelcomeEmail().catch(console.error)