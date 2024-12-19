import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
client.setProject(`${process.env.REACT_APP_APPWRITE_AUTH}`);

export const account = new Account(client);

export default client;

const client2 = new Client();

client2
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject("6735c8df0037f3bbaec4"); // Replace with your Project ID

const account2 = new Account(client2);
const databases = new Databases(client2);
const storage = new Storage(client2);

export { client2, account2, databases, storage };