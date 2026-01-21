This **`BrandDNA.md`** file serves as the blueprint for **ARTBEAT**. It aligns the authentic artistic vision of Romel with the refined, gallery-style aesthetic of [Tunbridge Gallery](https://tunbridgegallery.com.au/), adapted for a digital-first experience.

---

# BrandDNA: ARTBEAT

## 1. Brand Identity

* **Brand Name:** ARTBEAT
* **Founder:** Romel
* **Tagline:** "Home is where the art is"
* **Mission Statement:** To function as a living archive and visual diary, creating images that live between structure and intuition. ARTBEAT connects people emotionally through moments observed and held long enough to be felt.
* **Core Philosophy:** 
    *   **The Living Archive:** Art as a record of time, travel, and memory (Canada, Europe, Dominican Republic).
    *   **Care & Restraint:** Valuing the quiet balance between discipline and intuition; bold without breaking the vow of care.
    *   **Authenticity:** Not about trend or spectacle, but about noticing light, gesture, and texture.

---

## 2. Target Audience

* **Demographics:** Ages 25–55.
*   **Personas:** 
    *   **The Collector:** Seeks meaning and provenance in "living archives."
    *   **The Design Conscious:** Appreciates minimalism, clean lines, and "gallery" aesthetics for their home.
    *   **The Storyseeker:** Values the narrative of the artist (Romel) and the emotional weight of the piece.
* **Psychographics:** Values authenticity, mindfulness, and pieces that "protect the space" they inhabit.

---

## 3. Visual & Aesthetic Direction (The "Tunbridge" Look)

*   **Tone & Mood:** Minimalist, High-End Gallery, Contemplative, "Clean Room."
*   **Visual Style:** 
    *   **Whitespace:** Expansive use of white (#FFFFFF) to let the art breathe.
    *   **Grid:** Clean, structured grids for artwork listings.
    *   **Typography:** **Quicksand** (Google Font) for all headings and body text to provide a modern, approachable, yet refined feel.
*   **Color Palette:**
    *   **Primary Background:** `#FFFFFF` (White)
    *   **Primary Text:** `#000000` (Black)
    *   **Secondary Text/Accents:** `#666666` (Dark Grey) - used for dimensions, specs.
    *   **Background Accents:** `#F5F5F5` (Light Grey) - used for artwork containers on product pages.
*   **Imagery:** High-resolution art on clean backgrounds. Placeholder images to be used initially.
*   **Logo:** `99. Assets/Artbeat_Logo_Main.svg`

---

## 4. Website Architecture

*   **Structure:** Multi-page "Gallery" structure.
*   **Navigation:**
    *   **Top Bar:** Logo (Left/Center), Navigation Links (Right/Split).
    *   **Links:** All Artwork, Premium Artwork, Collections, Artists, About, Contact.

### Page Breakdowns

#### A. Home Page
*   **Hero Section:** Minimalist. Either a single feature image or a subtle carousel. Overlay text: "Authentic Digital Experience" or Brand Tagline.
*   **Latest Artworks:** clean grid layout. 
    *   *Card Structure:* Image + Dimensions + Price (Minimal).
*   **Collections Feature:** "The Living Archive" highlighted collection.

#### B. About Page ("The Collection")
*   **Layout:** Text-heavy, editorial style with interspersed landscape imagery.
*   **Sections:**
    *   **Intro:** Romel's Vision.
    *   **The Archive:** Story of the work (Travel, Roots, Dominican Republic).
    *   **The Process:** "Between photography and painting."
    *   **Philosophy:** "Care for form."

#### C. Product Page ("The Artwork")
*   **Layout:** Two-Column Split.
*   **Left Column:** Large Artwork Image in a `#F5F5F5` container.
*   **Right Column (Sticky):**
    *   **Artist Name:** ROMEL
    *   **Title:** [Artwork Title]
    *   **ID:** Pill-shaped badge (e.g., ID #AB-001)
    *   **Price:** Large, clear font.
    *   **Specs:** Boxed info (Medium, Dimensions).
    *   **Actions:** "Enquire Now" (Solid Black), "Add to Favourites" (Outline).
    *   **Accordion Details:** "About the Artist", "Artwork Description".

---

## 5. Design System & Code Standards

**Objective:** To replicate the Tunbridge Gallery feel using the Artbeat identity.

### CSS Variables
```css
:root {
  /* Typography */
  --font-primary: 'Quicksand', sans-serif;
  
  /* Color Palette */
  --color-bg-body: #FFFFFF;
  --color-bg-artwork: #F5F5F5; /* Light grey for image backing */
  --color-text-main: #000000;
  --color-text-secondary: #666666;
  --color-border: #E5E5E5;
  
  /* Buttons */
  --btn-bg-primary: #000000;
  --btn-text-primary: #FFFFFF;
  
  /* Spacing */
  --spacing-container: 1200px;
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 2rem;     /* 32px */
  --spacing-xl: 4rem;     /* 64px */
}

body {
  font-family: var(--font-primary);
  background-color: var(--color-bg-body);
  color: var(--color-text-main);
  margin: 0;
  line-height: 1.6;
}
```

### HTML Structure: Product Page (Reference)
```html
<div class="product-container">
  <!-- Left Column: Artwork -->
  <div class="product-media">
    <div class="image-wrapper" style="background-color: var(--color-bg-artwork);">
      <img src="placeholder.jpg" alt="Artwork by Romel">
      <button class="expand-icon">View Larger</button>
    </div>
  </div>

  <!-- Right Column: Details -->
  <div class="product-details">
    <h2 class="artist-name">ROMEL</h2>
    
    <div class="title-row">
      <h1 class="artwork-title">Visual Note #04</h1>
      <span class="artwork-id">ID #AB-2026</span>
    </div>
    
    <p class="collection-link">From: The Dominican Series</p>
    
    <div class="price">$1,200.00</div>
    
    <div class="specs-grid">
      <div class="spec-box">
        <label>Medium</label>
        <span>Digital Archive Print</span>
      </div>
      <div class="spec-box">
        <label>Dimensions</label>
        <span>24 x 36 in</span>
      </div>
    </div>
    
    <div class="actions">
      <button class="btn-enquire">Enquire Now</button>
      <button class="btn-fav">
        <svg>...</svg>
      </button>
    </div>
    
    <!-- Accordions -->
    <details>
      <summary>About the Artist</summary>
      <p>Romel is an artist whose work is shaped by travel...</p>
    </details>
  </div>
</div>
```

### HTML Structure: Global Nav
```html
<nav class="site-header">
  <div class="logo">
    <img src="/assets/Artbeat_Logo_Main.svg" alt="ARTBEAT">
  </div>
  <div class="nav-links">
    <a href="/artworks">All Artworks</a>
    <a href="/collections">Collections</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </div>
</nav>
```

---

## 6. Products & Services

| Category | Offerings |
| --- | --- |
| **The Prints** | High-resolution, archival grade prints (Framed/Unframed). |
| **The Collection** | Curated series ("The Dominican Series", "Visual Notes"). |
| **Commissions** | Tailored works ("Protecting the Space"). |

---

## 7. Next Steps (Development Phase) - *DO NOT EXECUTE YET*

1.  **Setup Project:** Initialize framework (Vanilla or simple SSG).
2.  **Styles:** Implement `index.css` with the variables above.
3.  **Components:** Build `Header`, `Footer`, `ProductCard`, `ProductDetail`.
4.  **Content:** Populate with Romel's bio and placeholder images.

## 8. Inspiration

https://tunbridgegallery.com.au/