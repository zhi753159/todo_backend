// TODO consider replace dotenv with pure json file
import dotenv from 'dotenv'
import fs from 'fs'

if (!fs.existsSync('.env')) {
    console.error('No .env file exist!')
    process.exit(1)
}
dotenv.config({ path: '.env' })

function convertType(variable: string): any {
    if (variable.match(/(true|false)/)) {
        return variable === 'true'
    }

    if (variable.match(/\d*/)) {
        const value = parseInt(variable, 10)

        return Number.isNaN(value) ? variable : value
    }

    if (variable.match(/\d*.\d+/)) {
        const value = parseFloat(variable)

        return Number.isNaN(value) ? variable : value
    }
}

if (!process.env.APP_SESSION_SECRET) {
    process.exit(1)
}

export default {
    ENVIRONMENT: process.env.NODE_ENV,

    APP_SESSION_SECRET: process.env.APP_SESSION_SECRET,
    APP_PORT: convertType(process.env.APP_PORT || '3000'),
    APP_SALT_ROUND: convertType(process.env.APP_SALT_ROUND || '12'),
    APP_URL_PREFIX: process.env.APP_URL_PREFIX || '/',

    CORS_OPTIONS: {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
        ],
    },
}
