/**
 * Artbeat Product Page Logic
 * Handles dynamic rendering and Stripe Checkout integration.
 */

const PROJECT_ID = 'artbeat-shop';
const REGION = 'us-central1';
const API_BASE = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net`;

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get Product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        // Handle missing ID (redirect or show error)
        console.error("No product ID specified.");
        return;
    }

    // 2. Fetch Data
    await loadProduct(productId);

    // 3. Setup Lightbox
    setupLightbox();
});

function setupLightbox() {
    // Create Lightbox DOM if not exists
    if (!document.querySelector('.lightbox-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-content">
                <img src="" alt="Zoomed view">
            </div>
        `;
        document.body.appendChild(overlay);

        // Close events
        const closeBtn = overlay.querySelector('.lightbox-close');

        const closeLightbox = () => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300); // Wait for transition
        };

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });

        // Escape key close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // Attach click to main product image
    const mainImg = document.querySelector('.product-image-wrapper img');
    if (mainImg) {
        mainImg.addEventListener('click', () => {
            if (!mainImg.src) return;

            const overlay = document.querySelector('.lightbox-overlay');
            const lightboxImg = overlay.querySelector('.lightbox-content img');

            lightboxImg.src = mainImg.src;
            overlay.style.display = 'flex';
            // Force reflow for transition
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });
        });
    }
}

async function loadProduct(id) {
    try {
        const response = await fetch(`${API_BASE}/getProduct?id=${id}`);
        if (!response.ok) throw new Error('Product not found');

        const { data } = await response.json();
        renderProduct(data);
    } catch (error) {
        console.error(error);
    }
}

function renderProduct(product) {
    // Share Button Logic (Moved inside to access 'product')
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        // Clone to remove old listeners
        const newShareBtn = shareBtn.cloneNode(true);
        shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);

        newShareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: product.name,
                        text: `Check out ${product.name} by ${product.metadata.artist || 'Romel'}`,
                        url: window.location.href,
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalHTML = newShareBtn.innerHTML;
                    newShareBtn.innerHTML = '<span>Copied!</span>';
                    setTimeout(() => {
                        newShareBtn.innerHTML = originalHTML;
                    }, 2000);
                });
            }
        });
    }



    const wrapper = document.querySelector('.product-image-wrapper');

    // Images
    const mainImg = wrapper.querySelector('.main-artwork');
    const thumbnailsContainer = document.querySelector('.product-thumbnails');

    if (mainImg && product.images.length) {
        mainImg.src = product.images[0];
        mainImg.alt = product.name;
    }

    // Generate Thumbnails (Artwork + Framed)
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = ''; // Clear existing

        const views = [
            { id: 'framed', icon: 'assets/frame_empty.webp', label: 'Framed' },
            { id: 'artwork', icon: product.images[0], label: 'Artwork' }
        ];

        // Initialize Framed State by default if it's first
        if (views[0].id === 'framed') {
            wrapper.classList.add('mode-framed');
        }

        views.forEach((view, index) => {
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${view.icon}" alt="${view.label}">`;

            thumb.addEventListener('click', () => {
                // Update Active State
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                // Toggle View Mode
                if (view.id === 'framed') {
                    wrapper.classList.add('mode-framed');
                } else {
                    wrapper.classList.remove('mode-framed');
                }
            });

            thumbnailsContainer.appendChild(thumb);
        });
    }

    // Text Content
    document.querySelector('.product-title').textContent = product.name;
    document.title = product.name + " | ARTBEAT"; // Update Tab Title
    document.querySelector('.product-artist').textContent = product.metadata.artist || 'Romel';
    const collection = product.metadata.collection || 'The Collection';
    document.querySelector('.product-collection-link').textContent = collection;

    // Badge
    const badge = document.querySelector('.product-id-badge');
    if (badge) badge.textContent = `ID #${product.metadata.id || '---'}`;

    // Specs
    const specs = document.querySelectorAll('.spec-value');
    if (specs.length >= 2) {
        specs[0].textContent = product.metadata.medium || 'Print';
        specs[1].textContent = product.metadata.dimensions || 'Variable';
    }

    // Variations (Prices) Configuration
    const priceEl = document.querySelector('.product-price');
    const buyBtn = document.querySelector('.btn-primary');
    const actionsDiv = document.querySelector('.product-actions');

    // Remove existing selector if any (re-render safety)
    const existingContainer = document.querySelector('.variation-selector-container');
    if (existingContainer) existingContainer.remove();

    if (product.prices && product.prices.length > 0) {
        let selectedPrice = product.prices[0];

        // If multiple variations, create dropdown
        if (product.prices.length > 1) {
            const variationContainer = document.createElement('div');
            variationContainer.className = 'variation-selector-container';
            variationContainer.style.marginBottom = '1.5rem';
            variationContainer.style.width = '100%';

            product.prices.forEach((p, index) => {
                const label = document.createElement('label');
                label.className = 'variation-option';

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'product-variation';
                input.value = p.id;
                if (index === 0) input.checked = true;

                const span = document.createElement('span');
                span.textContent = `${p.nickname} - ${p.formatted}`;

                label.appendChild(input);
                label.appendChild(span);
                variationContainer.appendChild(label);

                // Handle Change
                input.onchange = () => {
                    selectedPrice = p;
                    priceEl.textContent = selectedPrice.formatted;
                    buyBtn.onclick = () => initiateCheckout(selectedPrice.id);
                };
            });

            // Insert before buttons
            actionsDiv.prepend(variationContainer);
        }

        // Initial State
        priceEl.textContent = selectedPrice.formatted;
        buyBtn.textContent = "Order Now";
        buyBtn.onclick = () => initiateCheckout(selectedPrice.id);
        buyBtn.disabled = false; // Enable button

        // Add "Contact the artist for custom orders" link if not already present
        const existingCustomLink = document.querySelector('.custom-order-link');
        if (!existingCustomLink) {
            const customLink = document.createElement('a');
            customLink.href = "#contact";
            customLink.textContent = "Contact the artist for custom orders";
            customLink.className = "custom-order-link btn btn-secondary"; // Use existing button classes
            // Reset some button styles to fit full width below
            customLink.style.display = "flex";
            customLink.style.width = "100%";
            customLink.style.marginTop = "1rem";
            customLink.style.marginBottom = "2rem"; // Add breathing room
            customLink.style.textAlign = "center";
            customLink.style.justifyContent = "center";

            // Wire up to existing global modal logic (via hash or click)
            customLink.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = document.getElementById('contact-modal');
                if (modal) {
                    modal.classList.add('active');
                    // Autofill Message
                    const msgInput = modal.querySelector('textarea[name="message"]');
                    if (msgInput) {
                        msgInput.value = `Hi Romel, I'm interested in a custom order related to "${product.name}".`;
                    }
                }
            });

            actionsDiv.after(customLink);
        }
    } else {
        priceEl.textContent = "Enquire for Price";
        buyBtn.textContent = "Enquire Now";
        buyBtn.onclick = () => window.location.href = "/contact";
    }

    // Description (Accordion 2)
    const descP = document.querySelectorAll('.accordion-content p')[1];
    if (descP) descP.textContent = product.description || descP.textContent;
}

async function initiateCheckout(priceId) {
    const btn = document.querySelector('.btn-primary');
    const originalText = btn.textContent;
    btn.textContent = "Loading...";
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/createCheckoutSession`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId: priceId,
                successUrl: `${window.location.origin}/success.html`,
                cancelUrl: window.location.href,
            }),
        });

        const session = await response.json();
        if (session.url) {
            window.location.href = session.url;
        } else {
            throw new Error("No checkout URL returned");
        }
    } catch (error) {
        console.error("Checkout failed:", error);
        alert("Unable to start checkout. Please try again.");
        btn.textContent = originalText;
        btn.disabled = false;
    }
}
