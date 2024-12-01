import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize the primary client
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
      .setProject(process.env.REACT_APP_APPWRITE_AUTH); // Replace with your Project ID from environment variables

export const account = new Account(client);

// Export the primary client instance
export default client;

// Initialize the secondary client
const client2 = new Client();
client2
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject("673ba586000b18437b40"); // Replace with your hardcoded Project ID

export const account2 = new Account(client2);
export const databases = new Databases(client2);
export const storage = new Storage(client2);

// Export constants for database and collection IDs
export const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE; // Replace with your database ID
export const MESSAGES_COLLECTION_ID = process.env.REACT_APP_MESSAGES_COLLECTION; // Replace with your messages collection ID
