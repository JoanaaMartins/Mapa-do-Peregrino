import { users, posts, tasks } from './data.js';

export function updateDashboardStats() {
  document.getElementById('totalUsers').textContent = users.length;
  document.getElementById('totalPosts').textContent = posts.length;
  document.getElementById('pendingTasks').textContent = tasks.filter(task => !task.completed).length;
}
