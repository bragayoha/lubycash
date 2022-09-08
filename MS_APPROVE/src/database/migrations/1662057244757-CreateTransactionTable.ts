import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTransactionTable1662057244757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
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
                        name: "source_client_id",
                        type: "integer",
                        isNullable: false,
                        unsigned: true,
                    },
                    {
                        name: "target_client_id",
                        type: "integer",
                        isNullable: false,
                        unsigned: true,
                    },
                    {
                        name: "value",
                        type: "decimal",
                        isNullable: false,
                        unsigned: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_source_client",
                        columnNames: ["source_client_id"],
                        referencedTableName: "clients",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_target_client",
                        columnNames: ["target_client_id"],
                        referencedTableName: "clients",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions")
    }

}
