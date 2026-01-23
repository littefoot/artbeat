---
description: Comprehensive steps to setup, design, and deploy a dynamic Art Gallery E-commerce site with Firebase and Stripe
---

# Art Gallery E-commerce Deployment Workflow

This workflow documents the end-to-end process for building a dynamic art gallery e-commerce site, from initial asset gathering to live deployment.

## Phase 0: Foundation & Accounts (Pre-Code)

### 1. Asset Gathering & Brand Identity
*   **Create `BrandDNA.md`**: Define the core identity.
    *   *Questions to answer:* Branding Name? Tagline? Target Audience? Visual Aesthetic (e.g., "Minimalist", "Tunbridge Gallery style")?
*   **Gather Assets**:
    *   **Logo**: SVG preferred (e.g., `logo.svg`).
    *   **Hero Images**: High-res, minimal text.
    *   **Product Images**: Consistent aspect ratio (e.g., 1:1 or 4:5).
    *   **Copy text**: Bio, Manifesto, Policies ("Shipping", "Returns").

### 2. Stripe Setup (The Catalog & Payments)
*   **Create Account**: Sign up at [dashboard.stripe.com](https://dashboard.stripe.com).
*   **Activate Payments**: Fill out business details to enable live transactions.
*   **Team Access**: Go to **Settings > Team** and add the Developer as an "Administrator" or "Developer".
*   **Populate Catalog**:
    *   Create **Products** (e.g., "Visual Note #01") with images.
    *   Add **Prices** (e.g., "50x60cm Print - $500").
    *   *Critical:* Use Metadata if needed for specs (Medium, Dimensions) or just use the Description.
*   **Get Keys**:
    *   Go to **Developers > API Keys**.
    *   Copy the **Secret Key** (`sk_live_...` or `sk_test_...`) for the Backend.
    *   Copy the **Publishable Key** (`pk_live_...` or `pk_test_...`) for the Frontend (if needed, though we used backend-only creation).

### 3. Firebase Setup (Hosting & Backend)
*   **Create Project**: Go to [console.firebase.google.com](https://console.firebase.google.com) and add a new project.
*   **Billing (Blaze Plan)**:
    *   **Required**: You *must* upgrade to the Blaze (Pay-as-you-go) plan.
    *   *Reason:* Cloud Functions require it to make external network requests to Stripe's API.
*   **Team Access**: Go to **Project Settings > Users and permissions** and add the Developer.

---

## Phase 1: Project Initialization (Local)

### 1. Initialize Codebase
*   **Create Directory**: `mkdir MyGallery && cd MyGallery`
*   **Initialize Firebase**:
    ```bash
    firebase init
    ```
    *   Select **Hosting** and **Functions**.
    *   **Hosting**: Set public directory to `build`. Single-page app? **Yes**.
    *   **Functions**: Javascript/TypeScript. Install dependencies? **Yes**.

### 2. Configure Environment
*   **Set Stripe Secret**:
    ```bash
    firebase functions:config:set stripe.secret="sk_live_..."
    ```
    *   *Verify:* `firebase functions:config:get`

---

## Phase 2: Backend Development (Functions)
Location: `functions/index.js`

1.  **Install Dependencies**:
    ```bash
    cd functions
    npm install stripe cors
    ```
2.  **Implement API**:
    *   `getProducts`: Securely fetch active products & prices from Stripe.
    *   `getProduct`: Fetch single product + expansions.
    *   `createCheckoutSession`: Accept `priceId`, return `session.url`.

---

## Phase 3: Frontend Construction
Location: `build/`

### 1. File Structure
*   `index.html`: Home page. Contains empty `.gallery-grid`.
*   `product.html`: Detail page. Contains "Loading..." skeletons.
*   `about.html`: Static editorial content (Bio, Philosophy).
*   `styles.css`: The Design System.

### 2. JavaScript Logic
*   `js/app.js` (Home):
    *   Fetch `/getProducts`.
    *   Generate HTML cards: Image, Title (H1), Artist (H2), Price.
*   `js/product-page.js` (Product):
    *   Parse `?id=...`.
    *   Fetch `/getProduct`.
    *   Update DOM elements.
    *   Check for Variations (Prices > 1) -> Render Dropdown.
    *   Bind "Order Now" button -> Call `/createCheckoutSession`.

---

## Phase 4: Styling & Polish
Location: `styles.css`

1.  **Design System**:
    *   **Colors**: `#FFFFFF` (Bg), `#000000` (Text), `#F5F5F5` (Accents).
    *   **Typography**: Clean sans-serif (e.g., Josefin Sans).
2.  **Layouts**:
    *   **Responsive Grid**: Auto-fill for artworks.
    *   **Editorial**: Centered, max-width text for About page.
3.  **Refinement**:
    *   Ensure no "Flash of Unstyled Content" (remove static placeholders).
    *   Add hover effects to artwork cards.

---

## Phase 5: Going Live (reCAPTCHA)

1.  **Register Site**:
    *   Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create).
    *   Select **reCAPTCHA v2** > **"I'm not a robot" Checkbox**.
    *   Add your domain: `artbeat-shop.web.app` (and any custom domains).
2.  **Update Code**:
    *   Replace the `data-sitekey` in `index.html`, `product.html`, and `about.html` with your new **Site Key**.
    *   *Note:* The current key is a "Test Key" that works on localhost but shows a warning on live sites.

---

## Phase 6: Deployment & Verification

1.  **Deploy**:
    ```bash
    firebase deploy
    ```
2.  **Verify**:
    *   **Status**: Check Firebase Console > Functions logs for any errors.
    *   **Live Site**:
        *   Does "Order Now" redirect to a specific Stripe Checkout page?
        *   Do new products added in Stripe appear on the home page after refresh?
