const {Kafka} = require('kafkajs')

const kafka = new Kafka({
    clientId: 'ms_approve',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 300,
        retries: 5,
    }
})

module.exports = kafka
