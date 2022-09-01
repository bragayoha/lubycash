import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "db-ms",
    port: 3307,
    username: "root",
    password: "",
    database: "ms-approve",
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    })