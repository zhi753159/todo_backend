import express, {
    Request,
    Response,
    NextFunction,
} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'

// Local scripts
import config from './config'
import errorHandler from 'errorhandler'
import Logger from './utils/logger'

import routes from './routes'
import scheduler from './scheduler'

(async ()=> {
    // Enmpty login token & to do list buffer & initialize logger
    global.TokenBuffer = []
    global.ToDoList = []
    global.logger = new Logger()

    // Create Express server
    const app = express()

    // Express configuration
    app.set('port', config.APP_PORT || 3000)
    app.use(helmet())
    app.use(errorHandler())
    app.use(bodyParser.json({ limit: '50mb'}))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}))

    // CORE
    app.use(cors(config.CORS_OPTIONS))

    // Route logging
    if (process.env.NODE_ENV !== 'test') {
        app.use((req: Request, res: Response, next: NextFunction) => {
            global.logger.system.info({
                method: req.method,
                path: req.path,
                params: req.params,
                body: req.body,
                query: req.query,
            })

            res.on('finish', () => {
                global.logger.system.info({
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                })
            })

            next()
        })
    }

    app.disable('x-powered-by')

    // Setup routes
    app.use('/', await routes())

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).json()
    })

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        const errorData = {
            name: err.name,
            message: err.message,
            stack: err.stack,
        }
        global.logger.system.error(errorData)
        if (err.message === 'Validate TypeScript') {
            return res.status(400).json('Input Invalid')
        }

        res.status(500).json(errorData)
    })

    app.listen(app.get('port'), () => {
        global.logger.system.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`)
    })

    // Start scheduler
    scheduler.init()
})()
