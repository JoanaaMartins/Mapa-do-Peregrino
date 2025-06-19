document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('likedPostsContainer');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const likedPosts = posts.filter(post => post.isLiked);

    container.innerHTML = '';

    if (likedPosts.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center">You have not liked any posts yet</p></div>';
        return;
    }

    likedPosts.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-lg-6 col-sm-6 mb-4';
        col.innerHTML = `
            <div class="single_product_item">
                <img src="${post.image}" alt="${post.title}" class="img-fluid">
                <h3><a href="post-detail.html?id=${post.id}">${post.title}</a></h3>
                <p>Duration: ${post.duration} • Distance: ${post.distance}</p>
            </div>
        `;
        container.appendChild(col);
    });
}); 

document.addEventListener("DOMContentLoaded", function() {
    loadNotifications();
});

function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const container = document.getElementById('notificationsContainer');
    container.innerHTML = '';

    if (notifications.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">No notifications yet.</p>';
        return;
    }

    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
        notificationItem.innerHTML = `
            <div class="notification-icon">
                <i class="bi ${getNotificationIcon(notification.type)}"></i>
            </div>
            <div class="notification-content">
                <p><strong>${notification.title}</strong>: ${notification.message}</p>
                <span class="notification-time">${formatTime(notification.time)}</span>
            </div>
        `;
        container.appendChild(notificationItem);
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'discount':
            return 'bi-tag-fill';
        case 'like':
            return 'bi-heart-fill';
        case 'comment':
            return 'bi-chat-square-text-fill';
        default:
            return 'bi-bell-fill';
    }
}

function formatTime(timeString) {
    const time = new Date(timeString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
}