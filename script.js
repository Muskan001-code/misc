/**
 * Vendor Registration Form JavaScript
 * 
 * API Integration for: /vendor-details
 * 
 * Expected Request Format:
 * POST /vendor-details
 * Content-Type: application/json
 * {
 *   "gst_details": {
 *     "firm_name": "string",
 *     "firm_type": "string",
 *     "country": "string",
 *     "gst_number": "string",
 *     "company_status": "string"
 *   },
 *   "pan_details": {
 *     "pan_number": "string"
 *   },
 *   "address": "string",
 *   "std_code_with_phone": "string",
 *   "contact_person_name": "string",
 *   "items_interested": ["string"],
 *   "city": "string",
 *   "fax": "string",
 *   "contact_person_designation": "string",
 *   "state": "string",
 *   "website": "string",
 *   "is_msme": "string",
 *   "country": "string",
 *   "mobile": "string",
 *   "business_description": "string",
 *   "pin": "string",
 *   "email": "string",
 *   "submitted_at": "ISO 8601 timestamp",
 *   "form_version": "1.0"
 * }
 * 
 * Expected Success Response:
 * {
 *   "success": true,
 *   "message": "Vendor registered successfully",
 *   "vendorId": "VEN001234",
 *   "submissionId": "SUB567890"
 * }
 * 
 * Expected Error Response:
 * {
 *   "success": false,
 *   "message": "Validation failed",
 *   "errors": {
 *     "fieldName": "Error message"
 *   }
 * }
 */

// Configuration
const API_CONFIG = {
    baseUrl: 'http://localhost:8009', // Backend server URL
    endpoint: '/api/v1/misc/vendor-details', // Direct endpoint
    timeout: 30000 // 30 seconds
};

// Captcha generation
let captchaAnswer = 10; // Default for 5 + 5

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    document.getElementById('captchaQuestion').textContent = `What is ${num1} + ${num2} ?`;
}

// Initialize captcha on page load
document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
});

// Form validation
function validateField(fieldId, errorId, validationFunction) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    const value = field.value.trim();

    if (validationFunction(value)) {
        errorElement.textContent = '';
        field.style.borderColor = '#ccc';
        return true;
    } else {
        field.style.borderColor = 'red';
        return false;
    }
}

// Validation functions
function validateRequired(value) {
    return value !== '';
}

function validateEmail(value) {
    if (value === '') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function validatePhone(value) {
    if (value === '') return false;
    const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
    return phoneRegex.test(value);
}

function validateGST(value) {
    if (value === '') return false;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(value);
}

function validatePAN(value) {
    if (value === '') return false;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(value);
}

function validatePIN(value) {
    if (value === '') return false;
    const pinRegex = /^[1-9][0-9]{5}$/;
    return pinRegex.test(value);
}

// Real-time validation event listeners
function setupValidationListeners() {
    document.getElementById('firmName').addEventListener('blur', function() {
        if (!validateField('firmName', 'firmNameError', validateRequired)) {
            document.getElementById('firmNameError').textContent = 'Firm name is required';
        }
    });

    document.getElementById('gstNo').addEventListener('blur', function() {
        if (!validateField('gstNo', 'gstNoError', validateGST)) {
            document.getElementById('gstNoError').textContent = 'Invalid GST number format';
        }
    });

    document.getElementById('panNo').addEventListener('blur', function() {
        if (!validateField('panNo', 'panNoError', validatePAN)) {
            document.getElementById('panNoError').textContent = 'Invalid PAN number format';
        }
    });

    document.getElementById('email').addEventListener('blur', function() {
        if (!validateField('email', 'emailError', validateEmail)) {
            document.getElementById('emailError').textContent = 'Invalid email address';
        }
    });

    document.getElementById('mobile').addEventListener('blur', function() {
        if (!validateField('mobile', 'mobileError', validatePhone)) {
            document.getElementById('mobileError').textContent = 'Invalid mobile number';
        }
    });

    document.getElementById('pin').addEventListener('blur', function() {
        if (!validateField('pin', 'pinError', validatePIN)) {
            document.getElementById('pinError').textContent = 'Invalid PIN code';
        }
    });
}

// Form submission handler
function setupFormSubmission() {
    document.getElementById('vendorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = [
            'firmName', 'firmType', 'country', 'gstNo', 'panNo', 'companyStatus',
            'address', 'stdPhone', 'contactPerson', 'itemsInterested', 'designation',
            'msme', 'state', 'mobile', 'email', 'pin'
        ];

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });

        // Validate required fields
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorId = fieldId + 'Error';
            
            if (fieldId === 'itemsInterested') {
                const checkboxes = document.querySelectorAll('input[name="itemsInterested"]:checked');
                if (checkboxes.length === 0) {
                    document.getElementById(errorId).textContent = 'Please select at least one item';
                    isValid = false;
                } else {
                    document.getElementById(errorId).textContent = '';
                }
            } else if (!field.value.trim()) {
                document.getElementById(errorId).textContent = 'This field is required';
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '#ccc';
            }
        });

        // Validate specific formats
        if (document.getElementById('gstNo').value && !validateGST(document.getElementById('gstNo').value)) {
            document.getElementById('gstNoError').textContent = 'Invalid GST number format';
            isValid = false;
        }

        if (document.getElementById('panNo').value && !validatePAN(document.getElementById('panNo').value)) {
            document.getElementById('panNoError').textContent = 'Invalid PAN number format';
            isValid = false;
        }

        if (document.getElementById('email').value && !validateEmail(document.getElementById('email').value)) {
            document.getElementById('emailError').textContent = 'Invalid email address';
            isValid = false;
        }

        if (document.getElementById('pin').value && !validatePIN(document.getElementById('pin').value)) {
            document.getElementById('pinError').textContent = 'Invalid PIN code';
            isValid = false;
        }

        // Validate captcha
        const captchaInput = parseInt(document.getElementById('captchaAnswer').value);
        if (captchaInput !== captchaAnswer) {
            document.getElementById('captchaError').textContent = 'Incorrect answer';
            document.getElementById('captchaAnswer').style.borderColor = 'red';
            isValid = false;
        } else {
            document.getElementById('captchaAnswer').style.borderColor = '#ccc';
        }

        if (isValid) {
            // Show loading state
            document.body.classList.add('loading');
            
            // Submit form to API
            submitFormToAPI();
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// API submission function - Direct call to /vendor-details
async function submitFormToAPI() {
    try {
        // Collect form data
        const formData = collectFormData();
        console.log('📤 Sending data to:', API_CONFIG.baseUrl + API_CONFIG.endpoint);
        
        // Direct API call
        const response = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        console.log(response, "response------------------------");
        // Handle response
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Success response:', result);
            showSuccessMessage(result);
            resetForm();
        } else {
            const errorData = await response.json();
            console.log('❌ Error response:', errorData);
            showErrorMessage(errorData);
        }
    } catch (error) {
        console.error('❌ API call failed:', error);
        
        let errorMessage = 'Unable to connect to server. Please ensure your backend is running on port 9000.';
        
        if (error.message.includes('fetch')) {
            errorMessage = 'Connection failed. Check if backend server is running.';
        }
        
        showErrorMessage({
            message: errorMessage
        });
    } finally {
        // Remove loading state
        document.body.classList.remove('loading');
    }
}

// Collect form data into object
function collectFormData() {
    const form = document.getElementById('vendorForm');
    
    // Handle checkboxes manually
    const checkedItems = document.querySelectorAll('input[name="itemsInterested"]:checked');
    const itemsInterested = Array.from(checkedItems).map(checkbox => checkbox.value).filter(value => value !== 'select_all');

    // Structure data according to the new vendor_details format
    const data = {
        gst_details: {
            firm_name: document.getElementById('firmName').value.trim(),
            firm_type: document.getElementById('firmType').value.trim(),
            country: document.getElementById('country').value.trim(),
            gst_number: document.getElementById('gstNo').value.trim(),
            company_status: document.getElementById('companyStatus').value.trim()
        },
        pan_details: {
            pan_number: document.getElementById('panNo').value.trim()
        },
        address: document.getElementById('address').value.trim(),
        std_code_with_phone: document.getElementById('stdPhone').value.trim(),
        contact_person_name: document.getElementById('contactPerson').value.trim(),
        items_interested: itemsInterested,
        city: document.getElementById('city').value.trim(),
        fax: document.getElementById('fax').value.trim(),
        contact_person_designation: document.getElementById('designation').value.trim(),
        state: document.getElementById('state').value.trim(),
        website: document.getElementById('website').value.trim(),
        is_msme: document.getElementById('msme').value.trim(),
        country: document.getElementById('vendorCountry').value.trim(),
        mobile: document.getElementById('mobile').value.trim(),
        business_description: document.getElementById('businessDescription').value.trim(),
        pin: document.getElementById('pin').value.trim(),
        email: document.getElementById('email').value.trim(),
        
        // Add timestamp and metadata
        submitted_at: new Date().toISOString(),
        form_version: '1.0'
    };
    console.log(data, "data");

    return data;
}

// Show success message
function showSuccessMessage(result) {
    const message = result.message || 'Form submitted successfully! Thank you for registering as a vendor with Hindustan Copper Limited.';
    
    // Create success modal/alert
    if (typeof result.vendorId !== 'undefined') {
        alert(`${message}\n\nVendor ID: ${result.vendorId}\n\nPlease save this ID for future reference.`);
    } else {
        alert(message);
    }
}

// Show error message
function showErrorMessage(errorData) {
    let message = 'Form submission failed. Please try again.';
    
    if (errorData.message) {
        message = errorData.message;
    }
    
    // Handle validation errors from server
    if (errorData.errors && typeof errorData.errors === 'object') {
        const errorList = Object.entries(errorData.errors)
            .map(([field, error]) => `${field}: ${error}`)
            .join('\n');
        message += '\n\nValidation Errors:\n' + errorList;
        
        // Highlight fields with server-side errors
        highlightServerErrors(errorData.errors);
    }
    
    alert(message);
}

// Highlight fields that have server-side validation errors
function highlightServerErrors(errors) {
    // Map nested API field names to form field IDs
    const fieldMapping = {
        'gst_details.firm_name': 'firmName',
        'gst_details.firm_type': 'firmType',
        'gst_details.country': 'country',
        'gst_details.gst_number': 'gstNo',
        'gst_details.company_status': 'companyStatus',
        'pan_details.pan_number': 'panNo',
        'std_code_with_phone': 'stdPhone',
        'contact_person_name': 'contactPerson',
        'items_interested': 'itemsInterested',
        'contact_person_designation': 'designation',
        'is_msme': 'msme',
        'business_description': 'businessDescription'
    };

    Object.keys(errors).forEach(apiFieldName => {
        // Map API field name to form field ID
        const formFieldId = fieldMapping[apiFieldName] || apiFieldName;
        const field = document.getElementById(formFieldId);
        const errorElement = document.getElementById(formFieldId + 'Error');
        
        if (field && errorElement) {
            if (formFieldId === 'itemsInterested') {
                // For checkboxes, highlight the container and show error
                const checkboxContainer = document.querySelector('.checkbox-container');
                if (checkboxContainer) {
                    checkboxContainer.style.borderColor = 'red';
                }
                errorElement.textContent = errors[apiFieldName];
            } else {
                field.style.borderColor = 'red';
                errorElement.textContent = errors[apiFieldName];
            }
        }
    });
}

// Reset form function
function resetForm() {
    document.getElementById('vendorForm').reset();
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '#ccc';
    });
    // Reset all checkboxes
    document.querySelectorAll('input[name="itemsInterested"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    generateCaptcha();
    document.getElementById('country').value = 'India';
    document.getElementById('vendorCountry').value = 'India';
}

// Checkbox functionality: Handle "Select all" checkbox
function setupCheckboxHandlers() {
    const selectAllCheckbox = document.getElementById('select_all');
    const itemCheckboxes = document.querySelectorAll('input[name="itemsInterested"]:not(#select_all)');

    // Handle "Select all" checkbox
    selectAllCheckbox.addEventListener('change', function() {
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // Handle individual checkboxes
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Check if all items are selected
            const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
            const noneChecked = Array.from(itemCheckboxes).every(cb => !cb.checked);
            
            // Update "Select all" checkbox state
            selectAllCheckbox.checked = allChecked;
            selectAllCheckbox.indeterminate = !allChecked && !noneChecked;
        });
    });
}

// Handle responsive behavior for checkbox container
function handleResize() {
    const checkboxContainer = document.querySelector('.checkbox-container');
    if (window.innerWidth <= 768) {
        checkboxContainer.style.height = '150px';
    } else if (window.innerWidth <= 1024) {
        checkboxContainer.style.height = '200px';
    } else {
        checkboxContainer.style.height = '300px';
    }
}

// Setup responsive handlers
function setupResponsiveHandlers() {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

// Auto-generate captcha every 30 seconds
function setupCaptchaRotation() {
    setInterval(generateCaptcha, 30000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
    setupValidationListeners();
    setupFormSubmission();
    setupCheckboxHandlers();
    setupResponsiveHandlers();
    setupCaptchaRotation();
    
    // Set default values
    document.getElementById('country').value = 'India';
    document.getElementById('vendorCountry').value = 'India';
});

// Global function for reset button (called from HTML)
window.resetForm = resetForm; 