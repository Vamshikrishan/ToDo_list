let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const modal = document.getElementById("taskModal");
const table = document.getElementById("taskTable");

function openModal(){
modal.style.display="block";
}

function closeModal(){
modal.style.display="none";
clearInputs();
}

function clearInputs(){
document.getElementById("taskInput").value="";
document.getElementById("responsibleInput").value="";
document.getElementById("etaInput").value="";
}

function addTask(){

let task = document.getElementById("taskInput").value;
let responsible = document.getElementById("responsibleInput").value;
let eta = document.getElementById("etaInput").value;

if(task==="") return alert("Enter Task");

tasks.push({
task,
responsible,
eta,
completed:false
});

saveTasks();

closeModal();
}

function renderTasks(){

table.innerHTML="";

tasks.forEach((t,index)=>{

let row=`
<tr>
<td>${index+1}</td>
<td ${t.completed?"style='text-decoration:line-through'":""}>${t.task}</td>
<td>${t.responsible}</td>
<td>${t.eta}</td>
<td>

<span class="action-btn complete" onclick="completeTask(${index})">✔</span>

<span class="action-btn edit" onclick="editTask(${index})">✏</span>

<span class="action-btn delete" onclick="deleteTask(${index})">🗑</span>

</td>
</tr>
`;

table.innerHTML+=row;

});

}

function completeTask(i){
tasks[i].completed=!tasks[i].completed;
saveTasks();
}

function deleteTask(i){
tasks.splice(i,1);
saveTasks();
}

function editTask(i){

document.getElementById("taskInput").value=tasks[i].task;
document.getElementById("responsibleInput").value=tasks[i].responsible;
document.getElementById("etaInput").value=tasks[i].eta;

tasks.splice(i,1);

openModal();
saveTasks();
}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
renderTasks();
}

renderTasks();