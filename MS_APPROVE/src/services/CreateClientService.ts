import { getRepository } from "typeorm";
import { Client } from "../entities/Client";
import kafka from "./kafka.js"

type ClientRequest = {
    full_name: string;
    email: string;
    phone: string;
    cpf_number: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    current_balance: number;
    average_salary: number;
    status: string;
}

const consumer = kafka.consumer({groupId: "automatic_approval_conveyor"})

const topic = "automatic_approval_conveyor"

export class CreateClientService {

    async execute({full_name, email, phone, cpf_number, address, city, state, zipcode, current_balance, average_salary, status }: ClientRequest): Promise<Client> {
        await consumer.connect()
        await consumer.subscribe({topic: topic})
        
        
        const repo = getRepository(Client);

        const client = repo.create({

        })
    }
}