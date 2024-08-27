document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let tasks = [];
    let filter = 'all';

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);
    filterButtons.forEach(button => button.addEventListener('click', applyFilter));

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskTime = new Date().toLocaleString();
            tasks.push({ text: taskText, completed: false, time: taskTime });
            taskInput.value = '';
            renderTasks();
        }
    }

    function handleTaskActions(e) {
        const li = e.target.closest('li');
        const index = li ? li.dataset.index : null;

        if (index !== null) {
            if (e.target.classList.contains('complete-btn')) {
                tasks[index].completed = !tasks[index].completed;
            } else if (e.target.classList.contains('edit-btn')) {
                editTask(index);
            } else if (e.target.classList.contains('delete-btn')) {
                deleteTask(index);
            }
            renderTasks();
        }
    }

    function editTask(index) {
        const newText = prompt("Edit your task:", tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
    }

    function applyFilter(e) {
        filter = e.target.id.replace('Btn', '').toLowerCase();
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks
            .filter(task => filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed))
            .forEach((task, index) => {
                const li = document.createElement('li');
                li.className = task.completed ? 'completed' : '';
                li.dataset.index = index;

                const taskDetails = document.createElement('div');
                taskDetails.className = 'task-details';

                const taskText = document.createElement('span');
                taskText.className = 'task-text';
                taskText.textContent = task.text;

                const taskTime = document.createElement('span');
                taskTime.className = 'task-time';
                taskTime.textContent = task.time;

                taskDetails.appendChild(taskText);
                taskDetails.appendChild(taskTime);

                const actionButtons = document.createElement('div');
                actionButtons.className = 'action-buttons';

                const completeBtn = document.createElement('button');
                completeBtn.className = 'complete-btn';
                completeBtn.innerHTML = '&#10004;';

                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.innerHTML = '&#9998;'; // Pencil icon for edit

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '&#10006;'; // X icon for delete

                actionButtons.appendChild(completeBtn);
                actionButtons.appendChild(editBtn);
                actionButtons.appendChild(deleteBtn);

                li.appendChild(taskDetails);
                li.appendChild(actionButtons);

                taskList.appendChild(li);
            });
    }
});
function addTask(taskName, taskTime) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');

    li.innerHTML = `
        <span class="task-details">
            <span class="task-name">${taskName}</span>
            <span class="task-time">${taskTime}</span>
        </span>
        <span class="action-buttons">
            <button class="complete-btn">
                <img src="images/completed-icon.png" alt="Complete" />
            </button>
            <button class="edit-btn">
                <img src="images/edit-icon.png" alt="Edit" />
            </button>
            <button class="delete-btn">
                <img src="images/delete-icon.png" alt="Delete" />
            </button>
        </span>
    `;

    taskList.appendChild(li);

    // Add event listeners for the buttons
    li.querySelector('.complete-btn').addEventListener('click', () => completeTask(li));
    li.querySelector('.edit-btn').addEventListener('click', () => editTask(li));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(li));
}

function completeTask(taskElement) {
    taskElement.querySelector('.task-name').classList.toggle('completed');
}
