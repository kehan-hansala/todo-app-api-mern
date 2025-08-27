 const Todo = require('../model/TodoScema');
const User = require('../model/UserScema');

const createTodo = async (req, resp) => {
    try {
        const {title, description, dueDate} = req.body;
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({message:'user not found'});
        }
        const todo = new Todo({
            user:selectedUser._id,
            title,
            description,
            dueDate
        });
        await  todo.save();
        resp.status(201).json({todo});
    } catch (e) {
        resp.status(500).json({message: 'Internal Server Error', error: e})
    }
}
const findAllPendingTodos = async (req, resp) => {
    try {
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({message:'user not found'});
        }
        const todos = await Todo.find({user: selectedUser._id, isCompleted: false});
        resp.status(201).json({todos});
    } catch (e) {
        resp.status(500).json({message: 'Internal Server Error', error: e})
    }
}
const findAllCompletedTodos = async (req, resp) => {
    try {
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({message:'user not found'});
        }
        const todos = await Todo.find({user: selectedUser._id, isCompleted: true});
        resp.status(201).json({todos});
    } catch (e) {
        resp.status(500).json({message: 'Internal Server Error', error: e})
    }
}
const findTodoById = async (req, resp) => {
    try {
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({message:'user not found'});
        }

        const todo = await Todo.findOne(
            {_id: req.params.id, user: selectedUser._id});

        if(!todo) return resp.status(404).json({'message':'not found'});

        resp.status(201).json({todo});
    } catch (e) {
        resp.status(500).json({message: 'Internal Server Error', error: e})
    }
}
const updateTodoStatus = async (req, resp) => {
    try {
        const {status}=req.body;
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({message:'user not found'});
        }

        const todo = await Todo.findOneAndUpdate(
            {_id: req.params.id, user: selectedUser._id},
            {isCompleted: status}, {new:true});

        if(!todo) return resp.status(404).json({'message':'not found'});

        resp.status(201).json({todo});
    } catch (e) {
        resp.status(500).json({message: 'Internal Server Error', error: e})
    }
}
const updateTodoContent = async (req, resp) => {
    try {

        const {title, description, dueDate} = req.body;

        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({message:'user not found'});
        }

        const todo = await Todo.findOneAndUpdate(
            {_id: req.params.id, user: selectedUser._id},
            {title, description, dueDate}, {new:true});

        if(!todo) return resp.status(404).json({'message':'not found'});

        resp.status(201).json({todo});
    } catch (e) {
        resp.status(500).json({message: 'Internal Server Error', error: e})
    }
}
// the user must verify here to delete (cant delete others todos)
const deleteTodoById = async (req, resp) => {
    try {
        const selectedUser = await User.findOne({email:req.userEmail});
        if(!selectedUser){
            return resp.status(404).json({message:'user not found'});
        }

        const todo = await Todo.findOneAndDelete(
            {_id: req.params.id, user: selectedUser._id});

        if(!todo) return resp.status(404).json({'message':'not found'});

        resp.status(201).json({'message':'deleted!'});
    } catch (e) {
        resp.status(500).json({message: 'Internal Server Error', error: e})
    }
}
module.exports = {
    createTodo,
    findAllPendingTodos,
    findAllCompletedTodos,
    findTodoById,
    updateTodoStatus,
    deleteTodoById,
    updateTodoContent
}