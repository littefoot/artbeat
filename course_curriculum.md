# The Artbeat Stack: Building a Premium Serverless Art Gallery
**Course Curriculum for Beginners**

## Course Description
This course takes you from zero coding knowledge to deploying a high-end, fully functional e-commerce art gallery. You will build a "serverless" application using industry-standard tools: **Firebase** (Google's cloud platform), **Stripe** (for payments), and **Vanilla Web Technologies** (HTML, CSS, JavaScript).

**Target Audience:** Complete beginners, Artists, or Designers who want to build their own independent sales platform.

---

## Module 0: The Blueprint (Client Prerequisites)
*Before writing code, we must secure the land and materials.*

### Lesson 0.1: Domain Name
*   **Topic:** Securing your digital address.
*   **Action Items:**
    *   Register a domain (e.g., `brandname.art` or `.com`) via a registrar like GoDaddy or Namecheap.
    *   Ensure you have login access to the DNS settings (needed later for verification).

### Lesson 0.2: Cloud Hosting (Firebase)
*   **Topic:** Setting up the project infrastructure.
*   **Action Items:**
    *   Create a project in the [Firebase Console](https://console.firebase.google.com).
    *   **CRITICAL:** Upgrade the project to the **Blaze Plan** (Pay-as-you-go). This authenticates your account to use external APIs like Stripe.

### Lesson 0.3: Asset Collection (Google Drive)
*   **Topic:** Gathering the raw materials.
*   **Action Items:**
    *   Create a single Google Drive folder containing:
        *   **Logo:** High-res, transparent background (SVG or PNG).
        *   **Hero Images:** 2-3 minimal, high-quality photos.
        *   **Copy Deck:** A simple text file with your Bio, Tagline, and Shipping Policy.

### Lesson 0.4: The Bank (Stripe)
*   **Topic:** Setting up the payment gateway & database.
*   **Action Items:**
    *   Create a verified [Stripe](https://stripe.com) account.
    *   **Product Catalogue:** Create 3-5 products inside the Stripe Dashboard. Add images, descriptions, and prices directly there.
    *   **The Golden Backup:** Create a "Master Inventory" Google Sheet. If Stripe ever goes down or you switch platforms, you lose your data. Maintain a spreadsheet with columns: *Name, Price, Description, Image_Filename, Metadata*.

### Lesson 0.5: The Postman (Elastic Email)
*   **Topic:** Setting up the email service.
*   **Action Items:**
    *   Create an account at [Elastic Email](https://elasticemail.com).
    *   Verify your domain (from Lesson 0.1).
    *   Generate a Public API Key for the website.

---

## Module 1: The Digital Easel (Developer Setup)
*Installing the tools of the trade.*

### Lesson 1.1: The Workspace
*   **Topic:** Installing essential software.
*   **Action Items:**
    *   Install **VS Code** (Your code editor).
    *   Install **Google Chrome** (Your testing browser).
    *   Install **Git** (Version control).

### Lesson 1.2: The Engine (Node.js)
*   **Topic:** Installing the runtime environment.
*   **Action Items:**
    *   Download and install **Node.js** (LTS Version).
    *   Verify installation in the terminal (`node -v`).

### Lesson 1.3: Command Line Basics
*   **Topic:** Navigating your computer.
*   **Commands:** `cd`, `ls`, `mkdir`.
*   **Action Items:** Create your project folder structure using the terminal.

---

## Module 2: Project Genesis
*Laying the first brick.*

### Lesson 2.1: Scaffolding
*   **Topic:** Initializing the Firebase project.
*   **Action Items:**
    *   Run `firebase login`.
    *   Run `firebase init` (Select **Hosting** and **Functions** only; use spacebar to select/deselect).

### Lesson 2.2: Connecting the Wires
*   **Topic:** Environment Variables.
*   **Action Items:**
    *   Run `firebase functions:config:set` to securely store your Stripe and Elastic Email keys in the cloud.

### Lesson 2.3: Hello World
*   **Topic:** Your first deployment.
*   **Action Items:**
    *   Run `firebase serve` for local testing.
    *   Run `firebase deploy` to see it live on the web.

---

## Module 3: The Backend (Firebase Functions)
*The invisible machinery.*

### Lesson 3.1: Serverless Concepts
*   **Topic:** Understanding Cloud Functions, Triggers, and Requests.

### Lesson 3.2: Fetching Data
*   **Topic:** Pulling products from Stripe.
*   **Action Items:**
    *   Write the `getProducts` function using the Stripe SDK.
    *   **Crucial:** Implement filtering logic to exclude special items (like "Site Content") from the main gallery.

### Lesson 3.3: Secure Transactions
*   **Topic:** Handling the "Buy" button.
*   **Action Items:** Write the `createCheckoutSession` function to generate payment links.

### Lesson 3.4: Contact Form Proxy
*   **Topic:** Sending emails securely.
*   **Action Items:** Write the `sendContactEmail` function to hide your API keys from the public.

---

## Module 4: The Frontend (HTML, CSS, JS)
*Building the interface.*

### Lesson 4.1: The Structure (HTML)
*   **Topic:** Semantic HTML5.
*   **Action Items:** Build the `header`, `hero`, `gallery-grid`, and `footer`.

### Lesson 4.2: The Style (CSS)
*   **Topic:** Design Systems.
*   **Action Items:** Create a "Clean Room" aesthetic using CSS variables and Flexbox/Grid.

### Lesson 4.3: The Logic (JavaScript)
*   **Topic:** DOM Manipulation.
*   **Action Items:** Fetch data from your Backend (Module 3) and render the artwork cards dynamically.

### Lesson 4.4: The Product Page
*   **Topic:** Dynamic Routing.
*   **Action Items:** Parse URL parameters (`?id=`) to display specific product details.

---

## Module 5: Polish & Security
*Refining the experience.*

### Lesson 5.1: Spam Protection
*   **Topic:** Google reCAPTCHA.
*   **Action Items:** Integrate the "I am not a robot" checkbox into your contact form.

### Lesson 5.2: Mobile Responsiveness
*   **Topic:** Adapting to small screens.
*   **Action Items:** Stack navigation, adjust font sizes, and ensure touch-friendly buttons.

---

## Module 6: The Grand Opening
*Launch day.*

### Lesson 6.1: Final Deployment
*   **Topic:** Production build.
*   **Action Items:** Run the final `firebase deploy`.

### Lesson 6.2: Custom Domain
*   **Topic:** Branding.
*   **Action Items:** Map your purchased domain (from Module 0) to your Firebase project.

### Lesson 6.3: Client Handoff
*   **Topic:** Training the collection owner.
*   **Action Items:** Set up the **Stripe Customer Portal** so they can manage their own orders and products.

### Lesson 6.4: Stripe as CMS (Bonus)
*   **Topic:** Managing site content without code.
*   **Action Items:**
    *   Create a "Site Content" product in Stripe (not for sale).
    *   Use the **Metadata** fields to store text (e.g., `hero_title`, `announcement_bar`).
    *   Update your frontend to fetch this product separately and inject the text into your HTML.
    *   **Reminder:** Ensure this product is filtered out of your main gallery grid (see Lesson 3.2).
