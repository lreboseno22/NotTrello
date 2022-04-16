const Task = require('../Models/Task')

async function fetchTasks(req, res){
    try {
        const data = await Task.findAll();
        res.json({
            data, 
        })
    } catch(error) {
        res.status(500).json({
            message : error.message
        })
    }
}

async function createTask(req, res){
    try{
        const { name } = req.body
        if(!name){
            return res.status(400).json({
                message: 'The name of the task is required.'
            })
        }
    const todo = await Task.create({ name: name})
    return res.status(201).json({
        data: todo
    })
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

async function deleteTask(req, res){
    const task_id = req.params.id;
    try{
        const todo = await Task.find(task_id)
    
        if(!todo){
            res.status(404).json({
                message: `Could not find todo with id ${task_id}`
            })
        }
       await Task.remove(task_id);
       return res.sendStatus(204)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function findTask(req, res){
    const task_id = req.params.id;
    try{
       const todo = await Task.find(task_id);
       if(!todo){
            return res.status(404).json({
                message: `Could not find todo with the id ${task_id}`
            })
       }
       return res.status(200).json({
           data: todo
       });
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

async function updateTask(req, res){
    try{
        const task_id = req.params.id;
        const  { name } = req.body;
        const result = await Task.find(task_id);
        if(!result){
            return res.status(404).json({
                message: `Could not find todo with id ${task_id}`
            })
        }
        const todo = await Task.update(name, task_id);
        return res.json({
            data: todo
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

async function markComplete(req, res){
    try{
        const task_id = req.params.id;
        const { completed } = req.body;

        const result = await Task.find(task_id);
        if(!result){
            return res.status(404).json({
                message: `Could not find todo with id ${task_id}`
            })
        }

        const todo = await Task.complete(task_id, completed)
        return res.status(204).json({
            data: todo
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    fetchTasks, 
    createTask, 
    deleteTask, 
    findTask, 
    updateTask,
    markComplete
}