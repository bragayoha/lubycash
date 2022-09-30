import { Request, Response } from "express";
import { clientRepository } from "../repositories/clientRepository.js";
import kafka from "./kafka.js"

const consumer = kafka.consumer({groupId: "automatic_approval_conveyor"})

const topic = "automatic_approval_conveyor"
export class CreateClientService {
    async create(req: Request, res: Response){
        let newClient
        await consumer.connect()
        await consumer.subscribe({topic: topic})

        await consumer.run({
            eachMessage: async ({ message }) => {
                const { user } = JSON.parse('message.value?')

                newClient = clientRepository.create(user)
    
                await clientRepository.save(newClient)

            }
        })
        
    }
}

import { getRepository } from "typeorm";
import { Client } from "../entities/Client";

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


export class CreateClientService1 {

    async execute({full_name, email, phone, cpf_number, address, city, state, zipcode, current_balance, average_salary, status }: ClientRequest): Promise<Client> {
        await consumer.connect()
        await consumer.subscribe({topic: topic})
        
        
        const repo = getRepository(Client);

        const client = repo.create({

        })
    }
}