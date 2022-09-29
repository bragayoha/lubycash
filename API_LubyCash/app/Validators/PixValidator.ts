import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PixValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    targetCpf: schema.string({ trim: true }, [
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
      rules.required(),
    ]),
    value: schema.number([rules.required(), rules.unsigned()]),
    })


  public messages = {}
}
