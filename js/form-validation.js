// Terms checkbox validation
document.getElementById('terms').addEventListener('change', function() {
    if (!this.checked) {
        document.getElementById('terms').nextElementSibling.style.color = '#dc3545';
    } else {
        document.getElementById('terms').nextElementSibling.style.color = '';
    }
});
}

/**
* Validates all form fields
* @param {Object} formData - Form field values
* @returns {Object} - Errors object
*/
function validateAllFields(formData) {
const errors = {};

// Validate name
const nameError = validateName(formData.fullName);
if (nameError) errors.fullName = nameError;

// Validate email
const emailError = validateEmail(formData.email);
if (emailError) errors.email = emailError;

// Validate phone
const phoneError = validatePhone(formData.phone);
if (phoneError) errors.phone = phoneError;

// Validate WhatsApp if provided
if (formData.whatsapp) {
    const whatsappError = validatePhone(formData.whatsapp);
    if (whatsappError) errors.whatsapp = whatsappError;
}

// Validate password
const passwordError = validatePassword(formData.password);
if (passwordError) errors.password = passwordError;

// Validate confirm password
const confirmError = validateConfirmPassword(formData.confirmPassword, formData.password);
if (confirmError) errors.confirmPassword = confirmError;

// Validate terms
if (!formData.terms) {
    errors.terms = 'You must accept the terms and conditions';
}

return errors;
}

/**
* Processes the form submission
* @param {Object} formData - Validated form data
*/
function processFormSubmission(formData) {
const submitBtn = registrationForm.querySelector('button[type="submit"]');

// Show loading state
submitBtn.disabled = true;
submitBtn.innerHTML = '<span class="spinner"></span> Registering...';

// In a real application, you would send the data to your server here
// This is a simulation with a 1.5 second delay
setTimeout(() => {
    // Store user data in localStorage (for demo purposes)
    const userData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp || formData.phone,
        registeredAt: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}, 1500);
}

/* ===== VALIDATION FUNCTIONS ===== */

function validateName(value) {
if (!value) return 'Full name is required';
if (value.length < 3) return 'Name must be at least 3 characters';
if (!/^[a-zA-Z ]+$/.test(value)) return 'Name can only contain letters and spaces';
return null;
}

function validateEmail(value) {
if (!value) return 'Email is required';
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
return null;
}

function validatePhone(value) {
if (!value) return 'Phone number is required';
// Supports international formats: +234, 0, etc.
if (!/^[+]?[\d\s-]{8,}$/.test(value)) return 'Please enter a valid phone number';
return null;
}

function validatePassword(value) {
if (!value) return 'Password is required';

if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return null;
    }

    function validateConfirmPassword(value, passwordValue) {
        if (!value) return 'Please confirm your password';
        if (value !== passwordValue) return 'Passwords do not match';
        return null;
    }

    /* ===== ERROR DISPLAY FUNCTIONS ===== */
    
    function displayAllErrors(errors) {
        // Reset all errors first
        resetAllErrors();
        
        // Display each error
        for (const fieldId in errors) {
            if (fieldId === 'terms') {
                document.getElementById('terms').nextElementSibling.style.color = '#dc3545';
            } else {
                displayFieldError(fieldId, errors[fieldId]);
            }
        }
    }

    function displayFieldError(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        if (errorMessage) {
            // Add error class to input
            field.classList.add('error');
            
            // Create or update error message
            let errorElement = formGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = errorMessage;
        } else {
            // Remove error if valid
            clearFieldError(fieldId);
        }
    }

    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.remove('error');
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) errorElement.remove();
        }
    }

    function resetAllErrors() {
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
});