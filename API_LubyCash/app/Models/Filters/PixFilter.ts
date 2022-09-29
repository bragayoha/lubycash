import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Pix from 'App/Models/Pix'

export default class PixFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Pix, Pix>

  createdAt(value: string){
    this.$query.where('created_at', '>=', `%${value}%`)
  }
}
