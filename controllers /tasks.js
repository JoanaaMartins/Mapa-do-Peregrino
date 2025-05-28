
import { updateDashboardStats } from './dashboard.js';

// Get tasks from localStorage or initialize with empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Helper function to save tasks to localStorage
function saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasks() {
    // Load tasks from localStorage first
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const container = document.getElementById('tasksContainer');
    container.innerHTML = '';
    
    tasks.forEach(task => {
        const col = document.createElement('div');
        col.className = `col-lg-3 col-sm-6 mb-4 ${task.completed ? 'completed-task' : ''}`;
        col.innerHTML = `
            <div class="single_feature_part text-center d-flex flex-column justify-content-between p-4 border rounded shadow-sm position-relative task-card">
                <div class="admin-actions position-absolute top-0 end-0 p-2">
                    <button class="btn btn-sm btn-primary edit-task me-1" data-id="${task.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-task" data-id="${task.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <i class="bi ${task.icon}" style="font-size: 3rem; color: #6B8981;"></i>
                <h4 class="mt-3">${task.name}</h4>
                <div class="form-check mt-3">
                    <input class="form-check-input big-checkbox task-checkbox" type="checkbox" 
                           id="task${task.id}" ${task.completed ? 'checked' : ''}>
                    <label class="form-check-label fw-bold" for="task${task.id}">Mark as done</label>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    // Add event listeners to checkboxes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskId = parseInt(this.id.replace('task', ''));
            toggleTaskCompletion(taskId, this.checked);
        });
    });

    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-task').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = parseInt(this.getAttribute('data-id'));
            editTask(taskId);
        });
    });

    document.querySelectorAll('.delete-task').forEach(button => {
        button.addEventListener('click', function() {
            const taskId = parseInt(this.getAttribute('data-id'));
            deleteTask(taskId);
        });
    }); 
}

export function saveTask() {
    const name = document.getElementById('taskName').value;
    const icon = document.getElementById('taskIcon').value;
    
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        name,
        icon,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasksToStorage(); // Save to localStorage
    loadTasks();
    updateDashboardStats();
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
    modal.hide();
    document.getElementById('taskForm').reset();
}

export function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newName = prompt("Edit task name:", task.name);
        if (newName !== null) {
            task.name = newName;
            saveTasksToStorage(); // Save to localStorage
            loadTasks();
        }
    }
}

export function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasksToStorage(); // Save to localStorage
        loadTasks();
        updateDashboardStats();
    }
}

export function toggleTaskCompletion(taskId, completed) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        saveTasksToStorage(); // Save to localStorage
        updateDashboardStats();
    }
}