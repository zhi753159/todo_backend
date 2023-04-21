import fs from 'fs'
import path from 'path'
import schedule from 'node-schedule'
import Job from './Job'

/**
 * Module properties
 */
let initialized = false
const jobs: any = {}

/**
 * Load all jobs from the jobs folder
 *
 * @param jobFilesPath
 */
const init = (jobFilesPath = '') => {
  if (initialized) {
    return
  }

  const filesPath = jobFilesPath || path.join(__dirname, 'jobs')

  fs.readdir(filesPath, (err, files) => {
    if (err) {
      throw err
    }

    const useableFiles = files.filter((file) => {
      return file.match(/(ts|js)$/)
    })

    for (const file of useableFiles) {
      const jobPath = path.join(__dirname, 'jobs', file)
      const fileJob = require(jobPath).default
      const job = new fileJob()
      addJob(job)
    }
  })

  initialized = true
}

/**
 * Add a job to scheduler
 *
 * @param job
 */
const addJob = (job: Job): void => {
  if (!isJobExist(job.getName())) {
    jobs[job.getName()] = schedule.scheduleJob(job.schedule, () => {
      job.handler()
    })

    global.logger.system.info(`Scheduler added a job: ${job.getName()}`)
  }
}

/**
 * Add a collection of job to scheduler
 *
 * @param jobs
 */
const addJobs = (newJobs: Job[]) => {
  for (const job of newJobs) {
    addJob(job)
  }
}

/**
 * Get total number of jobs
 */
const getJobTotal = () => {
  return Object.entries(jobs).length
}

/**
 * Get job name list
 */
const getJobs = () => {
  return Object.keys(jobs)
}

/**
 * Remove job from schedule
 *
 * @param name
 */
const removeJob = (name: string) => {
  if (isJobExist(name)) {
    jobs[name].cancel()
    delete jobs[name]
  }
}

/**
 * Remove jobs from schedule
 *
 * @param names
 */
const removeJobs = (names: string[]) => {
  for (const name of names) {
    removeJob(name)
  }
}

/**
 * Remove all jobs from schedule
 */
const removeAll = () => {
  const jobList = getJobs()
  for (const job of jobList) {
    removeJob(job)
  }
}

/**
 * Check if the job exist
 *
 * @param name
 */
const isJobExist = (name: string): boolean => {
  if (jobs.hasOwnProperty(name)) {
    return true
  }

  return false
}

export default {
  init,
  addJob,
  addJobs,
  getJobTotal,
  getJobs,
  removeJob,
  removeJobs,
  removeAll,
  isJobExist,
}
