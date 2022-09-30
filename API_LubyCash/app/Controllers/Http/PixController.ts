import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import Pix from 'App/Models/Pix'
import PixValidator from 'App/Validators/PixValidator'

export default class PixController {
  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(PixValidator)

    let pix, sourceClient, targetClient
    const trx = await Database.transaction()

    try{
      sourceClient = await Client.findByOrFail('cpf_number', auth.user?.cpfNumber)
      targetClient = await Client.findByOrFail('cpf_number', data.targetCpf)
    }
    catch(err){
      return response.badRequest({ message: 'Error in find client', originalError: err.message})
    }

    if(sourceClient.currentBalance < data.value) return response.badRequest({ message: 'Balance out of range'})
    if(targetClient.status !== 'approved') return response.badRequest({ message: `Client ${targetClient.fullName} is not approved`})

    try {
      pix = await Pix.create(
        {
          clientId: sourceClient.id,
          targetCpf: data.targetCpf,
          value: data.value
        }, trx
      )

      sourceClient.merge({
        currentBalance: sourceClient.currentBalance - data.value
      }, trx).save()

      targetClient.merge({
        currentBalance: targetClient.currentBalance + data.value
      }, trx).save()
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in complete transaction', originalError: error.message})
    }

    let pixFind
    try {
      pixFind = await Pix.query().where('id', pix.id)
    } catch (error) {
      trx.rollback()
      return response.badRequest({ message: 'Error in find transaction', originalError: error.message})
    }

    trx.commit()
    return response.ok({pix: pixFind})
  }

  public async index({request, response, params}: HttpContextContract) {
    const {createdAt} = request.qs()
    const client = await Client.findByOrFail('cpf_number', params.id)

    if(client.status !== 'approved') return response.badRequest({message: `Client ${client.fullName} is not approved`})

    try {
      let sourcePix
      let targetPix

      if(createdAt){
        sourcePix = await Database.from('pixes').where('client_id', client.id).andWhereBetween('created_at', [createdAt[0], createdAt[1]])
        targetPix = await Database.from('pixes').where('target_cpf', client.cpfNumber).andWhereBetween('created_at', [createdAt[0], createdAt[1]])
      }else{
        sourcePix = await Pix.query().where('client_id', client.id).filter(request.qs()).exec()
        targetPix = await Pix.query().where('target_cpf', client.cpfNumber).filter(request.qs()).exec()
      }

      return response.ok({source: sourcePix, target: targetPix})
    } catch (error) {
      return response.badRequest({ message: 'Error in list transactions', originalError: error.message})
    }
  }

}
