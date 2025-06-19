//import { posts } from '../Models/data.js';

let currentFilters = {
    path: 'all',
    duration: 'all'
};

export function initUserFeed() {
    loadUserFeed();
    setupEventListeners();
}

function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

function loadUserFeed() {
    const feedContainer = document.getElementById('userFeed');
    feedContainer.innerHTML = '';

    const filteredPosts = filterPosts();
    
    if (filteredPosts.length === 0) {
        feedContainer.innerHTML = '<div class="col-12"><p class="text-center">No posts match your filters.</p></div>';
        return;
    }

    filteredPosts.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-lg-6 col-sm-6 mb-4';
        const heartClass = post.isLiked ? 'bi-heart-fill text-danger' : 'bi-heart';
        col.innerHTML = `
            <div class="single_product_item position-relative border rounded p-3 shadow-sm">
                <div class="save-btn position-absolute top-0 end-0 p-2">
                    <button class="btn btn-light btn-sm rounded-circle like-post" data-id="${post.id}">
                        <i class="bi ${heartClass}"></i>
                    </button>
                </div>
                <img src="${post.image}" alt="${post.title}" class="img-fluid rounded mb-3">
                <h3><a href="post-detail.html?id=${post.id}">${post.title}</a></h3>
                <p>Duration: ${post.duration} • Distance: ${post.distance}</p>
                <p class="text-muted">${post.content.substring(0, 100)}...</p>
            </div>
        `;
        feedContainer.appendChild(col);
    });

    document.querySelectorAll('.like-post').forEach(button => {
        button.addEventListener('click', function() {
            const postId = parseInt(this.getAttribute('data-id'));
            toggleLike(postId);
        });
    });
}

function filterPosts() {
    const posts = getPosts();
    return posts.filter(post => {
        
        const pathMatch = currentFilters.path === 'all' || 
                         post.path === currentFilters.path;
        
        
        let durationMatch = false;
        if (currentFilters.duration === 'all') {
            durationMatch = true;
        } else {
            const days = parseInt(post.duration.split(' ')[0]);
            switch(currentFilters.duration) {
                case 'short': durationMatch = days >= 3 && days <= 5; break;
                case 'medium': durationMatch = days >= 6 && days <= 10; break;
                case 'long': durationMatch = days >= 11 && days <= 15; break;
                case 'extended': durationMatch = days > 15; break;
                default: durationMatch = true;
            }
        }
        
        return pathMatch && durationMatch;
    });
}

function setupEventListeners() {
    document.querySelectorAll('.filter-path').forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            currentFilters.path = this.getAttribute('data-path');

            const pathDropdownBtn = document.querySelector('#pathDropdown');
            const selectedText = this.textContent;
            pathDropdownBtn.innerHTML = `${selectedText} `;
            
            loadUserFeed();
        });
    });


    document.querySelectorAll('.filter-duration').forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            currentFilters.duration = this.getAttribute('data-duration');
            const durationDropdownBtn = document.querySelector('#durationDropdown');
            const selectedText = this.textContent;
            durationDropdownBtn.innerHTML = `${selectedText} `;
            
            loadUserFeed();
        });
    });
}

function toggleLike(postId) {
    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.isLiked = !post.isLiked;
        localStorage.setItem('posts', JSON.stringify(posts));
        loadUserFeed();
    }
}

document.addEventListener('DOMContentLoaded', initUserFeed);