import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { integrationSpecSettings } from './integration';
import  {checkInstances}  from "./tickHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());  // Enable JSON parsing

// Route to get Telex integration details
app.get("/integration-spec", (req, res) => {
    res.json(integrationSpecSettings);
});

// Route to manually trigger the tickHandler
app.post('/tick', async (req, res) => {
    try {
        await checkInstances();
        res.status(200).send("Checked instances successfully.");
    } catch (error) {
        console.error("Error checking instances:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});