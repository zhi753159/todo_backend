import nodeSchedule from 'node-schedule'

export default interface Job {
  schedule: Date | string | number
  | nodeSchedule.RecurrenceRule
  | nodeSchedule.RecurrenceSpecDateRange
  | nodeSchedule.RecurrenceSpecObjLit

  handler(): void
  getName(): string
}
