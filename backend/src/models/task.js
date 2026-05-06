const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    status:{
        type:String,
        enum:['pending','doing','finished'],
        default:"pending"
    },
    
},{timestamps:true});

module.exports = mongoose.model('Task',taskSchema);