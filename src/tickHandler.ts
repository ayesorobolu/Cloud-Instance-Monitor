import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Function to check instance health
export const checkInstances = async (instanceUrls?: string[]) => {
    const urlsToCheck = instanceUrls && instanceUrls.length > 0 
        ? instanceUrls 
        : (process.env.INSTANCE_URLS?.split(",").map(url => url.trim()) || []);

    console.log(`🔍 Checking instances: ${urlsToCheck.length > 0 ? urlsToCheck : "No instances provided!"}`);

    for (const url of urlsToCheck) {
        try {
            console.log(`🌐 Checking instance: ${url}`);
            const response = await axios.get(url, { timeout: 5000 });

            console.log(`📩 Received response: ${response.status} - ${response.statusText}`);

            if (response.status !== 200) {
                console.log(`❌ Instance down: ${url}`);
                await sendTelexAlert(url, `Instance is DOWN! Received status: ${response.status}`);
            } else {
                console.log(`✅ Instance is UP: ${url}`);
            }
        } catch (error) {
            console.error(`⚠️ Error checking instance: ${url} - ${error.message}`);
            await sendTelexAlert(url, `Instance is DOWN! Error: ${error.message}`);
        }
    }
};
// Function to send alerts to Telex
const sendTelexAlert = async (instanceUrl: string, message: string) => {
    const telexWebhook = process.env.TELEX_WEBHOOK_URL;

    if (!telexWebhook) {
        console.error("❌ Telex Webhook URL is missing in .env file!");
        return;
    }

    try {
        const payload = {
            event_name: "instance_down",  
            message: String(message),   
            status: "down",
            username: "Cloud Monitor"
        };

        console.log("📤 Sending Telex Alert Payload:", JSON.stringify(payload, null, 2));

        const response = await axios.post(telexWebhook, payload, {
            headers: { "Content-Type": "application/json" },
        });

        console.log(`✅ Alert sent to Telex, Response:`, response.data);
    } catch (error) {
        console.error("❌ Failed to send alert to Telex:", error.response?.data || error.message);
    }
};