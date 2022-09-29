import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAdminValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    fullName: schema.string({ trim: true }, [
      rules.required(),
      rules.regex(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g),
    ]),
    email: schema.string({ trim: true }, [
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true }),
      rules.email(),
      rules.required(),
    ]),
    cpfNumber: schema.string({ trim: true }, [
      rules.unique({ table: 'users', column: 'cpf_number' }),
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
      rules.required(),
    ]),
    password: schema.string([rules.confirmed(), rules.minLength(6), rules.required()]),
  })


  public messages = {}
}
