/**
 * Shows a custom toast notification
 * @param {string} message - The message to display
 * @param {string} [title='Mapa do Peregrino'] - Notification title
 * @param {string} [icon='bi-info-circle'] - Bootstrap icon class
 * @param {string} [type='info'] - Type of notification (info, success, warning, error)
 * @param {number} [delay=5000] - Auto-hide delay in ms (0 to disable)
 */
function showToast(message, title = 'Mapa do Peregrino', icon = 'bi-info-circle', type = 'info', delay = 5000) {
    // Border colors based on type
    const borderColors = {
        info: '#6B8981',    // Your main color
        success: '#28a745', // Green
        warning: '#ffc107', // Yellow
        error: '#dc3545'    // Red
    };
    
    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.style.borderLeftColor = borderColors[type] || borderColors.info;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="toast-custom-header">
            <i class="bi ${icon} mr-2"></i>
            <strong class="me-auto">${title}</strong>
            <small class="text-muted">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-custom-body">
            ${message}
        </div>
    `;
    
    const container = document.querySelector('.toast-container') || createToastContainer();
    container.appendChild(toast);
    
    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast, { delay: delay });
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
    
    return bsToast;
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '1100';
    document.body.prepend(container);
    return container;
}

// Shortcut functions for common notification types
function showSuccessToast(message, title = 'Success') {
    return showToast(message, title, 'bi-check-circle', 'success');
}

function showErrorToast(message, title = 'Error') {
    return showToast(message, title, 'bi-exclamation-circle', 'error');
}

function showWarningToast(message, title = 'Warning') {
    return showToast(message, title, 'bi-exclamation-triangle', 'warning');
}

function showInfoToast(message, title = 'Info') {
    return showToast(message, title, 'bi-info-circle', 'info');
}