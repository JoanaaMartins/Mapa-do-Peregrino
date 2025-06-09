import { posts as initialPosts } from '../Models/data.js';
import { updateDashboardStats } from './dashboard.js';

// Initialize posts from localStorage or fall back to initialPosts
let posts = JSON.parse(localStorage.getItem('posts')) || initialPosts;

// Save posts to localStorage
function savePostsToStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to handle itinerary day management
function setupItineraryHandlers() {
    // Add day button
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
        
        // Add event listener to the new remove button
        newDay.querySelector('.remove-day').addEventListener('click', function() {
            newDay.remove();
        });
    });

    // Remove day buttons (for existing days when modal opens)
    document.querySelectorAll('.remove-day').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.itinerary-day').remove();
        });
    });
}

export function loadPosts() {
    const postsGrid = document.getElementById('postsGrid');
    postsGrid.innerHTML = '';
    
    // Get current posts (in case they were updated)
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    
    currentPosts.forEach(post => {
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

export function savePost() {
    // Basic info
    const title = document.getElementById('postTitle').value;
    const slug = document.getElementById('postSlug').value;
    
    // Images
    const image = document.getElementById('postImage').value;
    const image2 = document.getElementById('postImage2').value;
    
    // Stats
    const duration = document.getElementById('postDuration').value;
    const distance = document.getElementById('postDistance').value;
    const difficulty = document.getElementById('postDifficulty').value;
    
    // Description
    const content = document.getElementById('postContent').value;
    
    // Itinerary
    const itineraryDays = [];
    document.querySelectorAll('.itinerary-day').forEach(dayElement => {
        const day = {
            day: dayElement.querySelector('.day-number').value,
            from: dayElement.querySelector('.from-location').value,
            to: dayElement.querySelector('.to-location').value,
            distance: dayElement.querySelector('.distance').value,
            albergue: dayElement.querySelector('.albergue').value
        };
        itineraryDays.push(day);
    });
    
    // Get current posts
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    
    const newPost = {
        id: currentPosts.length > 0 ? Math.max(...currentPosts.map(p => p.id)) + 1 : 1,
        title,
        slug,
        image,
        image2: image2 || null,
        duration,
        distance,
        difficulty,
        content,
        itinerary: itineraryDays
    };
    
    currentPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(currentPosts));
    posts = currentPosts; // Update the in-memory posts array
    
    loadPosts();
    updateDashboardStats();
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('createPostModal'));
    modal.hide();
    document.getElementById('postForm').reset();
    
    // Reset itinerary container to just one day
    const itineraryContainer = document.getElementById('itineraryContainer');
    itineraryContainer.innerHTML = `
        <div class="itinerary-day mb-3 p-3 border rounded">
            <div class="row">
                <div class="col-md-2">
                    <label>Day</label>
                    <input type="number" class="form-control day-number" min="1" value="1">
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
        </div>
    `;
    
    // Re-setup handlers for the new default day
    setupItineraryHandlers();
}

export function updatePost() {
    const postId = parseInt(document.getElementById('editPostId').value);
    const title = document.getElementById('editPostTitle').value;
    const slug = document.getElementById('editPostSlug')?.value || '';
    const image = document.getElementById('editPostImage').value;
    const image2 = document.getElementById('editPostImage2')?.value || '';
    const duration = document.getElementById('editPostDuration').value;
    const distance = document.getElementById('editPostDistance').value;
    const difficulty = document.getElementById('editPostDifficulty')?.value || 'Moderate';
    const content = document.getElementById('editPostContent').value;
    
    // Get current posts
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    
    const postIndex = currentPosts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        currentPosts[postIndex] = {
            ...currentPosts[postIndex], // Keep existing properties
            id: postId,
            title,
            slug,
            image,
            image2,
            duration,
            distance,
            difficulty,
            content
        };
        
        localStorage.setItem('posts', JSON.stringify(currentPosts));
        posts = currentPosts; // Update the in-memory posts array
        loadPosts();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editPostModal'));
        modal.hide();
    }
}

export function editPost(postId) {
    // Get current posts
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    
    const post = currentPosts.find(p => p.id === postId);
    if (post) {
        document.getElementById('editPostId').value = post.id;
        document.getElementById('editPostTitle').value = post.title;
        if (document.getElementById('editPostSlug')) {
            document.getElementById('editPostSlug').value = post.slug || '';
        }
        document.getElementById('editPostImage').value = post.image;
        if (document.getElementById('editPostImage2')) {
            document.getElementById('editPostImage2').value = post.image2 || '';
        }
        document.getElementById('editPostDuration').value = post.duration;
        document.getElementById('editPostDistance').value = post.distance;
        if (document.getElementById('editPostDifficulty')) {
            document.getElementById('editPostDifficulty').value = post.difficulty || 'Moderate';
        }
        document.getElementById('editPostContent').value = post.content;
        
        const modal = new bootstrap.Modal(document.getElementById('editPostModal'));
        modal.show();
    }
}

export function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        // Get current posts
        const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
        
        const updatedPosts = currentPosts.filter(post => post.id !== postId);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        posts = updatedPosts; // Update the in-memory posts array
        
        loadPosts();
        updateDashboardStats();
    }
}

// Initialize localStorage with initialPosts if empty
export function initializePosts() {
    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify(initialPosts));
    }
    loadPosts();
    
    // Setup itinerary handlers when modal is shown
    const createPostModal = document.getElementById('createPostModal');
    if (createPostModal) {
        createPostModal.addEventListener('shown.bs.modal', setupItineraryHandlers);
    }
    
    // Also set up handlers immediately in case modal is already open
    setupItineraryHandlers();
}

// Call initializePosts when the module is loaded
initializePosts();