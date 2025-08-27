const express = require('express');
const router = express.Router();
const TodoController = require('../controller/TodoController');
const middleware = require('../middleware/Middleware')

router.post('/create',middleware, TodoController.createTodo);
router.post('/pending',middleware, TodoController.findAllPendingTodos);
router.post('/completed',middleware, TodoController.findAllCompletedTodos);
router.post('/find-by-id/:id',middleware, TodoController.findTodoById);
router.post('/update-status/:id',middleware, TodoController.updateTodoStatus);
router.post('/update-content/:id',middleware, TodoController.updateTodoContent);
router.post('/delete-by-id/:id',middleware, TodoController.deleteTodoById);

module.exports = router;