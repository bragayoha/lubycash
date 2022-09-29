import { Router } from "express"
import { CreateClientService } from "./services/CreateClientService"

const routes = Router()

routes.post('/client', new CreateClientService().create)

export default routes