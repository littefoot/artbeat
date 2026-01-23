const axios = require('axios');
const API_URL = 'https://us-central1-artbeat-shop.cloudfunctions.net/getProducts';

async function checkProductCount() {
    try {
        console.log("Fetching products to count...");
        const response = await axios.get(API_URL);
        const products = response.data.data;
        console.log(`Total Products Returned: ${products.length}`);
    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
}

checkProductCount();
