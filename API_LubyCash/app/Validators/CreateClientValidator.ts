import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    fullName: schema.string({ trim: true }, [
      rules.required(),
      rules.regex(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g),
    ]),
    email: schema.string({ trim: true }, [
      rules.unique({ table: 'clients', column: 'email', caseInsensitive: true }),
      rules.email(),
      rules.required(),
    ]),
    phone: schema.string({trim: true}, [
      rules.required(),
      rules.regex(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/),
    ]),
    cpfNumber: schema.string({ trim: true }, [
      rules.unique({ table: 'clients', column: 'cpf_number' }),
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
      rules.required(),
    ]),
    address: schema.string({trim: true}, [
      rules.required(),
    ]),
    city: schema.string({trim: true}, [
      rules.required(),
    ]),
    state: schema.string({trim: true}, [
      rules.required(),
    ]),
    zipcode: schema.string({trim: true}, [
      rules.regex(/^[0-9]{5}-[0-9]{3}$/),
      rules.required(),
    ]),
    averageSalary: schema.number([rules.required(), rules.unsigned()]),
    password: schema.string([rules.confirmed(), rules.minLength(6), rules.required()]),
  })


  public messages = {}
}
