import express from 'express'
import { AppDataSource } from './database/dataSource'

AppDataSource.initialize()
    .then(() => {
        const app = express()
        
        app.use(express.json())

        app.get('/', (req, res) => {
            return res.json('Server is running')
        })

        return app.listen(3334)

    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    })
