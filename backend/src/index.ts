import express from "express";
import cors from "cors";
import { SSHConnection } from "./classes/ssh";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();
// Environment Variables
const PORT = process.env.PORT || 5000;
const username = process.env.SSH_USERNAME;
const host = process.env.SSH_HOST;
const privateKeyPath = process.env.SSH_PRIVATE_KEY_PATH;

// Check for required environment variables
if (!username || !host || !privateKeyPath) {
  console.log("Required environment variables:", {
    username,
    host,
    privateKeyPath,
  });
  console.error("Missing required environment variables.");
  process.exit(1);
}

const sshManager = new SSHConnection(host, username, privateKeyPath);
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Start Express server
app.listen(PORT, async () => {
  const hostname = "ec2-35-154-111-90.ap-south-1.compute.amazonaws.com";

  dns.lookup(hostname, (err, address, family) => {
    if (err) {
      console.error("DNS Lookup failed:", err);
    } else {
      console.log("Address:", address);
      console.log("Family:", family);
    }
  });
  await sshManager.connect();
  console.log(`Server is running on port ${PORT}`);
});
