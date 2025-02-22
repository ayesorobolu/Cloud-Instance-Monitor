import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Function to check instance health
export const checkInstances = async (instanceUrls?: string[]) => {
    // ✅ Use Telex-provided URLs first, fallback to .env
    const urlsToCheck = instanceUrls && instanceUrls.length > 0 
        ? instanceUrls 
        : (process.env.INSTANCE_URLS?.split(",").map(url => url.trim()) || []);

    console.log(`🔍 Checking instances: ${urlsToCheck.length > 0 ? urlsToCheck : "No instances provided!"}`);

    for (const url of urlsToCheck) {
        try {
            console.log(`🌐 Checking instance: ${url}`);
            const response = await axios.get(url, { timeout: 5000 });

            if (response.status !== 200) {
                console.log(`❌ Instance down: ${url}`);
                await sendTelexAlert(url, "Instance is DOWN! Non-200 status code.");
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
        await axios.post(telexWebhook, {
            message: `🚨 Alert: ${message} (${instanceUrl})`,
        });
        console.log(`✅ Alert sent to Telex for ${instanceUrl}`);
    } catch (error) {
        console.error("❌ Failed to send alert to Telex:", error.message);
    }
};