import express from 'express'
import cors from 'cors'
import config from '../config'
import auth from './modules/auth'
import todo from './modules/todo'

export default async () => {
  const router = express.Router()

// Enable pre-flight
  router.options('*', cors(config.CORS_OPTIONS))

// Routes
  router.get(config.APP_URL_PREFIX, (req: express.Request, res: express.Response) => {
    res.json({ success: true , version: '0.0.1'})
  })
  router.use(config.APP_URL_PREFIX + 'auth', auth)
  router.use(config.APP_URL_PREFIX + 'todo', todo)

  return router
}
