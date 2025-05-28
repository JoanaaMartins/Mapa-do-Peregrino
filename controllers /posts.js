import { posts as initialPosts } from './data.js';
import { updateDashboardStats } from './dashboard.js';

// Initialize posts from localStorage or fall back to initialPosts
let posts = JSON.parse(localStorage.getItem('posts')) || initialPosts;

// Save posts to localStorage
function savePostsToStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
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
    const title = document.getElementById('postTitle').value;
    const image = document.getElementById('postImage').value;
    const duration = document.getElementById('postDuration').value;
    const distance = document.getElementById('postDistance').value;
    const content = document.getElementById('postContent').value;
    
    // Get current posts
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    
    const newPost = {
        id: currentPosts.length > 0 ? Math.max(...currentPosts.map(p => p.id)) + 1 : 1,
        title,
        image,
        duration,
        distance,
        content
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
}

export function updatePost() {
    const postId = parseInt(document.getElementById('editPostId').value);
    const title = document.getElementById('editPostTitle').value;
    const image = document.getElementById('editPostImage').value;
    const duration = document.getElementById('editPostDuration').value;
    const distance = document.getElementById('editPostDistance').value;
    const content = document.getElementById('editPostContent').value;
    
    // Get current posts
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    
    const postIndex = currentPosts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        currentPosts[postIndex] = {
            id: postId,
            title,
            image,
            duration,
            distance,
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
        document.getElementById('editPostImage').value = post.image;
        document.getElementById('editPostDuration').value = post.duration;
        document.getElementById('editPostDistance').value = post.distance;
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
}

// Call initializePosts when the module is loaded
initializePosts();