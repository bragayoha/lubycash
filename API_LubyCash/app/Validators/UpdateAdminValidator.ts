import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    fullName: schema.string.optional({ trim: true }, [
      rules.regex(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g),
    ]),
    email: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true, whereNot: { secure_id: this.refs.id } }),
      rules.email(),
    ]),
    cpfNumber: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'users', column: 'cpf_number', whereNot: { secure_id: this.refs.id } }),
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
    ]),
  })


  public messages = {}
}
