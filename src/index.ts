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

import routes from './routes'

(async ()=> {
    // Enmpty login token & to do list buffer
    global.TokenBuffer = []
    global.ToDoList = []

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
            console.log({
                method: req.method,
                path: req.path,
                params: req.params,
                body: req.body,
            })

            res.on('finish', () => {
                console.log({
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
        if (err.message === 'Validate TypeScript') {
            return res.status(400).json('Input Invalid')
        }
        const errorData = {
            name: err.name,
            message: err.message,
            stack: err.stack,
        }

        res.status(500).json(errorData)
    })

    app.listen(app.get('port'), () => {
        console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`)
    })
})()
