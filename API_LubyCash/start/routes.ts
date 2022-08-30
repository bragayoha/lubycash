import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('test_db_connection', async ({ response }: HttpContextContract) => {
  await Database.report().then(({ health }) => {
    const { healthy, message } = health

    if (healthy) return response.ok({ message })

    return response.status(500).json({ message })
  })
})

Route.group(() => {
  Route.post('login', 'AuthController.login')
}).prefix('v1/api')

Route.group(() => {
  Route.resource('admin', 'AdminsController')
}).prefix('v1/api').middleware(['auth', 'is:admin'])
