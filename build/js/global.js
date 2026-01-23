

document.addEventListener('DOMContentLoaded', () => {
    // Inject Global Footer
    const footerContainer = document.getElementById('global-footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
        <footer class="site-footer">
            <div class="container">
                <div class="footer-grid">
                    <!-- Col 1: Address & Contact -->
                    <div class="footer-col">
                        <h4>Artbeat Studio</h4>
                        <p>246 Coronation Dr.</p>
                        <p>Scarborough, ON M1E 2J4</p>
                        <br>
                        <a href="mailto:lemoralexis@gmail.com">Romel@artbeat.ca</a>
                        <a href="tel:+14378558660">(+1) 437 855 8660</a>
                    </div>

                    <!-- Col 2: Links & Hours -->
                    <div class="footer-col">
                        <h4>Visit</h4>
                        <p>Mon - Fri: 10am - 6pm</p>
                        <p>Sat: 11am - 5pm</p>
                        <br>
                        <div class="footer-links">
                            <a href="https://billing.stripe.com/p/login/7sY3cx5BsbAs4Ve8OC7kc00" target="_blank">Customer Portal</a>
                            <a href="framing.html">Framing</a>
                        </div>
                    </div>

                    <!-- Col 3: About the Artist -->
                    <div class="footer-col acknowledgement-col">
                        <h4>Artist - Romel</h4>
                        <p class="acknowledgement-text">
                            Romel is an artist whose work functions as a living archive. Shaped by travel and lived experience, his practice creates images that exist between structure and intuition, defining Artbeat as a quiet search for home. 
                            <a href="about.html" style="text-decoration: underline; color: inherit; display: block; text-align: right; margin-top: 0.5rem;">Read more</a>
                        </p>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="credits">
                        <span>&copy; ${new Date().getFullYear()} ARTBEAT</span>
                    </div>
                    <div class="footer-policies">
                         <a href="policies.html#shipping">Shipping & Returns</a>
                         <a href="policies.html#terms">Terms & Conditions</a>
                         <a href="policies.html#privacy">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }

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
