const express = require('express');
const cors = require('cors');
const taskRouter = require('./Routes/taskRouter');

const app = express();
const PORT = process.env.PORT || 9003;

app.use(express.json())
app.use(taskRouter)
app.use(cors())

app.listen(PORT, () => {
    console.log(`app started on http://localhost:${PORT}`)
})