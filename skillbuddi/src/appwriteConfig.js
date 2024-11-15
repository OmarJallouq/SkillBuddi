import { Client, Account } from 'appwrite';

const client = new Client();
client.setProject(`${process.env.REACT_APP_APPWRITE_PROJECT}`);

export const account = new Account(client);

export default client;