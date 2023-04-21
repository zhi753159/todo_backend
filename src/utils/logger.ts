import path from 'path'
import fs from 'fs'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, colorize, printf } = winston.format

export default class Logger {
    public system: winston.Logger

    constructor () {
        // Create log folder if not exist
        if (!fs.existsSync('logs')){
            fs.mkdirSync('logs')
        }
        if (!fs.existsSync('logs/system')){
            fs.mkdirSync('logs/system')
        }

        const timestampFormatOptions = { format: 'YYYY-MM-DD HH:mm:ss' }
        const fileFormatOptions = combine(
            timestamp(timestampFormatOptions),
            printf((info: any) => {
                return JSON.stringify({
                    time: info.timestamp,
                    level: info.level,
                    message: info.message,
                })
            }),
        )

        const dailyRotateFileOptions = {
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '30d',
        }

        this.system = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: 'info',
                    format: combine(
                        timestamp(timestampFormatOptions),
                        colorize(),
                        printf((info: any) => {
                            return `${info.timestamp} - ${info.level} : ${JSON.stringify(info.message)}`
                        }),
                    ),
                }),
                new DailyRotateFile(Object.assign({}, {
                    filename: path.join('logs/system', 'error-%DATE%.log'),
                    level: 'error',
                    format: fileFormatOptions,
                }, dailyRotateFileOptions)),
                new DailyRotateFile(Object.assign({}, {
                    filename: path.join('logs/system', 'info-%DATE%.log'),
                    level: 'info',
                    format: fileFormatOptions,
                }, dailyRotateFileOptions)),
            ],
        })
    }

}