import config from '../config'
import { Request, Response, NextFunction } from 'express'
import { Type, validate, RegEx } from 'validate-typescript'
import TodoItem from '../models/todoItem'

/**
 * GET /getmylist
 * Get current use to do list
 */
export const getMyList = async (req: Request, res: Response, next: NextFunction) => {
  try {
  
    const user = req.user
    const todoList = global.ToDoList.filter(search => search.userId === user.id)
  
    res.status(400).json({
      todoList,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * Post /
 * Add new item into to do list
 */
export const addNewTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate({
      title: Type(String),
      description: Type(String),
      startTime: RegEx(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/)
    }, req.body)
    
    const payload = req.body
    const user = req.user
    const id = global.ToDoList.length
    const newItem = new TodoItem(
      id,
      payload.title,
      payload.description,
      new Date(payload.startTime),
      user.id,
    )

    newItem.addToList()
  
    res.status(200).json({
      newItem,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /:id
 * Save update of exsiting item into to do list
 */
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate({
      title: Type(String),
      description: Type(String),
      startTime: RegEx(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/)
    }, req.body)

    const id = parseInt(req.params.id, 10)
    const item = global.ToDoList.find(search => search.id === id)
    if (!item) {
      return res.status(204).json('To Do item not found.')
    }

    const payload = req.body
    item.title = payload.title
    item.description = payload.description
    item.startTime = new Date(payload.startTime)
    item.saveUpdate()
  
    res.status(200).json({
      item,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /:id
 * Delete exsiting item into to do list
 */
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const id = parseInt(req.params.id, 10)
    const item = global.ToDoList.find(search => search.id === id)
    if (!item) {
      return res.status(204).json('To Do item not found.')
    }
    item.removeFromList()
  
    res.status(200).json('Deleted')
  } catch (err) {
    next(err)
  }
}