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

// Rotas publicas
Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('sign-up', 'ClientsController.store' )
  Route.post('forget-password/:id', 'AuthController.forgetPassword')
  Route.post('reset-password', 'AuthController.resetPassword')
}).prefix('v1/api')

// Rotas admin
Route.group(() => {
  Route.resource('admin', 'AdminsController').apiOnly()
  Route.get('client', 'ClientsController.index')
  Route.get('pix/:id', 'PixController.index')
}).prefix('v1/api')
.middleware(['auth', 'is:admin'])

// Rotas cliente
Route.group(() => {
  Route.get('client/info', 'ClientsController.show')
  Route.put('client/update', 'ClientsController.update')
  Route.post('pix', 'PixController.store')
}).prefix('v1/api')
.middleware(['auth', 'is:client'])
