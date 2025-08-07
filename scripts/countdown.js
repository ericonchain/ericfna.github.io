// Countdown Timer Script
class CountdownTimer {
    constructor(targetDate, elements) {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = elements;
        this.interval = null;
        this.init();
    }

    init() {
        this.updateTimer();
        this.interval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.handleExpiredTimer();
            return;
        }

        const time = this.calculateTime(distance);
        this.updateDisplay(time);
    }

    calculateTime(distance) {
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    }

    updateDisplay(time) {
        this.elements.days.textContent = this.formatNumber(time.days);
        this.elements.hours.textContent = this.formatNumber(time.hours);
        this.elements.minutes.textContent = this.formatNumber(time.minutes);
        this.elements.seconds.textContent = this.formatNumber(time.seconds);
    }

    formatNumber(num) {
        return num < 10 ? `0${num}` : num;
    }

    handleExpiredTimer() {
        clearInterval(this.interval);
        this.elements.days.textContent = '00';
        this.elements.hours.textContent = '00';
        this.elements.minutes.textContent = '00';
        this.elements.seconds.textContent = '00';
        
        // Update message
        const messageElement = document.querySelector('.countdown-message');
        if (messageElement) {
            messageElement.textContent = '¡El evento ha comenzado!';
            messageElement.style.background = '#27ae60';
        }
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    // Check if all elements exist
    const allElementsExist = Object.values(countdownElements).every(el => el !== null);
    
    if (allElementsExist) {
        // Set target date to September 25, 2024
        const targetDate = 'March 12, 2026 09:00:00';
        new CountdownTimer(targetDate, countdownElements);
    }
});

// Add animation to countdown numbers when they change
function animateCountdownChange(element) {
    element.style.transform = 'scale(1.1)';
    element.style.color = '#f39c12';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 200);
}

// Observer for countdown changes
const observeCountdownChanges = () => {
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    
    countdownNumbers.forEach(number => {
        let lastValue = number.textContent;
        
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    const currentValue = number.textContent;
                    if (currentValue !== lastValue) {
                        animateCountdownChange(number);
                        lastValue = currentValue;
                    }
                }
            });
        });

        observer.observe(number, {
            childList: true,
            characterData: true,
            subtree: true
        });
    });
};

// Initialize observer when DOM is ready
document.addEventListener('DOMContentLoaded', observeCountdownChanges);
