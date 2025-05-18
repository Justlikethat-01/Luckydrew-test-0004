document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            // Reset error states
            resetErrors();
            
            // Validate form
            let isValid = true;
            
            // Name validation
            if (fullName === '') {
                showError('fullName', 'Full name is required');
                isValid = false;
            } else if (fullName.length < 3) {
                showError('fullName', 'Name must be at least 3 characters');
                isValid = false;
            }
            
            // Email validation
            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (phone === '') {
                showError('phone', 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // WhatsApp validation (optional)
            if (whatsapp !== '' && !isValidPhone(whatsapp)) {
                showError('whatsapp', 'Please enter a valid WhatsApp number');
                isValid = false;
            }
            
            // Password validation
            if (password === '') {
                showError('password', 'Password is required');
                isValid = false;
            } else if (password.length < 8) {
                showError('password', 'Password must be at least 8 characters');
                isValid = false;
            }
            
            // Confirm password
            if (confirmPassword === '') {
                showError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            // Terms checkbox
            if (!terms) {
                document.getElementById('terms').nextElementSibling.style.color = '#dc3545';
                isValid = false;
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send this data to your server
                console.log('Form is valid, submitting...');
                
                // Show loading state
                const submitBtn = registrationForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner"></span> Registering...';
                
                // Simulate API call
                setTimeout(() => {
                    // Redirect to dashboard after successful registration

                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
        
        // Live validation for fields
        document.getElementById('fullName').addEventListener('input', function() {
            validateName(this.value.trim());
        });
        
        document.getElementById('email').addEventListener('input', function() {
            validateEmail(this.value.trim());
        });
        
        document.getElementById('phone').addEventListener('input', function() {
            validatePhone(this.value.trim());
        });
        
        document.getElementById('whatsapp').addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateWhatsApp(this.value.trim());
            }
        });
        
        document.getElementById('password').addEventListener('input', function() {
            validatePassword(this.value);
        });
        
        document.getElementById('confirmPassword').addEventListener('input', function() {
            validateConfirmPassword(this.value, document.getElementById('password').value);
        });
    }
    
    // Helper functions
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Add error class to input
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    function resetErrors() {
        // Remove all error classes and messages
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
        
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });
        
        // Reset terms checkbox styling
        const termsLabel = document.getElementById('terms').nextElementSibling;
        if (termsLabel) {
            termsLabel.style.color = '';
        }
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        // Basic international phone validation
        const re = /^[+]?[\d\s-]{8,}$/;
        return re.test(phone);
    }
    
    // Live validation functions
    function validateName(value) {
        const field = document.getElementById('fullName');
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (value === '') {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        } else if (value.length < 3) {
            field.classList.add('error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = 'Name must be at least 3 characters';
        } else {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        }
    }
    
    function validateEmail(value) {
        const field = document.getElementById('email');
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (value === '') {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        } else if (!isValidEmail(value)) {
            field.classList.add('error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = 'Please enter a valid email address';
        } else {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        }
    }
    
    function validatePhone(value) {
        const field = document.getElementById('phone');
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (value === '') {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        } else if (!isValidPhone(value)) {
            field.classList.add('error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = 'Please enter a valid phone number';
        } else {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        }
    }
    
    function validateWhatsApp(value) {
        const field = document.getElementById('whatsapp');
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!isValidPhone(value)) {
            field.classList.add('error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = 'Please enter a valid WhatsApp number';
        } else {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        }
    }
    
    function validatePassword(value) {
        const field = document.getElementById('password');
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (value === '') {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        } else if (value.length < 8) {
            field.classList.add('error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = 'Password must be at least 8 characters';
        } else {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        }
        
        // Also validate confirm password if it has value
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (confirmPassword !== '') {
            validateConfirmPassword(confirmPassword, value);
        }
    }
    
    function validateConfirmPassword(value, passwordValue) {
        const field = document.getElementById('confirmPassword');
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (value === '') {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        } else if (value !== passwordValue) {
            field.classList.add('error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = 'Passwords do not match';
        } else {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        }
    }
});