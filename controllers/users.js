import { users as initialUsers } from '../Models/data.js';
import { updateDashboardStats } from './dashboard.js';

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
}

export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export function loadUsers() {
    const users = getUsers();
    const tbody = document.getElementById('usersTableBody');
    
    if (tbody) {
        tbody.innerHTML = ''; 

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-sm btn-danger delete-user" data-id="${user.id}">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        document.querySelectorAll('.delete-user').forEach(button => {
            button.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-id'));
                deleteUser(userId);
            });
        });
    }
    
    return users;
}

export function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const users = getUsers().filter(user => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers(); 
        updateDashboardStats();
    }
}