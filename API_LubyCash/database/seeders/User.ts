import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    const searchKeyAdmin = { email: 'admin@example.com' }

    const userAdmin = await User.updateOrCreate(searchKeyAdmin, {
      fullName: 'Roberto Administrator',
      cpfNumber: '000.000.000-01',
      email: 'admin@example.com',
      password: 'test123',
    })

    const searchKeyClient = { email: 'client@example.com' }

    const userClient = await User.updateOrCreate(searchKeyClient, {
      fullName: 'Manoel Client',
      cpfNumber: '000.000.000-02',
      email: 'client@example.com',
      password: 'test123',
    })

    const roleAdmin = await Role.findBy('name', 'admin')
    const roleClient = await Role.findBy('name', 'client')

    if(roleAdmin) await userAdmin.related('roles').attach([roleAdmin.id])
    if(roleClient) await userClient.related('roles').attach([roleClient.id])
  }
}
