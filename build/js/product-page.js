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
});

async function loadProduct(id) {
    try {
        const response = await fetch(`${API_BASE}/getProduct?id=${id}`);
        if (!response.ok) throw new Error('Product not found');

        const { data } = await response.json();
        renderProduct(data);
    } catch (error) {
        console.error(error);
        // Fallback or Error UI
        document.querySelector('.product-title').textContent = 'Artwork Not Found';
    }
}

function renderProduct(product) {
    // Images
    const imgEl = document.querySelector('.product-image-wrapper img');
    if (imgEl && product.images.length) {
        imgEl.src = product.images[0];
        imgEl.alt = product.name;
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
    const existingSelect = document.querySelector('.variation-select');
    if (existingSelect) existingSelect.remove();

    if (product.prices && product.prices.length > 0) {
        let selectedPrice = product.prices[0];

        // If multiple variations, create dropdown
        if (product.prices.length > 1) {
            const select = document.createElement('select');
            select.className = 'variation-select btn-outline'; // Reuse outline style roughly
            select.style.flex = '1';
            select.style.marginRight = '1rem';
            select.style.padding = '0 1rem';
            select.style.height = '50px';
            select.style.cursor = 'pointer';
            select.style.border = '1px solid #E5E5E5';
            select.style.borderRadius = '6px';
            select.style.backgroundColor = 'transparent';
            select.style.fontSize = '0.95rem';
            select.style.fontFamily = 'inherit';

            product.prices.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = `${p.nickname} - ${p.formatted}`;
                select.appendChild(opt);
            });

            // Handle Change
            select.onchange = (e) => {
                const newPriceId = e.target.value;
                selectedPrice = product.prices.find(p => p.id === newPriceId);
                priceEl.textContent = selectedPrice.formatted;
                buyBtn.onclick = () => initiateCheckout(selectedPrice.id);
            };

            // Insert before buttons
            actionsDiv.prepend(select);
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
            customLink.className = "custom-order-link";
            customLink.style.display = "block";
            customLink.style.marginTop = "1rem";
            customLink.style.fontSize = "0.9rem";
            customLink.style.textDecoration = "underline";
            customLink.style.color = "#666";
            customLink.style.textAlign = "center";
            customLink.style.cursor = "pointer";

            // Wire up to existing global modal logic (via hash or click)
            customLink.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = document.getElementById('contact-modal');
                if (modal) modal.classList.add('active');
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
