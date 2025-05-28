import { loadUsers } from './users.js';
import { loadPosts, savePost, updatePost } from './posts.js';
import { loadTasks, saveTask } from './tasks.js';
import { updateDashboardStats } from './dashboard.js';

document.addEventListener('DOMContentLoaded', function () {
  loadUsers();
  loadPosts();
  loadTasks();
  updateDashboardStats(); 


  document.getElementById('savePostBtn').addEventListener('click', savePost);
  document.getElementById('saveTaskBtn').addEventListener('click', saveTask);
  document.getElementById('updatePostBtn').addEventListener('click', updatePost);
});
