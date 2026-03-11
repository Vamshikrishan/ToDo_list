let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){
taskList.innerHTML="";

tasks.forEach((task,index)=>{

let li=document.createElement("li");

let span=document.createElement("span");
span.textContent=task.text;

if(task.completed){
span.classList.add("completed");
}

span.onclick=function(){
task.completed=!task.completed;
saveTasks();
};

let delBtn=document.createElement("button");
delBtn.textContent="Delete";
delBtn.className="delete-btn";

delBtn.onclick=function(){
tasks.splice(index,1);
saveTasks();
};

li.appendChild(span);
li.appendChild(delBtn);

taskList.appendChild(li);

});

taskCount.textContent=tasks.length;
}

function addTask(){

let text=taskInput.value.trim();

if(text===""){
alert("Please enter a task");
return;
}

tasks.push({
text:text,
completed:false
});

taskInput.value="";

saveTasks();

}

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));
renderTasks();

}

renderTasks();