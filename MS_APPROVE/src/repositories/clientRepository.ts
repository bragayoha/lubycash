import { AppDataSource } from "../database/dataSource";
import { Client } from "../entities/Client";

export const clientRepository = AppDataSource.getRepository(Client)