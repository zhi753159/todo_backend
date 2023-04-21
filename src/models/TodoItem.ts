import BaseModel from "./BaseModel"

export default class TodoItem extends BaseModel {

  public id: number
  public title: string
  public description: string
  public startTime: Date
  public userId: number
  protected visible: string[] = [
    'id',
    'title',
    'description',
    'startTime'
  ]

  constructor(id: number, title: string, description: string, startTime: Date, userId: number) {
    super()
    this.id = id
    this.title = title
    this.description = description
    this.startTime = startTime
    this.userId = userId
  }

    /**
   * add item to global list
   *
   * 
   */
  public addToList() {
    const check = global.ToDoList.find(exsit => exsit.id === this.id)
    if (check) {
        return false
    }

    global.ToDoList.push(this)
    return true
  }

  /**
   * remove item from global list
   *
   * 
   */
  public removeFromList() {
    const index = global.ToDoList.findIndex(exsit => exsit.id === this.id)
    if (index === -1) {
        return false
    }

    global.ToDoList.splice(index, 1)
    return true
  }

  /**
   * update detail of item from global list
   *
   * 
   */
  public saveUpdate() {
    const index = global.ToDoList.findIndex(exsit => exsit.id === this.id)
    if (index === -1) {
        return false
    }

    global.ToDoList[index] = this
    return true
  }
  
}
