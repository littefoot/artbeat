

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
                        <p>Toronto East</p>
                        <p>Ontario, Canada</p>
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
                    <div class="footer-socials">
                        <a href="https://www.linkedin.com/in/artbeatca/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61586936681653" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                    </div>
                    <div class="footer-credits">
                        <span>&copy; ${new Date().getFullYear()} ARTBEAT</span>
                    </div>
                    <div class="footer-policies">
                         <a href="policies.html#shipping">Shipping &amp; Returns</a>
                         <a href="policies.html#terms">Terms &amp; Conditions</a>
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
