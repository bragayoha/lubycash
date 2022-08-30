import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/User'

export default class ClientFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Client, Client>

  status(value: string){
    this.$query.where('status', 'LIKE', `%$${value}%`)
  }
  createdAt(value: string){
    this.$query.where('created_at', 'LIKE', `%$${value}%`)
  }
}
