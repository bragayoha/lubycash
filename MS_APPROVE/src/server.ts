import express from 'express'
import { AppDataSource } from './database/dataSource'
import routes from './routes'

AppDataSource.initialize()
    .then(() => {
        const app = express()
        
        app.use(express.json())

        app.use(routes)

        return app.listen(3334)

    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    })
