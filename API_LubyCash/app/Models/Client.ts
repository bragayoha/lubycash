import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import {compose} from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import {v4 as uuidv4} from 'uuid'
import ClientFilter from '../Models/Filters/ClientFilter'
import Pix from './Pix'


export default class Client extends compose(BaseModel, Filterable) {
  public static $filter = () => ClientFilter

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public secureId: uuidv4

  @column()
  public fullName: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public cpfNumber: string

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public zipcode: string

  @column()
  public currentBalance: number

  @column()
  public averageSalary: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Pix)
  public pix: HasMany<typeof Pix>

  @beforeCreate()
  public static assignUuid(client: Client) {
    client.secureId = uuidv4()
  }
}
