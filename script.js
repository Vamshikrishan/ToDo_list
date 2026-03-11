let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const modal = document.getElementById("taskModal");
const table = document.getElementById("taskTable");

function openModal(){
modal.style.display="block";
}

function closeModal(){
modal.style.display="none";
clearFields();
}

function clearFields(){
taskInput.value="";
responsibleInput.value="";
etaInput.value="";
}

function addTask(){

let task = taskInput.value.trim();
let responsible = responsibleInput.value.trim();
let eta = etaInput.value;

if(task===""){
alert("Enter task");
return;
}

tasks.push({
task,
responsible,
eta,
status:"Pending"
});

saveTasks();
closeModal();

}

function renderTasks(){

table.innerHTML="";

tasks.forEach((t,i)=>{

let statusClass = t.status=="Completed" ? "completed" : "pending";

table.innerHTML += `
<tr>

<td>${i+1}</td>

<td>${t.task}</td>

<td>${t.responsible}</td>

<td>${t.eta}</td>

<td>
<span class="status ${statusClass}">
${t.status}
</span>
</td>

<td>

<span class="action complete" onclick="completeTask(${i})">✔</span>

<span class="action edit" onclick="editTask(${i})">✎</span>

<span class="action delete" onclick="deleteTask(${i})">🗑</span>

</td>

</tr>
`;

});

}

function completeTask(i){
tasks[i].status="Completed";
saveTasks();
}

function deleteTask(i){
tasks.splice(i,1);
saveTasks();
}

function editTask(i){

taskInput.value=tasks[i].task;
responsibleInput.value=tasks[i].responsible;
etaInput.value=tasks[i].eta;

tasks.splice(i,1);

openModal();
saveTasks();
}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
renderTasks();
}

renderTasks();