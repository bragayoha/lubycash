import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().unique().notNullable()
      table.uuid('secure_id').unique().notNullable()
      table.string('remember_me_token').nullable()
      table.string('full_name', 50).notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('cpf_number', 14).unique().notNullable()
      table.string('password', 255).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
