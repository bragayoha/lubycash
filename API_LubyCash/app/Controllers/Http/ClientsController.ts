import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import CreateAdminValidator from 'App/Validators/CreateAdminValidator'
import UpdateAdminValidator from 'App/Validators/UpdateAdminValidator'

export default class ClientsController {
  public async index({request, response}: HttpContextContract) {
    const {page, perPage, noPaginate, ...inputs} = request.qs()

    if(noPaginate) {
      return User.query().preload('roles', (roleTable) => {
        roleTable.select('id', 'name')
      }).filter(inputs)
    }

    try {
      const users = await User.query()
      .preload('roles', (roleTable) => {
        roleTable.select('id', 'name')
      })
      .filter(inputs)
      .paginate(page || 1, perPage || 10)

      return response.ok(users)
    } catch (error) {
      return response.badRequest({ message: 'Error in list users', originalError: error.message})
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateAdminValidator)

    let user

    const trx = await Database.transaction()

    try {
      user = await User.create(
        {
          fullName: data.fullName,
          email: data.email,
          cpfNumber: data.cpfNumber,
          password: data.password,
        }, trx
      )

      const roleAdmin = await Role.findBy('name', 'admin')

      if (roleAdmin) await user.related('roles').attach([roleAdmin.id])
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in create user', originalError: error.message})
    }

    let userFind
    try {
      userFind = await User.query().where('id', user.id).preload('roles')
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in find user', originalError: error.message})
    }

    trx.commit()
    return response.ok({userFind})
  }

  public async show({ response, params}: HttpContextContract) {
    const userSecureId = params.id

    try {
      const user = await User.query()
      .where('secure_id', userSecureId)
      .preload('roles')

      return response.ok({user})
    } catch (error) {
      return response.notFound({ message: 'User not found', originalError: error.message})
    }
  }

  public async update({ request, response, params}: HttpContextContract){
    const data = await request.validate(UpdateAdminValidator)

    const userSecureId = params.id

    let user

    const trx = await Database.transaction()

    try {
      user = await User.findByOrFail('secure_id', userSecureId)
      user.merge({fullName: data.fullName, email: data.email, cpfNumber: data.cpfNumber }, trx).save()
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in update user', originalError: error.message})
    }

    let userFind

    try {
      userFind = await User.query().where('id', user.id).preload('roles')
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in find user', originalError: error.message})
    }

    trx.commit()
    return response.ok({userFind})
  }

  public async destroy({ response, params }: HttpContextContract) {
    const userSecureId = params.id

    try {
      const user = await User.findByOrFail('secure_id', userSecureId)
      await user.delete()

      return response.ok({message: 'Success in delete user'})
    } catch (error) {
      return response.notFound({message: 'User not found', originalError: error.message})
    }
  }
}
