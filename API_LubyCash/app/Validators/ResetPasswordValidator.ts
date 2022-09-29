import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    token: schema.string([rules.required()]),
    password: schema.string([rules.confirmed(), rules.minLength(6), rules.required()]),
  })


  public messages = {}
}
