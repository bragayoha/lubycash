import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateClientValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    fullName: schema.string.optional({ trim: true }, [
      rules.regex(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g),
    ]),
    email: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'clients', column: 'email', caseInsensitive: true }),
      rules.email(),
    ]),
    phone: schema.string.optional({trim: true}, [
      rules.regex(/^(\d{2})\d{5}-\d{4}$/),
    ]),
    cpfNumber: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'clients', column: 'cpf_number' }),
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
    ]),
    address: schema.string.optional({trim: true}, [
    ]),
    city: schema.string.optional({trim: true}, [
    ]),
    state: schema.string.optional({trim: true}, [
    ]),
    zipcode: schema.string.optional({trim: true}, [
      rules.regex(/^[\d]{2}.[\d]{3}-[\d]{3}/),
    ]),
  })


  public messages = {}
}
