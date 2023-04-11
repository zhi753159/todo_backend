import express from 'express'

// Import middlewares
import auth from '../../middlewares/auth'

// Import controllers
import * as todoController from '../../controllers/todo'


const router = express.Router()

router.get('/getMyList', auth, todoController.getMyList)
router.post('/', auth, todoController.addNewTodo)
router.put('/:id', auth, todoController.updateTodo)
router.delete('/:id', auth, todoController.deleteTodo)

export default router