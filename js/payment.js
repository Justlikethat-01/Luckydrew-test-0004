document.addEventListener('DOMContentLoaded', function() {
    // Payment Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Copy buttons
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.parentElement.querySelector('p').textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            });
        });
    });
    
    // Crypto options
    const cryptoOptions = document.querySelectorAll('.crypto-option');
    cryptoOptions.forEach(option => {
        option.addEventListener('click', function() {
            const crypto = this.getAttribute('data-crypto');
            
            // Remove active class from all options
            cryptoOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Show corresponding address (in a real app, you would generate this dynamically)
            document.querySelectorAll('.crypto-address').forEach(addr => {
                addr.style.display = 'none';
            });
            document.getElementById(${crypto}-address).style.display = 'block';
        });
    });
    
    // Form submission
    const paymentForm = document.querySelector('.card-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate payment processing
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            
            // In a real app, you would integrate with a payment gateway here
            setTimeout(() => {
                window.location.href = 'dashboard.html?payment=success';
            }, 2000);
        });
    }
    
    // File upload preview
    const receiptUpload = document.getElementById('receiptUpload');
    if (receiptUpload) {
        receiptUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const uploadBox = document.querySelector('.upload-box');
                    uploadBox.innerHTML = 
                        <img src="${e.target.result}" alt="Receipt Preview" style="max-width: 100%; max-height: 200px;">
                        <p>${receiptUpload.files[0].name}</p>
                    ;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
});