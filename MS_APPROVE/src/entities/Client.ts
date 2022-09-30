import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("clients")
export class Client {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "text"})
    full_name: string;

    @Column({type: "text"})
    email: string;

    @Column({type: "text"})
    phone: string;

    @Column({type: "text"})
    cpf_number: string;

    @Column({type: "text"})
    address: string;

    @Column({type: "text"})
    city: string;

    @Column({type: "text"})
    state: string;

    @Column({type: "text"})
    zipcode: string;

    @Column()
    current_balance: number;

    @Column()
    average_salary: number;

    @Column({type: "text"})
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Transaction, transaction => transaction.source_client)
    source_transactions: Transaction[]

    @OneToMany(() => Transaction, transaction => transaction.target_client)
    target_transactions: Transaction[]

}