// PayPal Integration for Lacanoamericana Conference Registration
// Client-side only PayPal integration - works with GitHub Pages!

// REPLACE WITH YOUR LIVE PAYPAL CLIENT ID
const PAYPAL_CLIENT_ID = 'YOUR_LIVE_PAYPAL_CLIENT_ID_HERE';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize PayPal for different registration types
    initializePayPalButtons();
});

async function initializePayPalButtons() {
    try {
        // Load PayPal SDK with client ID
        await loadPayPalSDK();
        
        // Initialize buttons for each registration type
        initPayPalButton('paypal-button-argentinos', {
            amount: '25.00',  // ~$25 USD equivalent for $25,000 ARS
            currency: 'USD',
            description: 'Inscripción Lacanoamericana - Argentinos'
        });
        
        initPayPalButton('paypal-button-extranjeros', {
            amount: '80.00',
            currency: 'USD',
            description: 'Inscripción Lacanoamericana - Extranjeros'
        });
        
        initPayPalButton('paypal-button-becas', {
            amount: '12.50',  // ~$12.50 USD equivalent for $12,500 ARS
            currency: 'USD',
            description: 'Inscripción Lacanoamericana - Beca Estudiantes'
        });
        
    } catch (error) {
        console.error('Error initializing PayPal:', error);
        // Show fallback message
        document.querySelectorAll('.paypal-button-container').forEach(container => {
            container.innerHTML = `
                <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; text-align: center;">
                    <p><strong>Configuración de PayPal requerida</strong></p>
                    <p>Contacte al administrador para activar los pagos</p>
                </div>
            `;
        });
    }
}

async function loadPayPalSDK() {
    return new Promise((resolve, reject) => {
        if (window.paypal) {
            resolve();
            return;
        }
        
        if (!PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID === 'YOUR_LIVE_PAYPAL_CLIENT_ID_HERE') {
            reject(new Error('PayPal Client ID not configured'));
            return;
        }
        
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
        document.head.appendChild(script);
    });
}

function initPayPalButton(containerId, paymentOptions) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        // Clear container
        container.innerHTML = '';
        
        // Create PayPal button using their SDK
        window.paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: paymentOptions.amount,
                            currency_code: paymentOptions.currency
                        },
                        description: paymentOptions.description
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    console.log('Payment completed:', details);
                    showPaymentSuccess(details);
                    
                    // Here you can add logic to send registration data to your email
                    // or integrate with a form service like Formspree, Netlify Forms, etc.
                    sendRegistrationConfirmation(details, containerId);
                });
            },
            onError: function(err) {
                console.error('PayPal error:', err);
                showPaymentError(err);
            },
            onCancel: function(data) {
                console.log('Payment cancelled:', data);
                showPaymentCancelled();
            },
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal'
            }
        }).render('#' + containerId);
        
    } catch (error) {
        console.error('Error initializing PayPal button:', error);
        container.innerHTML = '<p style="color: red;">Error al cargar el botón de pago</p>';
    }
}

function sendRegistrationConfirmation(paymentDetails, registrationType) {
    // Get form data from the active registration form
    const activeForm = document.querySelector('.tab-content.active form');
    if (!activeForm) return;
    
    const formData = new FormData(activeForm);
    const registrationData = Object.fromEntries(formData);
    
    // Add payment information
    registrationData.paymentId = paymentDetails.id;
    registrationData.paymentStatus = paymentDetails.status;
    registrationData.paymentAmount = paymentDetails.purchase_units[0].amount.value;
    registrationData.registrationType = registrationType;
    
    console.log('Registration data to send:', registrationData);
    
    // You can integrate this with email services:
    // - Formspree.io for simple form handling
    // - EmailJS for client-side email sending
    // - Netlify Forms if using Netlify hosting
    
    // Example with EmailJS (requires setup):
    // emailjs.send('your_service_id', 'your_template_id', registrationData);
}

function showPaymentSuccess(result) {
    const message = document.createElement('div');
    message.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 15px;
        border: 1px solid #c3e6cb;
        border-radius: 4px;
        margin: 10px 0;
    `;
    message.innerHTML = `
        <h4>¡Pago Exitoso!</h4>
        <p>Su inscripción ha sido procesada correctamente.</p>
        <p>ID de transacción: ${result.id}</p>
        <p>Recibirá un correo de confirmación en breve.</p>
    `;
    
    // Find the active tab and show message
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        activeTab.insertBefore(message, activeTab.firstChild);
    }
}

function showPaymentError(error) {
    const message = document.createElement('div');
    message.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 15px;
        border: 1px solid #f5c6cb;
        border-radius: 4px;
        margin: 10px 0;
    `;
    message.innerHTML = `
        <h4>Error en el Pago</h4>
        <p>Hubo un problema procesando su pago. Por favor, inténtelo nuevamente.</p>
        <p>Si el problema persiste, contacte al soporte técnico.</p>
    `;
    
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        activeTab.insertBefore(message, activeTab.firstChild);
    }
}

function showPaymentCancelled() {
    const message = document.createElement('div');
    message.style.cssText = `
        background: #fff3cd;
        color: #856404;
        padding: 15px;
        border: 1px solid #ffeeba;
        border-radius: 4px;
        margin: 10px 0;
    `;
    message.innerHTML = `
        <h4>Pago Cancelado</h4>
        <p>El pago fue cancelado. Puede intentarlo nuevamente cuando esté listo.</p>
    `;
    
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        activeTab.insertBefore(message, activeTab.firstChild);
    }
}