import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client'

export default class ClientFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Client, Client>

  status(value: string){
    this.$query.where('status', '=', `%${value}%`)
  }

  createdAt(value1: string, value2: string){
    this.$query.where('created_at', 'BETWEEN', [`%${value1}%`, `%${value2}%`])
  }
}
