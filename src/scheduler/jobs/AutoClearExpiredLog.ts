import Job from '../Job'
import path from 'path'
import fs from 'fs'
import moment from 'moment'
import config from '../../config'

export default class AutoClearExpiredLog implements Job {
  public schedule = '0 0 * * *'
  private name = 'auto-clear-expired-log-folder'

  constructor(name?: string) {
    if (name) {
      this.name = name
    }
  }

  public handler() {
    const directory = 'logs/system'
    const now = moment()

    try {
      const files = fs.readdirSync(directory)
      for (const file of files) {
        const location = path.join(directory, file)
        const fileStatus = fs.statSync(location)
        const creationDate = moment(fileStatus.birthtime)
        if (now.diff(creationDate, 'days') >= config.APP_SYSTEM_LOG_KEEP_DAYS) {
          fs.unlinkSync(location)
        }
      }

    } catch {

    }
    global.logger.system.info('Auto Clear log file  completed.')
    // do nothing
  }

  public getName(): string {
    return this.name
  }
}
