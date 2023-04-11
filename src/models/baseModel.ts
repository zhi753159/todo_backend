import moment from 'moment'

export default class BaseModel {
    protected visible: string[] = []

    /**
   * JSON serialization control, only show properties in visible array
   *
   * @returns object
   */
  public toJSON() {
    const data: any = {}

    for (const key of this.visible) {
      let property = (this as any)[key]

      if (typeof property !== 'undefined') {
        if (property instanceof Date) {
          property = moment(property).format('YYYY-MM-DD HH:mm:ss')
        }

        data[key] = property
      }
    }

    return data
  }
}