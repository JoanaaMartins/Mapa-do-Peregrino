// codigo inicial dps apagar
 let users = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin', joined: '2023-01-15' },
    { id: 2, username: 'user1', email: 'user1@example.com', role: 'User', joined: '2023-02-20' },
    { id: 3, username: 'user2', email: 'user2@example.com', role: 'User', joined: '2023-03-10' }
];

let posts = [
    {
        id: 1,
        title: "Path Portugués",
        image: "img/5C5E1496-3D26-42D7-B1F8-02D6E51894CF_1_201_a.jpeg",
        duration: "25–30 days",
        distance: "~610 km",
        content: "Detailed information about the Path Portugués..."
    }
];

let tasks = [
    { id: 1, name: "Pack Gear", icon: "bi-bag-check", completed: false },
    { id: 2, name: "Buy Supplies", icon: "bi-cart-check", completed: false },
    { id: 3, name: "Plan Route", icon: "bi-gear", completed: true }
];


document.addEventListener('DOMContentLoaded', function() {

    loadUsers();
    loadPosts();
    loadTasks();
    updateDashboardStats();

    document.getElementById('savePostBtn').addEventListener('click', savePost);
    document.getElementById('saveTaskBtn').addEventListener('click', saveTask);
    document.getElementById('updatePostBtn').addEventListener('click', updatePost);
});



function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.joined}</td>
            <td>
                <button class="btn btn-sm btn-danger delete-user" data-id="${user.id}">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-user').forEach(button => {
        button.addEventListener('click', function() {
            const userId = parseInt(this.getAttribute('data-id'));
            deleteUser(userId);
        });
    });
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== userId);
        loadUsers();
        updateDashboardStats();
    }
}

function loadPosts() {
    const postsGrid = document.getElementById('postsGrid');
    postsGrid.innerHTML = '';
    
    posts.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-lg-6 col-sm-6 mb-4';
        col.innerHTML = `
            <div class="single_product_item position-relative border rounded p-3 shadow-sm">
                <div class="admin-actions position-absolute top-0 end-0 p-2">
                    <button class="btn btn-sm btn-primary edit-post me-1" data-id="${post.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-post" data-id="${post.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <img src="${post.image}" alt="${post.title}" class="img-fluid rounded mb-3">
                <h3><a href="#">${post.title}</a></h3>
                <p>Duration: ${post.duration} • Distance: ${post.distance}</p>
                <p class="text-muted">${post.content.substring(0, 100)}...</p>
            </div>
        `;
        postsGrid.appendChild(col);
    });

    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-post').forEach(button => {
        button.addEventListener('click', function() {
            const postId = parseInt(this.getAttribute('data-id'));
            editPost(postId);
        });
    });

    document.querySelectorAll('.delete-post').forEach(button => {
        button.addEventListener('click', function() {
            const postId = parseInt(this.getAttribute('data-id'));
            deletePost(postId);
        });
    });
}

function savePost() {
    const title = document.getElementById('postTitle').value;
    const image = document.getElementById('postImage').value;
    const duration = document.getElementById('postDuration').value;
    const distance = document.getElementById('postDistance').value;
    const content = document.getElementById('postContent').value;
    
    const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title,
        image,
        duration,
        distance,
        content
    };
    
    posts.push(newPost);
    loadPosts();
    updateDashboardStats();
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('createPostModal'));
    modal.hide();
    document.getElementById('postForm').reset();
}

function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        document.getElementById('editPostId').value = post.id;
        document.getElementById('editPostTitle').value = post.title;
        document.getElementById('editPostImage').value = post.image;
        document.getElementById('editPostDuration').value = post.duration;
        document.getElementById('editPostDistance').value = post.distance;
        document.getElementById('editPostContent').value = post.content;
        
        const modal = new bootstrap.Modal(document.getElementById('editPostModal'));
        modal.show();
    }
}

function updatePost() {
    const postId = parseInt(document.getElementById('editPostId').value);
    const title = document.getElementById('editPostTitle').value;
    const image = document.getElementById('editPostImage').value;
    const duration = document.getElementById('editPostDuration').value;
    const distance = document.getElementById('editPostDistance').value;
    const content = document.getElementById('editPostContent').value;
    
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = {
            id: postId,
            title,
            image,
            duration,
            distance,
            content
        };
        
        loadPosts();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editPostModal'));
        modal.hide();
    }
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(post => post.id !== postId);
        loadPosts();
        updateDashboardStats();
    }
}

function loadTasks() {
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

function saveTask() {
    const name = document.getElementById('taskName').value;
    const icon = document.getElementById('taskIcon').value;
    
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        name,
        icon,
        completed: false
    };
    
    tasks.push(newTask);
    loadTasks();
    updateDashboardStats();
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
    modal.hide();
    document.getElementById('taskForm').reset();
}

function toggleTaskCompletion(taskId, completed) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        updateDashboardStats();
    }
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        // In a real app, you would open a modal to edit the task
        const newName = prompt("Edit task name:", task.name);
        if (newName !== null) {
            task.name = newName;
            loadTasks();
        }
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        loadTasks();
        updateDashboardStats();
    }
}