const taskList = document.getElementById("taskList");

loadTasks();

function addTask(){

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");

if(taskInput.value === ""){
alert("Enter a task");
return;
}

const task = {
text: taskInput.value,
date: taskDate.value,
completed:false
};

saveTask(task);

taskInput.value="";
taskDate.value="";

loadTasks();
}

function saveTask(task){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.push(task);

localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

taskList.innerHTML="";

tasks.forEach((task,index)=>{

const li = document.createElement("li");

li.innerHTML=`
<span class="${task.completed ? 'completed' : ''}">
${task.text} - ${task.date}
</span>

<div class="actions">
<button onclick="toggleTask(${index})">✓</button>
<button onclick="editTask(${index})">Edit</button>
<button onclick="deleteTask(${index})">Delete</button>
</div>
`;

taskList.appendChild(li);

});

}

function toggleTask(index){

let tasks = JSON.parse(localStorage.getItem("tasks"));

tasks[index].completed=!tasks[index].completed;

localStorage.setItem("tasks",JSON.stringify(tasks));

loadTasks();
}

function editTask(index){

let tasks = JSON.parse(localStorage.getItem("tasks"));

let newTask = prompt("Edit Task",tasks[index].text);

if(newTask){

tasks[index].text=newTask;

localStorage.setItem("tasks",JSON.stringify(tasks));

loadTasks();

}

}

function deleteTask(index){

let tasks = JSON.parse(localStorage.getItem("tasks"));

tasks.splice(index,1);

localStorage.setItem("tasks",JSON.stringify(tasks));

loadTasks();

}