import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import {v4 as uuidv4} from 'uuid'
import Role from './Role'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public secureId: uuidv4

  @column({serializeAs: null})
  public rememberMeToken?: string

  @column()
  public fullName: string

  @column()
  public email: string

  @column()
  public cpfNumber: string

  @column({ serializeAs: null})
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Role, {
    pivotTable: 'user_roles',
  })
  public roles: ManyToMany<typeof Role>

  @beforeSave()
  public static async hashPassword(user: User) {
    if(user.$dirty.password)
      user.password = await Hash.make(user.password)
  }

  @beforeCreate()
  public static assignUuid(user: User) {
    user.secureId = uuidv4()
  }
}
