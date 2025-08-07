// Form handling and validation
class FormHandler {
    constructor() {
        this.forms = {
            argentinos: document.getElementById('argentinos-form'),
            extranjeros: document.getElementById('extranjeros-form'),
            becas: document.getElementById('becas-form')
        };
        
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupPayPalButtons();
        this.setupFormSubmissions();
    }

    setupFormValidation() {
        Object.values(this.forms).forEach(form => {
            if (form) {
                this.addFormValidation(form);
            }
        });
    }

    addFormValidation(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    validateField(field) {
        const isValid = this.checkFieldValidity(field);
        this.showFieldValidation(field, isValid);
        return isValid;
    }

    checkFieldValidity(field) {
        if (!field.value.trim() && field.hasAttribute('required')) {
            return false;
        }

        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(field.value);
        }

        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            return phoneRegex.test(field.value);
        }

        return true;
    }

    showFieldValidation(field, isValid) {
        const errorElement = field.parentNode.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }

        if (!isValid) {
            const errorMsg = this.getErrorMessage(field);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = errorMsg;
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '0.5rem';
            
            field.parentNode.appendChild(errorDiv);
            field.style.borderColor = '#e74c3c';
        } else {
            field.style.borderColor = '#27ae60';
        }
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }

    getErrorMessage(field) {
        if (!field.value.trim() && field.hasAttribute('required')) {
            return 'Este campo es obligatorio';
        }

        if (field.type === 'email') {
            return 'Por favor ingrese un email válido';
        }

        if (field.type === 'tel') {
            return 'Por favor ingrese un teléfono válido';
        }

        return 'Por favor verifique este campo';
    }

    setupPayPalButtons() {
        // PayPal button will be handled by the PayPal component
        // This is just a placeholder for additional PayPal setup if needed
        console.log('PayPal buttons setup initialized');
    }

    setupFormSubmissions() {
        // Argentinos form (has PayPal integration)
        if (this.forms.argentinos) {
            // PayPal integration will handle the submission
        }

        // Extranjeros form
        if (this.forms.extranjeros) {
            this.forms.extranjeros.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleExtranjerosSubmission();
            });
        }

        // Becas form
        if (this.forms.becas) {
            this.forms.becas.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBecasSubmission();
            });
        }
    }

    handleFormSubmission(form) {
        const isValid = this.validateForm(form);
        
        if (isValid) {
            this.showSuccessMessage(form);
            this.resetForm(form);
        } else {
            this.showErrorMessage('Por favor corrija los errores en el formulario');
        }
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    handleExtranjerosSubmission() {
        const form = this.forms.extranjeros;
        const isValid = this.validateForm(form);

        if (isValid) {
            const formData = new FormData(form);
            
            // Simulate form submission
            this.showLoadingMessage('Enviando inscripción...');
            
            setTimeout(() => {
                this.showSuccessMessage('Inscripción enviada correctamente. Recibirá un email con las instrucciones de pago.');
                this.resetForm(form);
            }, 2000);
        }
    }

    handleBecasSubmission() {
        const form = this.forms.becas;
        const isValid = this.validateForm(form);

        if (isValid) {
            const formData = new FormData(form);
            
            // Check if certificate file is uploaded
            const certificateFile = form.querySelector('#certificado').files[0];
            if (!certificateFile) {
                this.showErrorMessage('Por favor adjunte el certificado de alumno regular');
                return;
            }

            this.showLoadingMessage('Enviando solicitud de beca...');
            
            setTimeout(() => {
                this.showSuccessMessage('Solicitud de beca enviada correctamente. Recibirá una respuesta en los próximos días.');
                this.resetForm(form);
            }, 2000);
        }
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showLoadingMessage(message) {
        this.showMessage(message, 'loading');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        const styles = {
            success: { background: '#27ae60', color: 'white' },
            error: { background: '#e74c3c', color: 'white' },
            loading: { background: '#3498db', color: 'white' }
        };

        Object.assign(messageDiv.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '5px',
            zIndex: '9999',
            fontSize: '1rem',
            fontWeight: '600',
            maxWidth: '400px',
            wordWrap: 'break-word',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            ...styles[type]
        });

        document.body.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);

        // Add click to dismiss
        messageDiv.addEventListener('click', () => {
            messageDiv.remove();
        });
    }

    resetForm(form) {
        form.reset();
        
        // Clear all validation styles
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.style.borderColor = '';
            this.clearFieldError(field);
        });
    }
}

// Tab functionality
class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.switchTab(tabId, button);
            });
        });
    }

    switchTab(tabId, activeButton) {
        // Remove active class from all buttons and contents
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        activeButton.classList.add('active');
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new FormHandler();
    new TabManager();
});

// File upload validation
function validateFileUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

    if (file.size > maxSize) {
        alert('El archivo es demasiado grande. Máximo 5MB permitido.');
        input.value = '';
        return;
    }

    if (!allowedTypes.includes(file.type)) {
        alert('Tipo de archivo no permitido. Solo PDF, JPG y PNG son aceptados.');
        input.value = '';
        return;
    }

    // Show file name
    const fileName = file.name;
    let fileLabel = input.parentNode.querySelector('.file-label');
    if (!fileLabel) {
        fileLabel = document.createElement('span');
        fileLabel.className = 'file-label';
        fileLabel.style.marginTop = '0.5rem';
        fileLabel.style.display = 'block';
        fileLabel.style.fontSize = '0.9rem';
        fileLabel.style.color = '#27ae60';
        input.parentNode.appendChild(fileLabel);
    }
    fileLabel.textContent = `Archivo seleccionado: ${fileName}`;
}

// Add file validation to certificate upload
document.addEventListener('DOMContentLoaded', function() {
    const certificateInput = document.getElementById('certificado');
    if (certificateInput) {
        certificateInput.addEventListener('change', function() {
            validateFileUpload(this);
        });
    }
});
