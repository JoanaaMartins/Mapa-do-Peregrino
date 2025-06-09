
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.contact_form');
    
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm_password').value;
      const termsChecked = document.getElementById('terms').checked;
      
      // Validate form
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
      
      // Check if email already exists
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.some(user => user.email === email)) {
        alert('Email already registered');
        return;
      } 
      
      // Create new user
      const newUser = {
        id: Date.now(), // Simple unique ID
        username,
        email,
        password,
      };
      
      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Redirect to login page
      alert('Registration successful! Please login.'); 
      console.log('User registered successfully:', newUser.username);
      window.location.href = '../views/login.html'; 
    });
}); 
function isAdminInvite(email) {
  // Check if this is a special admin invitation
  return email.endsWith('@admin-invite.example'); // Example pattern
}

// Then modify the user creation part:
const newUser = {
  id: Date.now(),
  username,
  email,
  password,
  isAdmin: isAdminInvite(email) // Only true for special invites
};