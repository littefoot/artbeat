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

    // Hero Lightbox Functionality
    initHeroLightbox();
});

// Lightbox State
let lightboxImages = [];
let lightboxIndex = 0;

function initHeroLightbox() {
    const slideshow = document.getElementById('heroSlideshow');
    const lightbox = document.getElementById('hero-lightbox');

    if (!slideshow || !lightbox) return;

    const images = slideshow.querySelectorAll('.slideshow-image');
    const lightboxImg = document.getElementById('lightbox-image');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Collect image sources
    lightboxImages = Array.from(images).map(img => img.src);

    // Open lightbox on slideshow click
    slideshow.addEventListener('click', () => {
        lightboxIndex = 0;
        openLightbox();
    });

    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    // Close
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'Escape') closeLightbox();
    });

    function openLightbox() {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateLightboxImage();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        lightboxIndex += direction;
        if (lightboxIndex < 0) lightboxIndex = lightboxImages.length - 1;
        if (lightboxIndex >= lightboxImages.length) lightboxIndex = 0;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        lightboxImg.classList.remove('visible');
        setTimeout(() => {
            lightboxImg.src = lightboxImages[lightboxIndex];
            lightboxImg.onload = () => {
                lightboxImg.classList.add('visible');
            };
        }, 150);
    }
}

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
