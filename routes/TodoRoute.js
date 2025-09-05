const express = require('express');
const router = express.Router();
const TodoController = require('../controller/TodoController');
const middleware = require('../middleware/Middleware')

router.post('/create',middleware, TodoController.createTodo);
router.get('/pending',middleware, TodoController.findAllPendingTodos);
router.get('/all',middleware, TodoController.findAllTodos);
router.get('/completed',middleware, TodoController.findAllCompletedTodos);
router.get('/find-by-id/:id',middleware, TodoController.findTodoById);
router.put('/update-status/:id',middleware, TodoController.updateTodoStatus);
router.put('/update-content/:id',middleware, TodoController.updateTodoContent);
router.delete('/delete-by-id/:id',middleware, TodoController.deleteTodoById);

module.exports = router;