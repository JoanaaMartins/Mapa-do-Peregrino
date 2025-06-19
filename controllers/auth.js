// auth.js 
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const protectedPages = ['product_list.html', 'todo.html', 'profile.html']; 
    
    const isProtectedPage = protectedPages.some(page => 
        window.location.pathname.includes(page)
    );
    
    if (!currentUser && isProtectedPage) {
        alert('Please login to access this page');
        window.location.href = 'login.html';
        return;
    }
    if (currentUser?.isAdmin && window.location.pathname.includes('admin.html')) {
        return;
    }  
    if (!currentUser?.isAdmin && window.location.pathname.includes('admin.html')) {
        alert('You do not have permission to access this page');
        window.location.href = 'index.html';
        return;
    }
    
    if (currentUser) {
        const profileNameElement = document.querySelector('.profile-name');
        if (profileNameElement) {
            profileNameElement.textContent = currentUser.username;
        }
        

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
        }
    }
});


function logout() {  
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}