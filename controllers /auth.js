// auth.js - This should be included in all protected pages

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const protectedPages = ['product_list.html', 'todo.html']; // Pages that require login
    
    // Check if current page is protected
    const isProtectedPage = protectedPages.some(page => 
        window.location.pathname.includes(page)
    );
    
    // If user not logged in and trying to access protected page
    if (!currentUser && isProtectedPage) {
        alert('Please login to access this page');
        window.location.href = 'login.html';
        return;
    }
    
    // If user is admin and trying to access admin page
    if (currentUser?.isAdmin && window.location.pathname.includes('admin.html')) {
        // Allow access
        return;
    }
    
    // If non-admin trying to access admin page
    if (!currentUser?.isAdmin && window.location.pathname.includes('admin.html')) {
        alert('You do not have permission to access this page');
        window.location.href = 'index.html';
        return;
    }
    
    // Update UI based on login status
    if (currentUser) {
        // You can show user-specific content or hide login button
        const loginLink = document.querySelector('a[href="login.html"]');
        if (loginLink) {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        }
    }
});