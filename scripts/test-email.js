const axios = require('axios');

const API_KEY = "174CDCD586A5F68CF45B5C070C0B6ACFA6782B75A14E81DEBE5F3CAB8780C19DA0B4CFDE6E4ED3DD696C274B2070A30A";
const TO_EMAIL = "jaredabt@gmail.com";

async function sendTest() {
    console.log(`Sending test email to ${TO_EMAIL}...`);
    try {
        const response = await axios.post('https://api.elasticemail.com/v2/email/send', null, {
            params: {
                apikey: API_KEY,
                subject: "Test Email from Antigravity Console",
                from: "noreply@artbeat-shop.web.app",
                to: TO_EMAIL,
                bodyHtml: "<h1>It Works!</h1><p>This is a test email sent directly from the generic setup script to verify your API Key.</p>",
                isTransactional: true
            }
        });

        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

sendTest();
