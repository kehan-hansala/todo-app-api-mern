const mongoose = require('mongoose');
const TodoSchema
    = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date
    }
}, {timestamps:true});

module.exports = mongoose.model("Todo", TodoSchema);