let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const table = document.getElementById("taskTable");
const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");

function openModal(){

document.getElementById("taskModal").style.display="block";

/* clear previous values */

document.getElementById("taskInput").value="";
document.getElementById("responsibleInput").value="";
document.getElementById("etaInput").value="";
}

function closeModal(){
document.getElementById("taskModal").style.display="none";
}

function addTask(){

let task = taskInput.value;
let responsible = responsibleInput.value;
let eta = etaInput.value;

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

let search = searchInput.value.toLowerCase();
let filter = filterStatus.value;

table.innerHTML="";

let completed=0;

tasks.forEach((t,i)=>{

if(!t.task.toLowerCase().includes(search)) return;

if(filter!="all" && t.status!=filter) return;

if(t.status=="Completed") completed++;

let statusClass = t.status=="Completed" ? "completed":"pending";

table.innerHTML += `
<tr>
<td>${i+1}</td>
<td>${t.task}</td>
<td>${t.responsible}</td>
<td>${t.eta}</td>
<td><span class="status ${statusClass}">${t.status}</span></td>
<td>
<span class="action" onclick="completeTask(${i})">✔</span>
<span class="action" onclick="deleteTask(${i})">🗑</span>
</td>
</tr>
`;

});

updateProgress();
}

function completeTask(i){
tasks[i].status="Completed";
saveTasks();
}

function deleteTask(i){
tasks.splice(i,1);
saveTasks();
}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
renderTasks();
}

function updateProgress(){

let completed = tasks.filter(t=>t.status=="Completed").length;
let percent = tasks.length ? (completed/tasks.length)*100 : 0;

document.getElementById("progress").style.width = percent+"%";
}

function toggleDarkMode(){

document.body.classList.toggle("dark");

/* Save mode in browser */

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
}else{
localStorage.setItem("theme","light");
}

}

function exportCSV(){

let csv="Task,Responsible,ETA,Status\n";

tasks.forEach(t=>{
csv+=`${t.task},${t.responsible},${t.eta},${t.status}\n`;
});

let blob=new Blob([csv]);
let a=document.createElement("a");

a.href=URL.createObjectURL(blob);
a.download="tasks.csv";
a.click();

}

searchInput.addEventListener("input",renderTasks);
filterStatus.addEventListener("change",renderTasks);

renderTasks();
/********** Load theme on page load **********/
/* load saved theme */

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark");
}