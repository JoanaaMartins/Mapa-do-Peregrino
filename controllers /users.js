import { users } from '../Models/data.js';
import { updateDashboardStats } from './dashboard.js';

// users.js - admin 

export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export function loadUsers() {
const users = getUsers(); // Get users from localStorage instead of imported data
const tbody = document.getElementById('usersTableBody');
tbody.innerHTML = '';

users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${user.id}</td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td><button class="btn btn-sm btn-danger delete-user" data-id="${user.id}"><i class="bi bi-trash"></i> Delete</button></td>
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

export function deleteUser(userId) {
if (confirm('Are you sure you want to delete this user?')) {
    const users = getUsers();
    const updatedUsers = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadUsers();
    updateDashboardStats();
}
}
