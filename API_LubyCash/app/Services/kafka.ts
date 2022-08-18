import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
  retry: {
    initialRetryTime: 300,
    retries: 5,
  }
})

// export const producer = kafka.producer({
//   allowAutoTopicCreation: true,
//   transactionTimeout: 30000,
// })

