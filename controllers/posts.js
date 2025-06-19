import { initialPosts } from '../Models/data.js';
import { updateDashboardStats } from './dashboard.js';

let posts = JSON.parse(localStorage.getItem('posts')) || initialPosts;

function savePostsToStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function setupItineraryHandlers(containerId = 'itineraryContainer') {
    document.getElementById('addDayBtn')?.addEventListener('click', function() {
        addNewDayItem(containerId);
    });

    document.querySelectorAll(`#${containerId} .remove-day`).forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.itinerary-day').remove();
        });
    });
}

function addNewDayItem(containerId, dayData = {}) {
    const itineraryContainer = document.getElementById(containerId);
    const dayCount = document.querySelectorAll(`#${containerId} .itinerary-day`).length;
    
    const newDay = document.createElement('div');
    newDay.className = 'itinerary-day mb-3 p-3 border rounded';
    newDay.innerHTML = `
        <div class="row">
            <div class="col-md-2">
                <label>Day</label>
                <input type="number" class="form-control day-number" min="1" value="${dayData.day || dayCount + 1}">
            </div>
            <div class="col-md-4">
                <label>From</label>
                <input type="text" class="form-control from-location" placeholder="Starting point" value="${dayData.from || ''}">
            </div>
            <div class="col-md-4">
                <label>To</label>
                <input type="text" class="form-control to-location" placeholder="Destination" value="${dayData.to || ''}">
            </div>
            <div class="col-md-2">
                <label>Distance (km)</label>
                <input type="number" class="form-control distance" step="0.1" placeholder="km" value="${dayData.distance || ''}">
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-12">
                <label>Suggested Albergue</label>
                <input type="text" class="form-control albergue" placeholder="Recommended accommodation" value="${dayData.albergue || ''}">
            </div>
        </div>
        <button type="button" class="btn btn-sm btn-danger mt-2 remove-day">Remove</button>
    `;
    
    itineraryContainer.appendChild(newDay);
    newDay.querySelector('.remove-day').addEventListener('click', function() {
        newDay.remove();
    });
}

export function loadPosts() {
    const postsGrid = document.getElementById('postsGrid');
    postsGrid.innerHTML = '';
    
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
    
    const itineraryDays = collectItineraryData('itineraryContainer');

    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    
    const newPost = {
        id: currentPosts.length > 0 ? Math.max(...currentPosts.map(p => p.id)) + 1 : 1,
        title,
        image,
        duration,
        distance,
        content,
        itinerary: itineraryDays
    };
    
    currentPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(currentPosts));
    posts = currentPosts;
    
    loadPosts();
    updateDashboardStats();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('createPostModal'));
    modal.hide();
    document.getElementById('postForm').reset();
    
    resetItineraryContainer('itineraryContainer');
    setupItineraryHandlers('itineraryContainer');
}

function collectItineraryData(containerId) {
    const itineraryDays = [];
    document.querySelectorAll(`#${containerId} .itinerary-day`).forEach(dayElement => {
        const day = {
            day: dayElement.querySelector('.day-number').value,
            from: dayElement.querySelector('.from-location').value,
            to: dayElement.querySelector('.to-location').value,
            distance: dayElement.querySelector('.distance').value,
            albergue: dayElement.querySelector('.albergue').value
        };
        itineraryDays.push(day);
    });
    return itineraryDays;
}

function resetItineraryContainer(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    addNewDayItem(containerId);
}

export function updatePost() {
    const postId = parseInt(document.getElementById('editPostId').value);
    const title = document.getElementById('editPostTitle').value;
    const image = document.getElementById('editPostImage').value;
    const duration = document.getElementById('editPostDuration').value;
    const distance = document.getElementById('editPostDistance').value;
    const content = document.getElementById('editPostContent').value;
    
    const itineraryDays = collectItineraryData('editItineraryContainer');

    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    
    const postIndex = currentPosts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
        currentPosts[postIndex] = {
            ...currentPosts[postIndex],
            id: postId,
            title,
            image,
            duration,
            distance,
            content,
            itinerary: itineraryDays
        };
        
        localStorage.setItem('posts', JSON.stringify(currentPosts));
        posts = currentPosts;
        loadPosts();
        
        const modalElement = document.getElementById('editPostModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            } else {
                new bootstrap.Modal(modalElement).hide();
            }
            
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(backdrop => backdrop.remove());
            document.body.classList.remove('modal-open');
            document.getElementById('editPostForm').reset();
        }
    }
}

export function editPost(postId) {
    const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
    const post = currentPosts.find(p => p.id === postId);
    
    if (post) {
        document.getElementById('editPostId').value = post.id;
        document.getElementById('editPostTitle').value = post.title;
        document.getElementById('editPostImage').value = post.image;
        document.getElementById('editPostDuration').value = post.duration;
        document.getElementById('editPostDistance').value = post.distance;
        document.getElementById('editPostContent').value = post.content;
        
        const itineraryContainer = document.getElementById('editItineraryContainer');
        itineraryContainer.innerHTML = '';
        
        if (post.itinerary && post.itinerary.length > 0) {
            post.itinerary.forEach(day => {
                addNewDayItem('editItineraryContainer', day);
            });
        } else {
            addNewDayItem('editItineraryContainer');
        }
        
        document.getElementById('editAddDayBtn')?.addEventListener('click', function() {
            addNewDayItem('editItineraryContainer');
        });
        
        const modal = new bootstrap.Modal(document.getElementById('editPostModal'));
        modal.show();
    }
}

export function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        const currentPosts = JSON.parse(localStorage.getItem('posts')) || posts;
        const updatedPosts = currentPosts.filter(post => post.id !== postId);
        
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        posts = updatedPosts;
        
        loadPosts();
        updateDashboardStats();
    }
}

export function initializePosts() {
    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify(initialPosts));
    }
    
    loadPosts();
    
    const createPostModal = document.getElementById('createPostModal');
    if (createPostModal) {
        createPostModal.addEventListener('shown.bs.modal', function() {
            resetItineraryContainer('itineraryContainer');
            setupItineraryHandlers('itineraryContainer');
        });
    }
    
    document.getElementById('addDayBtn')?.addEventListener('click', function() {
        addNewDayItem('itineraryContainer');
    });
    
    document.getElementById('editAddDayBtn')?.addEventListener('click', function() {
        addNewDayItem('editItineraryContainer');
    });
    
    setupItineraryHandlers('itineraryContainer');
}
const editPostModal = document.getElementById('editPostModal');
if (editPostModal) {
    editPostModal.addEventListener('hidden.bs.modal', function() {
        document.getElementById('editItineraryContainer').innerHTML = '';
        document.getElementById('editPostForm').reset();
    });
}

initializePosts();