import * as express from 'express'
import { useExpressServer } from 'routing-controllers'
import { controllers } from '../controllers'
import * as cors from 'cors'
import * as helmet from 'helmet'

export class Express {
  static app: express.Application
  static initialize() {
    if (!this.app) {
      this.app = express()

      this.app.use(helmet())
      this.app.use(express.json())
      this.app.use(express.urlencoded({ extended: true }))
      this.app.use(cors())

      useExpressServer(this.app, { controllers: controllers })
    }
    return this.app
  }
}
