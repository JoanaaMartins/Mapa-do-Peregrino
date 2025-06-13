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