import { Client, Account, Databases, Storage } from "appwrite";

// Create a Client instance
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("673ba586000b18437b40"); // Replace with your endpoint and project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Export the client instance for real-time subscriptions
export default client;

// Export constants for database and collection IDs
export const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE;
export const MESSAGES_COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION;
