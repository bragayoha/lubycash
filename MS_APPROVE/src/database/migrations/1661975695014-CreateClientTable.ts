import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateClientTable1661975695014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clients",
                columns: [
                    { 
                        name: "id",
                        type: "integer",
                        isNullable: false,
                        isUnique: true,
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "full_name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "cpf_number",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "state",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "zipcode",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "current_balance",
                        type: "decimal",
                        isNullable: false,
                        unsigned: true,
                        default: 0
                    },
                    {
                        name: "average_salary",
                        type: "decimal",
                        isNullable: false,
                        unsigned: true
                        
                    },
                    {
                        name: "status",
                        type: "string",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }               
                ],
            })
        )
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clients")
    }

}
