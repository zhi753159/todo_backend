import express from 'express'

// Import middlewares
import auth from '../../middlewares/auth'

// Import controllers
import * as todoController from '../../controllers/todo'


const router = express.Router()
router.use(auth)
router.get('/getMyList', todoController.getMyList)
router.post('/', todoController.addNewTodo)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

export default router