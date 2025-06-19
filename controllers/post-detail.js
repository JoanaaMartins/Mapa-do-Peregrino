document.addEventListener('DOMContentLoaded', function() {
    const postId = parseInt(window.location.search.split('id=')[1]?.split('&')[0]);
    if (!postId) return;

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    document.querySelector('.single_product_text h3').textContent = post.title;
    document.querySelector('.single_product_text p').textContent = `Duration: ${post.duration} • Distance: ${post.distance}`;
    const imgSlides = document.querySelector('.product_img_slide');
    imgSlides.innerHTML = `
        <div class="single_product_img">
            <img src="${post.image}" class="img-fluid">
        </div>
    `;
    if (post.itinerary && Array.isArray(post.itinerary)) {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';
        post.itinerary.forEach(day => {
            tbody.innerHTML += `
                <tr>
                    <td>${day.day}</td>
                    <td>${day.from} → ${day.to}</td>
                    <td>${day.distance}</td>
                    <td>${day.albergue}</td>
                </tr>
            `;
        });
    }
});