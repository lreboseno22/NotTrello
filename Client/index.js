const url = "http://localhost:9003/tasks";
const toDoContainer = document.getElementById('task-todo-list')
const toDoModal = document.getElementById('task-card')

document.getElementById('create-task-form').addEventListener('submit', createTask)

function initalFetchTasks(){
    fetch(url)
    .then((res) => res.json())
    .then((data) => iterateThroughData(data.data));
}
initalFetchTasks()

function iterateThroughData(tasks){
    console.log(tasks)
    tasks.forEach(task => {
      renderTask(task);
    });
}

function renderTask(task){
    // Create list item element
    const listItem = document.createElement('li');
    // Add the task_id to the list item to reference later
    listItem.setAttribute('id', task.task_id);
    // Create Paragraph element
    const description = document.createElement('p');
    // Add the task_id to the description to reference later
    description.setAttribute('id', task.task_id);
    description.innerText = task.name;
    listItem.setAttribute('class', 'p-3 border bg-light');
    // listItem.setAttribute('draggable', 'true');
    // create a delete button El
    const deleteBtn = document.createElement("button");
    // add the todo's id as a data attribute so we can reference later
    deleteBtn.setAttribute('id', task.task_id)
    deleteBtn.setAttribute('class', 'deleteBtn')
    const deleteimg = document.createElement('img')
    deleteimg.src = 'x-lg.svg'
    deleteBtn.append(deleteimg)
    // and and event listener
    listItem.addEventListener('click', onClick);
    deleteBtn.addEventListener("click", deleteTodo);
    // Append description and deleteBtn to the listItem
    listItem.append(description);
    listItem.append(deleteBtn);
    toDoContainer.append(listItem)
}   

function deleteTodo(event) {
    const task_id = event.target.id;
    const deleteurl = `http://localhost:9003/tasks/${task_id}`
    // console.log(task_id)
    const options = {
      method: "DELETE"
    }
    fetch(deleteurl, options)
}

function onClick(event){
    console.log(event.target.id)
}

function createTask(event){
    event.preventDefault()
    const value = event.target.desc.value
    console.log(value)
    const options = {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    mode: "cors",
    body: JSON.stringify({
      name: value
    })
  }
  fetch(url, options)
  .then(res => res.json())
  .then(data => {
    renderTask(data.data)
  })
}
