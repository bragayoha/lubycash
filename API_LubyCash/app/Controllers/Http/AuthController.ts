import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

import Env from '@ioc:Adonis/Core/Env'

import Database from '@ioc:Adonis/Lucid/Database'
import {v4 as uuidv4} from 'uuid'
import { sendMail } from 'App/Services/sendMail'
import ResetPasswordValidator from 'App/Validators/ResetPasswordValidator'
export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()

    const user = await User.query().where('email', email).preload('roles').first()

    try {
      const token = await auth.use('api').attempt(email, password, {
        name: user?.fullName,
        expiresIn: Env.get('NODE_ENV') === 'development' ? '' : '30min',
      })

      return { token, user }
    } catch (error) {
      console.log(error)
      return response.unauthorized({ message: 'Invalid credentials', originalError: error.message })
    }
  }

  public async forgetPassword({ response, params }: HttpContextContract) {
    const cpf = params.id

    let user

    const trx = await Database.transaction()

    try {
      user = await User.findByOrFail('cpfNumber', cpf)
      user.merge({ rememberMeToken: uuidv4() }, trx).save()
    } catch (error) {
      trx.rollback()
      return response.badRequest({
        message: 'Error in generate token',
        originalError: error.message,
      })
    }
    try {
      await sendMail(user, 'Request to reset password!', 'reset_password_email')
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in send email', originalError: error.message })
    }

    trx.commit()
    return response.ok({ message: 'Success in send recovery email!' })
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const data = await request.validate(ResetPasswordValidator)

    const trx = await Database.transaction()
    let user
    try {
      user = await User.findByOrFail('rememberMeToken', data.token)
      if (user.rememberMeToken === data.token) {
        user.merge(data.password).useTransaction(trx)
        await user.save()
      }
    } catch (error) {
      trx.rollback()
      return response.badRequest({
        message: 'Error in reset password',
        originalError: error.message,
      })
    }

    trx.commit()
    return response.ok({ message: 'Success in reset password' })
  }
}
