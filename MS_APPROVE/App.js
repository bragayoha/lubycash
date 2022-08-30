const express = require('express')
const kafka = require('./src/kafka')

const consumer = kafka.consumer({groupId: 'create_new_client'})
const topic = 
const app = express()