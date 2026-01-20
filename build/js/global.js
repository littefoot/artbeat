
document.addEventListener('DOMContentLoaded', () => {
    // Contact Modal Logic
    const contactLinks = document.querySelectorAll('a[href="#contact"]'); // Target specific contact links
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contact-form');

    if (modal) {
        // Open
        contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        // Close
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Form Submit
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // reCAPTCHA Verification
                if (typeof grecaptcha !== 'undefined') {
                    const recaptchaResponse = grecaptcha.getResponse();
                    if (recaptchaResponse.length === 0) {
                        alert("Please verify that you are not a robot.");
                        return;
                    }
                }

                const btn = contactForm.querySelector('.btn-submit');
                const originalText = btn.textContent;

                const name = contactForm.querySelector('input[type="text"]').value;
                const email = contactForm.querySelector('input[type="email"]').value;
                const message = contactForm.querySelector('textarea').value;
                let recaptchaToken = null;
                if (typeof grecaptcha !== 'undefined') {
                    recaptchaToken = grecaptcha.getResponse();
                }

                btn.textContent = "Sending...";
                btn.disabled = true;

                // Send to Backend
                fetch('/sendContactEmail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message, recaptchaToken })
                })
                    .then(response => {
                        if (response.ok) return response.json();
                        throw new Error('Network response was not ok');
                    })
                    .then(data => {
                        btn.textContent = "Message Sent";
                        setTimeout(() => {
                            modal.classList.remove('active');
                            btn.textContent = originalText;
                            btn.disabled = false;
                            contactForm.reset();
                            if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
                        }, 1000);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        btn.textContent = "Error. Try again.";
                        btn.disabled = false;
                        setTimeout(() => {
                            btn.textContent = originalText;
                        }, 3000);
                    });
            });
        }
    }
});
