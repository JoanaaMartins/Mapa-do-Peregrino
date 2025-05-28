document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login_part_form .contact_form');
    
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const username = document.getElementById('name').value.trim();
      const password = document.getElementById('password').value;
      const rememberMe = document.getElementById('f-option').checked;
      
      // Validate form
      if (!username || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Find user by username
      const user = users.find(u => u.username === username);
      
      if (!user) {
        alert('Username not found');
        return;
      }
      
      // Check password (Note: In real apps, compare hashed passwords)
      if (user.password !== password) {
        alert('Incorrect password');
        return;
      }
      
      // Login successful
      alert('Login successful!');
      
      // Store current user in localStorage (for session management)
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      }));
      
      // If "Remember me" is checked, store in localStorage
      if (rememberMe) {
        localStorage.setItem('rememberedUser', username);
      } else {
        localStorage.removeItem('rememberedUser');
      }
      
      // Redirect to home page or dashboard
      window.location.href = '/index.html';
    });
    
    // Check if there's a remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      document.getElementById('name').value = rememberedUser;
      document.getElementById('f-option').checked = true;
    }
});