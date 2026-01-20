---
name: Launch Art Gallery E-commerce
description: End-to-end guide for replicating the Artbeat/Tunbridge serverless e-commerce stack.
---

# Skill: Launch Art Gallery E-commerce

This skill documents the complete lifecycle for building and deploying a premium, serverless art gallery shop using Firebase, Stripe, and Elastic Email.

## Phase 0: Client Foundation (Prerequisites)

Before a single line of code is written, the Client must provide the following access and assets.

### 1. Domain Registration
*   **Action**: Client registers the domain (e.g., `brandname.ul`).
*   **Requirement**: Client must provide **DNS Access** (or login credentials) to the Registrar (Namecheap, GoDaddy, Cloudflare) for SSL and Verification steps later.

### 2. Hosting & Cloud (Firebase)
*   **Create Project**: Go to [Firebase Console](https://console.firebase.google.com).
*   **Billing (Critical)**: Upgrade the project to the **Blaze Plan** (Pay-as-you-go). This is required for Cloud Functions to talk to Stripe/Email APIs.
*   **Team Access**: Go to *Project Settings > Users and permissions* and add the Developer's email as an **Editor** or **Owner**.

### 3. Design Assets & Brand Identity
*   **BrandDNA.md**: Create a markdown file to define the core identity.
    *   *Key Elements*: Brand Name, Tagline, Target Audience, Visual Aesthetic (e.g., "Minimalist", "Tunbridge Gallery style").
*   **Google Drive**: Client compiles a single Google Drive folder containing:
    *   **Logo**: SVG format (preferred) or high-res transparent PNG.
    *   **Hero Images**: 2-3 High-resolution lifestyle shots. *Clean Room Rule*: Images should have minimal text/noise.
    *   **Product Images**: Standardized aspect ratio (e.g., all 1:1 or 4:5).
    *   **Copy Deck**: A text file with the Brand Name, Tagline, Bio, and Policy text (Shipping/Returns).

### 4. Financial Infrastructure (Stripe)
*   **Account**: Client creates a verified account at [dashboard.stripe.com](https://dashboard.stripe.com).
*   **Banking**: Client links their business bank account for payouts.
*   **Product Catalogue**: Client (or Dev) populates the "Products" section.
    *   *Images*: Upload standard images.
    *   *Pricing*: Set definitive prices per item.
*   **Developer Access**: Go to *Settings > Team* and add the Developer as **Administrator** or **Developer**.

### 5. Transactional Email (Elastic Email)
*   **Setup**: Create an account at [Elastic Email](https://elasticemail.com).
*   **Verification**: Verify the sending domain (DNS records will be needed from Step 1).
*   **API Key**: Go to *Settings > API* and generate a "Public" or "Access" key for the web form.
*   **Team Access (Preferred)**: Alternatively, go to *Account > Users* and invite the Developer by email. This grants them individual credentials without sharing the main account password.

---

## Phase 1: Project Initialization

1.  **Scaffold**:
    ```bash
    mkdir brand-shop && cd brand-shop
    firebase init
    ```
    *   Select **Hosting** and **Functions**.
    *   Use the Project ID created in Phase 0.

2.  **Environment Config**:
    ```bash
    firebase functions:config:set stripe.secret="sk_live_..." elastic.key="API_KEY"
    ```

3.  **Local Dev**:
    *   Create `package.json` with scripts: `"dev": "firebase serve --only hosting,functions"`

---

## Phase 2: Backend Development (Functions)

*   **Dependencies**: `stripe`, `cors`, `axios` (for email).
*   **Core Endpoints**:
    1.  `getProducts`: Fetch active Stripe products with prices.
    2.  `getProduct`: Fetch individual item details + expansions.
    3.  `createCheckoutSession`: Handle Stripe Checkout redirection.
    4.  `sendContactEmail`: Proxy request to Elastic Email (hides API key).

---

## Phase 3: Frontend Construction

*   **Design System (`styles.css`)**:
    *   Implement "Clean Room" aesthetic (White/Black/Grey).
    *   Responsive Grid for gallery.
*   **Home Page (`index.html` + `app.js`)**:
    *   Fetch `getProducts` and render Grid.
*   **Product Page (`product.html` + `product-page.js`)**:
    *   Parse URL `?id=`.
    *   Fetch `getProduct`.
    *   "Order Now" -> Triggers Stripe Checkout.
*   **Contact Form**:
    *   Global Modal.
    *   Google reCAPTCHA v2 Integration.

---

## Phase 4: Verification & Polish

1.  **reCAPTCHA**: Register domain on Google Admin Console. Add Site Keys.
2.  **Stripe**: Test "Order Now" flow with Test Mode, then switch keys to Live.
3.  **Cross-Browser**: Check flexbox layouts on Safari/Mobile.

---

## Phase 5: Launch

1.  **Deploy**: `firebase deploy`.
2.  **Domain Mapping**: In Firebase Hosting console, add Custom Domain. Update DNS A-Records.
3.  **Handoff**: Provide Client with "Customer Portal" link (`buy.stripe.com`) for them to manage orders.
