import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

@Entity("transactions")
export class Transaction {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    value: number;
    
    @CreateDateColumn()
    created_at: Date;
    
    @ManyToOne(() => Client, client => client.id)
    @JoinColumn({ name: "source_client_id" })
    source_client: Client;

    @ManyToOne(() => Client, client => client.id)
    @JoinColumn({ name: "target_client_id" })
    target_client: Client;
}