const {Kafka} = require('kafkajs')

const kafka = new Kafka({
    clientId: 'ms-email',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 300,
        retries: 5,
    }
})

module.exports = kafka
