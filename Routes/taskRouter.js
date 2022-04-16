const router = require('express').Router();
const taskController = require('../Controller/taskController');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "This is an API"
    })
})

router.get('/tasks', taskController.fetchTasks)
router.get('/tasks/:id', taskController.findTask)
router.post('/tasks', taskController.createTask)
router.patch('/tasks/:id', taskController.updateTask)
router.patch('/tasks/:id/complete', taskController.markComplete)
router.delete('/tasks/:id', taskController.deleteTask)

module.exports = router;