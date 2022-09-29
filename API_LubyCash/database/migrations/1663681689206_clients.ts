import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().unique().notNullable()
      table.uuid('secure_id').unique().notNullable()
      table.string('full_name', 50).notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('phone', 15).notNullable()
      table.string('cpf_number', 14).unique().notNullable()
      table.string('address', 255).notNullable()
      table.string('city', 255).notNullable()
      table.string('state', 255).notNullable()
      table.string('zipcode', 9).notNullable()
      table.decimal('current_balance', 8, 2).unsigned().notNullable()
      table.decimal('average_salary', 8, 2).unsigned().notNullable()
      table.string('status').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
