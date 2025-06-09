let users = [];
let posts = [];

export function updateDashboardStats(tasks = []) {
  const totalUsersEl = document.getElementById('totalUsers');
  const totalPostsEl = document.getElementById('totalPosts');
  const pendingTasksEl = document.getElementById('pendingTasks');
  
  if (totalUsersEl) totalUsersEl.textContent = users.length;
  if (totalPostsEl) totalPostsEl.textContent = posts.length;
  if (pendingTasksEl) pendingTasksEl.textContent = tasks.filter(task => !task.completed).length;
}

export function setUsersData(usersData) {
  users = usersData;
}

export function setPostsData(postsData) {
  posts = postsData;
}