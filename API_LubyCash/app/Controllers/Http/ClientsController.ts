import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import { sendMail } from 'App/Services/sendMail'
import CreateClientValidator from 'App/Validators/CreateClientValidator'
import UpdateClientValidator from 'App/Validators/UpdateClientValidator'

export default class ClientsController {
  public async index({request, response}: HttpContextContract) {
    const {createdAt, status} = request.qs()
    try {
      let clients
      if(createdAt){
        clients = await Database.from('clients').whereBetween('created_at', [createdAt[0], createdAt[1]])
      }
      else if(status){
        clients = await Database.from('clients').where('status', status)
      }
      return response.ok(clients)

    } catch (error) {
      return response.badRequest({ message: 'Error in list clients', originalError: error.message})
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateClientValidator)

    let user, client

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

      const roleClient = await Role.findBy('name', 'client')

      if (roleClient) await user.related('roles').attach([roleClient.id])

      let status, cBalance

      if (data.averageSalary < 500){
        status = 'disapproved'
        cBalance = 0
      }
      else if (data.averageSalary >= 500){
        status = 'approved'
        cBalance = 200
      }

      client = await Client.create(
        {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          cpfNumber: data.cpfNumber,
          address: data.address,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
          currentBalance: cBalance,
          averageSalary: data.averageSalary,
          status: status,
        }
      )
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in create client', originalError: error.message})
    }

    let clientFind
    try {
      clientFind = await Client.query().where('id', client.id)
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in find client', originalError: error.message})
    }

    try {
      await sendMail(client, 'Sign Up Status!', 'send_status_email')
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in send email', originalError: error.message })
    }

    trx.commit()
    return response.ok({client: clientFind})
  }

  public async show({ response, auth}: HttpContextContract) {
    const clientCpf = auth.user?.cpfNumber

    try {
      const client = await Client.findByOrFail('cpf_number', clientCpf)

      return response.ok({client: client})
    } catch (error) {
      return response.notFound({ message: 'Client not found', originalError: error.message})
    }
  }

  public async update({ request, response, auth}: HttpContextContract){
    const data = await request.validate(UpdateClientValidator)

    let user, client

    const trx = await Database.transaction()

    try {
      const clientCpf = auth.user?.cpfNumber
      client = await Client.findByOrFail('cpf_number', clientCpf)

      client.merge({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        cpfNumber: data.cpfNumber,
        address: data.address,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
      }, trx).save()

      user = await User.findByOrFail('cpfNumber', data.cpfNumber)

      user.merge({ fullName: data.fullName, email: data.email, cpfNumber: data.cpfNumber }, trx).save()
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in update client', originalError: error.message})
    }

    let clientFind

    try {
      clientFind = await Client.query().where('id', client.id)
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in find user', originalError: error.message})
    }

    trx.commit()
    return response.ok({clientFind})
  }
}
