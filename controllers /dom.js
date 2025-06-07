import { loadUsers } from './users.js';
import { loadPosts, savePost, updatePost, editPost, deletePost, initializePosts } from './posts.js';
import { loadTasks, saveTask, getTasks } from './tasks.js';
import { updateDashboardStats, setUsersData, setPostsData } from './dashboard.js';

document.addEventListener('DOMContentLoaded', function () {
  // Initialize data
  initializePosts();
  loadUsers();
  loadTasks();
  
  // Set data for dashboard
  setUsersData(JSON.parse(localStorage.getItem('users')) || []);
  setPostsData(JSON.parse(localStorage.getItem('posts')) || []);
  updateDashboardStats(getTasks());

  // Event listeners
  document.getElementById('savePostBtn')?.addEventListener('click', savePost);
  document.getElementById('saveTaskBtn')?.addEventListener('click', function(e) {
    saveTask(e);
  });
  document.getElementById('updatePostBtn')?.addEventListener('click', updatePost);

  // Delegated event listeners
  document.addEventListener('click', function(event) {
    if (event.target.closest('.edit-post')) {
      const button = event.target.closest('.edit-post');
      const postId = parseInt(button.getAttribute('data-id'));
      editPost(postId);
    }
    if (event.target.closest('.delete-post')) {
      const button = event.target.closest('.delete-post');
      const postId = parseInt(button.getAttribute('data-id'));
      deletePost(postId);
    }
  });

  // Itinerary handlers
  const createPostModal = document.getElementById('createPostModal');
  if (createPostModal) {
    createPostModal.addEventListener('shown.bs.modal', function() {
      document.getElementById('addDayBtn')?.addEventListener('click', function() {
        const itineraryContainer = document.getElementById('itineraryContainer');
        const dayCount = document.querySelectorAll('.itinerary-day').length;
        const newDay = document.createElement('div');
        newDay.className = 'itinerary-day mb-3 p-3 border rounded';
        newDay.innerHTML = `
          <div class="row">
            <div class="col-md-2">
              <label>Day</label>
              <input type="number" class="form-control day-number" min="1" value="${dayCount + 1}">
            </div>
            <div class="col-md-4">
              <label>From</label>
              <input type="text" class="form-control from-location" placeholder="Starting point">
            </div>
            <div class="col-md-4">
              <label>To</label>
              <input type="text" class="form-control to-location" placeholder="Destination">
            </div>
            <div class="col-md-2">
              <label>Distance (km)</label>
              <input type="number" class="form-control distance" step="0.1" placeholder="km">
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <label>Suggested Albergue</label>
              <input type="text" class="form-control albergue" placeholder="Recommended accommodation">
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-danger mt-2 remove-day">Remove</button>
        `;
        itineraryContainer.appendChild(newDay);
        
        newDay.querySelector('.remove-day').addEventListener('click', function() {
          newDay.remove();
        });
      });

      document.querySelectorAll('.remove-day').forEach(button => {
        button.addEventListener('click', function() {
          this.closest('.itinerary-day').remove();
        });
      });
    });
  }
});