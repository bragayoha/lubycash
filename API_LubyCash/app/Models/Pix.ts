import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import {compose} from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import PixFilter from './Filters/PixFilter'
import Client from './Client'

export default class Pix extends compose(BaseModel, Filterable) {
  public static $filter = () => PixFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @column()
  public targetCpf: string

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Client, {
    foreignKey: 'clientId',
  })
  public client: HasOne<typeof Client>

}
