const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
// Initialize Stripe with the secret key from environment variables
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();

/**
 * Fetches active products and their prices from Stripe.
 * Returns a simplified list for the frontend.
 */
exports.getProducts = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Fetch all active products
      const productsPromise = stripe.products.list({
        active: true,
        limit: 100,
        expand: ['data.default_price'] // Expand default_price to get amount/currency
      });

      const products = await productsPromise;

      // Transform data for frontend
      const catalog = products.data.map(product => {
        const price = product.default_price; // Expanded object

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          images: product.images, // Array of URLs
          price: price ? {
            amount: price.unit_amount,
            currency: price.currency,
            formatted: new Intl.NumberFormat('en-AU', {
              style: 'currency',
              currency: price.currency.toUpperCase()
            }).format(price.unit_amount / 100)
          } : null,
          metadata: product.metadata // For ID# badges or Artist names
        };
      });

      res.status(200).json({ data: catalog });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
});

/**
 * Fetch a single product by ID with ALL prices (variations)
 */
exports.getProduct = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const productId = req.query.id;
      if (!productId) {
        throw new Error('Product ID is required');
      }

      // Fetch Product and Prices in parallel
      const [product, prices] = await Promise.all([
        stripe.products.retrieve(productId),
        stripe.prices.list({ product: productId, active: true })
      ]);

      const formattedPrices = prices.data.map(price => ({
        id: price.id,
        amount: price.unit_amount,
        currency: price.currency,
        nickname: price.nickname || 'Standard', // Use nickname for "Size" label
        formatted: new Intl.NumberFormat('en-AU', {
          style: 'currency',
          currency: price.currency.toUpperCase()
        }).format(price.unit_amount / 100)
      }));

      // Sort prices low to high
      formattedPrices.sort((a, b) => a.amount - b.amount);

      const data = {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        prices: formattedPrices, // All options list
        metadata: product.metadata
      };

      res.status(200).json({ data });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Create a Stripe Checkout Session
 */
exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const { priceId, successUrl, cancelUrl } = req.body;

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Send Contact Email via Elastic Email
 */
const axios = require('axios');
exports.sendContactEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    const { name, email, message, recaptchaToken } = req.body;

    // 1. Verify reCAPTCHA (Optional server-side check, skipping for now)

    // 2. Send via Elastic Email
    try {
      const apiKey = functions.config().elastic.key;
      const response = await axios.post('https://api.elasticemail.com/v2/email/send', null, {
        params: {
          apikey: apiKey,
          subject: `Website Inquiry: ${name}`,
          from: 'noreply@artbeat-shop.web.app',
          fromName: 'Artbeat Website',
          to: 'lemoralexis@gmail.com', // Artbeat Owner
          bodyHtml: `
            <div style="font-family: sans-serif; padding: 20px;">
                <h2>New Message from Artbeat Contact Form</h2>
                <hr>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                    ${message.replace(/\n/g, '<br/>')}
                </div>
            </div>
          `,
          isTransactional: true
        }
      });

      if (response.data.success === false) {
        throw new Error(response.data.error);
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Email Error:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  });
});
