const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// Define secrets (set via Firebase Console or CLI)
const stripeSecret = defineSecret("STRIPE_SECRET");
const elasticKey = defineSecret("ELASTIC_KEY");

admin.initializeApp();

/**
 * Fetches active products and their prices from Stripe.
 * Returns a simplified list for the frontend.
 */
exports.getProducts = onRequest(
  { secrets: [stripeSecret] },
  (req, res) => {
    cors(req, res, async () => {
      try {
        const stripe = require("stripe")(stripeSecret.value());
        // Fetch all active products
        const products = await stripe.products.list({
          active: true,
          limit: 100,
          expand: ['data.default_price']
        });

        // Transform data for frontend
        const catalog = products.data.map(product => {
          const price = product.default_price;

          return {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            price: price ? {
              amount: price.unit_amount,
              currency: price.currency,
              formatted: new Intl.NumberFormat('en-AU', {
                style: 'currency',
                currency: price.currency.toUpperCase()
              }).format(price.unit_amount / 100)
            } : null,
            metadata: product.metadata
          };
        });

        res.status(200).json({ data: catalog });
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      }
    });
  }
);

/**
 * Fetch a single product by ID with ALL prices (variations)
 */
exports.getProduct = onRequest(
  { secrets: [stripeSecret] },
  (req, res) => {
    cors(req, res, async () => {
      try {
        const stripe = require("stripe")(stripeSecret.value());
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
          nickname: price.nickname || 'Standard',
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
          prices: formattedPrices,
          metadata: product.metadata
        };

        res.status(200).json({ data });
      } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: error.message });
      }
    });
  }
);

/**
 * Create a Stripe Checkout Session
 */
exports.createCheckoutSession = onRequest(
  { secrets: [stripeSecret] },
  (req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }

      try {
        const stripe = require("stripe")(stripeSecret.value());
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
  }
);

/**
 * Send Contact Email via Elastic Email
 */
const axios = require('axios');
exports.sendContactEmail = onRequest(
  { secrets: [elasticKey] },
  (req, res) => {
    cors(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }

      const { name, email, message, recaptchaToken } = req.body;

      // Send via Elastic Email
      try {
        const apiKey = elasticKey.value();
        const response = await axios.post('https://api.elasticemail.com/v2/email/send', null, {
          params: {
            apikey: apiKey,
            subject: `Website Inquiry: ${name}`,
            from: 'noreply@artbeat-shop.web.app',
            fromName: 'Artbeat Website',
            to: 'lemoralexis@gmail.com',
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
  }
);
