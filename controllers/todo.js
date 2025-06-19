
//////////////////////// todo user ////////////////////
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const container = document.getElementById('tasksContainer');
    container.innerHTML = '';
    
    tasks.forEach(task => {
        const col = document.createElement('div');
        col.className = `col-lg-3 col-sm-6 mb-4 ${task.completed ? 'completed-task' : ''}`;
        col.innerHTML = `
            <div class="single_feature_part text-center d-flex flex-column justify-content-between p-4 border rounded shadow-sm position-relative task-card">
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
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskId = parseInt(this.id.replace('task', ''));
            toggleTaskCompletion(taskId, this.checked);
        });
    });

    updateProgressBar();
}

function toggleTaskCompletion(taskId, completed) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateProgressBar();
    }
}

function updateProgressBar() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const progressBar = document.getElementById('progressBar');
    
    if (tasks.length === 0) {
        progressBar.style.width = '0%';
        progressBar.textContent = '0%'; 
        progressBar.style.backgroundColor = '#6B8981';
        return;
    }

    const completedCount = tasks.filter(task => task.completed).length;
    const percentage = Math.round((completedCount / tasks.length) * 100);
    
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`; 
    progressBar.style.backgroundColor = '#6B8981';

    const notified50 = localStorage.getItem('notified50') === 'true';
    const notified100 = localStorage.getItem('notified100') === 'true';

    if (percentage >= 50 && !notified50) {
        showSuccessToast('Completou 50% da sua To-do List! Agora tem 5% desconto num albergue à sua escolha.');
        localStorage.setItem('notified50', 'true');
    }
    if (percentage === 100 && !notified100) {
        showSuccessToast('Completou 100% da sua To-do List! Agora tem 10% desconto num albergue à sua escolha. (Desconto não acumulável com outras promoções)');
        localStorage.setItem('notified100', 'true');
    }

}