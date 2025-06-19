document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.login_part_form .contact_form');
  
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('name').value.trim();
      const password = document.getElementById('password').value;
      const rememberMe = document.getElementById('f-option').checked;
      
      if (!username || !password) {
          showToast('Please fill in all fields', 'error');
          return;
      }
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === username);
      
      if (!user) {
          showToast('Username not found', 'error');
          return;
      }
      
      if (user.password !== password) {
          showToast('Incorrect password', 'error');
          return;
      }

      const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin || false 
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      if (rememberMe) {
          localStorage.setItem('rememberedUser', username);
      } else {
          localStorage.removeItem('rememberedUser');
      }
      
      showToast(`Welcome back, ${username}!`, 'success');
            if (userData.username === 'admin') {
          setTimeout(() => {
              window.location.href = '../views/admin.html';
          }, 1000);
      } else {
          setTimeout(() => {
              window.location.href = '../views/index.html';
          }, 1500);
      }
  });

  const rememberedUser = localStorage.getItem('rememberedUser');
  if (rememberedUser) {
      document.getElementById('name').value = rememberedUser;
      document.getElementById('f-option').checked = true;
  }
});

function showToast(message, type = 'info') {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  toast.innerHTML = `
      <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
  `;
  
  toastContainer.appendChild(toast);
  new bootstrap.Toast(toast).show();
  

  setTimeout(() => {
      toast.remove();
  }, 5000);
}