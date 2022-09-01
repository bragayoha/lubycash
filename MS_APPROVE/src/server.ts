import 'reflect-metadata'
import './database/dataSource'

import express from 'express'
import kafka from './kafka'

const consumer = kafka.consumer({groupId: 'create_new_client'})
const topic = ''

const app = express()

app.listen(3334, () => console.log('server is running'))