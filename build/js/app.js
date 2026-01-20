/**
 * Artbeat Dynamic Shop Logic
 * Fetches products from Firebase Cloud Functions (Stripe) and renders them.
 */

// Replace with your actual Project ID based URL after deployment
// For now, we'll try to determine it dynamically or default to the standard Firebase format
const PROJECT_ID = 'artbeat-shop';
const REGION = 'us-central1';
const API_URL = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/getProducts`;

document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');

    // Check if we are on the home page with a gallery grid
    if (galleryGrid) {
        fetchProducts(galleryGrid);
    }
});

async function fetchProducts(container) {
    try {
        // Show loading state (optional, or just keep placeholder content until load)
        console.log('Fetching products from:', API_URL);

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch products');

        const { data } = await response.json();

        if (data && data.length > 0) {
            renderGallery(container, data);
        } else {
            console.log('No active products found in Stripe.');
            // Optionally handle empty state
        }
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback: The static HTML placeholders will remain visible if we don't clear them
        // or we can show an error toast.
    }
}

function renderGallery(container, products) {
    // Clear static placeholders
    container.innerHTML = '';

    products.forEach((product, index) => {
        // Create Card
        const article = document.createElement('article');
        article.className = 'artwork-card';
        article.style.animationDelay = `${index * 0.1}s`; // Stagger animation

        // Image
        const imageSrc = product.images[0] || 'assets/art1.png'; // Fallback

        // Price Formatting
        const priceDisplay = product.price ? product.price.formatted : 'Enquire';

        // Dimensions/Specs from Metadata or Description
        // Assuming metadata has 'dimensions' or we parse it from description
        const dimensions = product.metadata.dimensions || 'Dimensions TBD';
        const medium = product.metadata.medium || 'Print';

        // Artist (Default to Romel if not specified)
        const artist = product.metadata.artist || 'Romel';

        article.innerHTML = `
            <a href="product.html?id=${product.id}">
                <div class="image-container">
                    <img src="${imageSrc}" alt="${product.name}">
                </div>
            </a>
            <div class="artwork-info">
                <span class="artwork-title" style="display:block; font-weight:600; font-size:1.1rem; margin-bottom:2px;">${product.name}</span>
                <span class="artist-name" style="display:block; color:#666; font-size:0.9rem; margin-bottom:6px;">${artist}</span>
                <span class="artwork-specs">${dimensions} (${medium})</span>
                <span class="artwork-price">${priceDisplay}</span>
            </div>
        `;

        container.appendChild(article);
    });
}
