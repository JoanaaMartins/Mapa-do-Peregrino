
function isAdminInvite(email) {
  return email.endsWith('@admin-invite.example'); 
}

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.contact_form');
    
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm_password').value;
      const termsChecked = document.getElementById('terms').checked;
      
      if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!termsChecked) {
        alert('You must agree to the Terms & Conditions');
        return;
      }
      
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.some(user => user.email === email)) {
        alert('Email already registered');
        return;
      } 
      
      const newUser = {
        id: Date.now(), 
        username,
        email,
        password,
      };
      
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      alert('Registration successful! Please login.'); 
      console.log('User registered successfully:', newUser.username);
      window.location.href = '../views/login.html'; 
    });
}); 


