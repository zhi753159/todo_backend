import moment from 'moment'

export default class BaseModel {
    protected visible: string[] = []
    protected visibleRelations: string[] = []

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

    for (const key of this.visibleRelations) {
      if (this.hasOwnProperty(`__${key}__`)) {
        data[key] = (this as any)[`__${key}__`]
      }
    }

    return data
  }

    /**
   * Remove properties name from visible
   *
   * @param properties
   */
  public makeInvisible(properties: string[]) {
    this.visible = this.visible.reduce((result: string[], attr: string): string[] => {
      if (!properties.includes(attr)) {
        result.push(attr)
      }

      return result
    }, [])
  }

  /**
   * Remove relation name to visibleRelation
   *
   * @param properties
   */
  public makeRelationInvisible(properties: string[]) {
    this.visibleRelations = this.visibleRelations.reduce((result: string[], attr: string): string[] => {
      if (!properties.includes(attr)) {
        result.push(attr)
      }

      return result
    }, [])
  }

  /**
   * Append properties name to visible
   *
   * @param properties
   */
  public makeVisible(properties: string[]) {
    properties.forEach((property) => {
      if (!this.visible.includes(property)) {
        this.visible.push(property)
      }
    })
  }

  /**
   * Append relation name to visibleRelation
   *
   * @param properties
   */
  public makeRelationVisible(properties: string[]) {
    properties.forEach((property) => {
      if (!this.visibleRelations.includes(property)) {
        this.visibleRelations.push(property)
      }
    })
  }
}