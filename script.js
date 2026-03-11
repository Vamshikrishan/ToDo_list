// Simple todo list using localStorage and Bootstrap components
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const tbody = $('#taskTable tbody');
  tbody.empty();
  tasks.forEach((task, i) => {
    const tr = $('<tr>').toggleClass('table-success', task.completed);
    tr.append($('<th>').attr('scope', 'row').text(i + 1));
    tr.append($('<td>').text(task.description));
    tr.append($('<td>').text(task.responsible));
    tr.append($('<td>').text(task.eta));
    const actions = $('<td>').addClass('text-center');
    const completeIcon = $('<i>')
      .addClass('bi')
      .addClass(task.completed ? 'bi-check-circle-fill text-success' : 'bi-check-circle')
      .css('cursor', 'pointer')
      .click(() => toggleComplete(i));
    const editIcon = $('<i>')
      .addClass('bi bi-pencil-square ms-2')
      .css('cursor', 'pointer')
      .click(() => openEditModal(i));
    const deleteIcon = $('<i>')
      .addClass('bi bi-trash ms-2 text-danger')
      .css('cursor', 'pointer')
      .click(() => deleteTask(i));
    actions.append(completeIcon, editIcon, deleteIcon);
    tr.append(actions);
    tbody.append(tr);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(task) {
  tasks.push(task);
  saveTasks();
  renderTasks();
}

function updateTask(index, updated) {
  tasks[index] = updated;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (!confirm('Remove this task?')) return;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function openEditModal(index) {
  const task = tasks[index];
  $('#taskModalLabel').text('Edit Task');
  $('#description').val(task.description);
  $('#responsible').val(task.responsible);
  $('#eta').val(task.eta);
  $('#saveTaskBtn').data('index', index);
  const modal = new bootstrap.Modal(document.getElementById('taskModal'));
  modal.show();
}

$(document).ready(() => {
  renderTasks();

  $('#addTaskBtn').click(() => {
    $('#taskModalLabel').text('Add Task');
    $('#description').val('');
    $('#responsible').val('');
    $('#eta').val('');
    $('#saveTaskBtn').removeData('index');
    const modal = new bootstrap.Modal(document.getElementById('taskModal'));
    modal.show();
  });

  $('#saveTaskBtn').click(() => {
    const description = $('#description').val().trim();
    const responsible = $('#responsible').val().trim();
    const eta = $('#eta').val();
    if (!description) {
      alert('Description required');
      return;
    }
    const index = $('#saveTaskBtn').data('index');
    const task = { description, responsible, eta, completed: false };
    if (index !== undefined) {
      task.completed = tasks[index].completed;
      updateTask(index, task);
    } else {
      addTask(task);
    }
    bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
  });
});