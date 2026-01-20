/**
 * Artbeat Dynamic Shop Logic
 * Fetches products from Firebase Cloud Functions and handles client-side pagination.
 */

const PROJECT_ID = 'artbeat-shop';
const REGION = 'us-central1';
// const API_URL = `http://127.0.0.1:5001/${PROJECT_ID}/${REGION}/getProducts`; // Local Testing
const API_URL = `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/getProducts`;

// State
let allProducts = [];
let visibleCount = 0;
const BATCH_SIZE = 9;

document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreContainer = document.querySelector('.load-more-container');

    // Check if we are on the home page with a gallery grid
    if (galleryGrid) {
        fetchProducts(galleryGrid, loadMoreContainer, loadMoreBtn);
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            renderNextBatch(galleryGrid, loadMoreContainer, loadMoreBtn);
        });
    }
});

async function fetchProducts(container, btnContainer, btn) {
    try {
        console.log('Fetching products from:', API_URL);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch products');

        const { data } = await response.json();

        if (data && data.length > 0) {
            allProducts = data;
            // Clear static loading placeholders
            container.innerHTML = '';
            // Render first batch
            renderNextBatch(container, btnContainer, btn);
        } else {
            console.log('No active products found.');
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No works currently available.</p>';
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function renderNextBatch(container, btnContainer, btn) {
    const total = allProducts.length;
    const nextLimit = visibleCount + BATCH_SIZE;
    const batch = allProducts.slice(visibleCount, nextLimit);

    batch.forEach((product, index) => {
        // Create Card
        const article = document.createElement('article');
        article.className = 'artwork-card';
        // Fade in animation
        article.style.animation = `fadeUp 0.6s ease forwards ${index * 0.1}s`;
        article.style.opacity = '0'; // Start invisible for animation

        // Image Fallback
        const imageSrc = product.images[0] || 'assets/art1.png';

        // Metadata
        const priceDisplay = product.price ? product.price.formatted : 'Enquire';
        const dimensions = product.metadata.dimensions || 'Dimensions TBD';
        const medium = product.metadata.medium || 'Print';
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

    // Update count
    visibleCount = nextLimit;

    // Toggle Button Visibility
    if (visibleCount >= total) {
        btnContainer.style.display = 'none';
        // Optional: btn.disabled = true;
    } else {
        btnContainer.style.display = 'block';
        btn.textContent = 'Load More';
    }
}
