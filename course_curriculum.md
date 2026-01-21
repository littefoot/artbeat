# The Artbeat Stack: Building a Premium Serverless Art Gallery
**Course Curriculum for Beginners**

## Course Description
This course takes you from zero coding knowledge to deploying a high-end, fully functional e-commerce art gallery. You will build a "serverless" application using industry-standard tools: **Firebase** (Google's cloud platform), **Stripe** (for payments), and **Vanilla Web Technologies** (HTML, CSS, JavaScript).

**Target Audience:** Complete beginners, Artists, or Designers who want to build their own independent sales platform.

---

## Module 1: The Digital Easel (Prerequisites & Setup)
*Before we paint, we must prepare the studio.*

### Lesson 1.1: The Tools of the Trade
*   **Topic:** Installing the essential software.
*   **Key Concepts:** Code Editors vs. Word Processors.
*   **Action Items:**
    *   Install **VS Code** (Visual Studio Code).
    *   Install **Google Chrome** (for Developer Tools).
    *   Install **Git** (Version Control).

### Lesson 1.2: The Engine (Node.js)
*   **Topic:** Installing the JavaScript runtime environment.
*   **Key Concepts:** What is Node.js? What is NPM (Node Package Manager)?
*   **Action Items:**
    *   Download and install Node.js (LTS version).
    *   Verify installation in the terminal (`node -v`, `npm -v`).

### Lesson 1.3: Command Line Basics
*   **Topic:** Navigating your computer like a pro.
*   **Key Concepts:** The Terminal/Command Prompt.
*   **Commands:** `cd` (Change Directory), `ls`/`dir` (List), `mkdir` (Make Directory).
*   **Action Items:** Create your project folder using only the command line.

---

## Module 2: The Foundation (Client Assets & Accounts)
*Gathering the raw materials for your business.*

### Lesson 2.1: The Brand DNA
*   **Topic:** Defining the project identity.
*   **Key Concepts:** File organization, Asset formats.
*   **Action Items:**
    *   Create a "BrandDNA.md" file.
    *   Organize Logo (SVG/PNG), Hero Images, and Copy Deck in a folder.

### Lesson 2.2: The Cloud (Firebase)
*   **Topic:** Setting up your serverless backend.
*   **Key Concepts:** Cloud Hosting, Cloud Functions.
*   **Action Items:**
    *   Create a Project in Firebase Console.
    *   Upgrade to **Blaze Plan** (Pay-as-you-go).

### Lesson 2.3: The Bank (Stripe)
*   **Topic:** Setting up payments.
*   **Key Concepts:** Payment Processors, API Keys (Public vs. Secret).
*   **Action Items:**
    *   Create Stripe Account.
    *   Create 3-5 Art Products in the Stripe Dashboard (Images, Prices, Descriptions).

### Lesson 2.4: The Postman (Elastic Email)
*   **Topic:** Professional transactional emails.
*   **Key Concepts:** SMTP vs. APIs.
*   **Action Items:**
    *   Create Elastic Email account.
    *   Generate API Access Key.

---

## Module 3: Project Genesis
*Laying the first brick.*

### Lesson 3.1: Scaffolding
*   **Topic:** Initializing the Firebase project.
*   **Key Concepts:** `firebase-tools` CLI.
*   **Action Items:**
    *   Run `firebase login`.
    *   Run `firebase init` (Select Hosting & Functions).

### Lesson 3.2: Connecting the Wires
*   **Topic:** Securely storing API keys.
*   **Key Concepts:** Environment Variables.
*   **Action Items:**
    *   Run `firebase functions:config:set` to store Stripe and Elastic Email keys safely in the cloud.

### Lesson 3.3: Hello World
*   **Topic:** Your first deployment.
*   **Key Concepts:** Local Server vs. Production.
*   **Action Items:**
    *   Edit `index.html`.
    *   Run `firebase serve` (Local).
    *   Run `firebase deploy` (Live).

---

## Module 4: The Backend (Firebase Functions)
*The invisible machinery that powers the shop.*

### Lesson 4.1: Serverless Concepts
*   **Topic:** What is a "Cloud Function"?
*   **Key Concepts:** Triggers, HTTP Requests, Responses.

### Lesson 4.2: Fetching Data
*   **Topic:** Pulling products from Stripe to your website.
*   **Action Items:**
    *   Write the `getProducts` function.
    *   Use the Stripe SDK to list active products.

### Lesson 4.3: Secure Transactions
*   **Topic:** Handling the "Buy" button.
*   **Action Items:**
    *   Write the `createCheckoutSession` function.
    *   Pass the Product ID to Stripe and return a checkout URL.

### Lesson 4.4: Hiding Secrets (Contact Form)
*   **Topic:** Sending emails without exposing keys.
*   **Action Items:**
    *   Write the `sendContactEmail` function.
    *   Proxy frontend form data to Elastic Email.

---

## Module 5: The Frontend (HTML, CSS, JS)
*Building the beautiful "Clean Room" interface.*

### Lesson 5.1: The Canvas (HTML Structure)
*   **Topic:** Semantic HTML.
*   **Action Items:**
    *   Build the `header`, `hero`, `gallery-grid`, and `footer` skeleton in `index.html`.

### Lesson 5.2: The Palette (CSS Design System)
*   **Topic:** Styling and variables.
*   **Key Concepts:** CSS Variables (`--color-accent`), Reset CSS.
*   **Action Items:**
    *   Create `styles.css`.
    *   Define the global typography and color palette.

### Lesson 5.3: The Gallery (CSS Grid)
*   **Topic:** Responsive layouts.
*   **Key Concepts:** `display: grid`, `grid-template-columns`, Media Queries.
*   **Action Items:**
    *   Style the product grid to be 3 columns on desktop, 1 on mobile.

### Lesson 5.4: Dynamic Painting (JavaScript)
*   **Topic:** Connecting Frontend to Backend.
*   **Key Concepts:** `fetch()`, DOM Manipulation.
*   **Action Items:**
    *   Write `app.js` to call your `getProducts` function.
    *   Dynamically generate HTML cards for each artwork.

### Lesson 5.5: The Product Page
*   **Topic:** Detailed views.
*   **Key Concepts:** URL Parameters.
*   **Action Items:**
    *   Create `product.html` and `product-page.js`.
    *   Read the `?id=...` from the URL.
    *   Fetch specific product details.

---

## Module 6: Polish & Security
*Refining the experience.*

### Lesson 6.1: Guarding the Gate
*   **Topic:** Preventing spam.
*   **Action Items:**
    *   Register Google reCAPTCHA v2.
    *   Add the "I am not a robot" checkbox to the contact form.

### Lesson 6.2: Mobile Polish
*   **Topic:** Fine-tuning for phones.
*   **Action Items:**
    *   Stack navigation elements.
    *   Adjust font sizes for small screens.
    *   Ensure buttons are touch-friendly (full width).

---

## Module 7: The Grand Opening
*Going live to the world.*

### Lesson 7.1: Final Deployment
*   **Topic:** Putting it all together.
*   **Action Items:**
    *   Final `firebase deploy`.

### Lesson 7.2: Custom Domains
*   **Topic:** `www.yourbrand.com`.
*   **Action Items:**
    *   Add custom domain in Firebase Console.
    *   Update DNS records at your registrar.

### Lesson 7.3: Handoff
*   **Topic:** Giving keys to the client.
*   **Action Items:**
    *   Set up the **Stripe Customer Portal** for inventory management.
    *   Deliver the finished site.
