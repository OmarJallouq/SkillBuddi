import { databases } from "../appwriteConfig";
import { ID, Query } from "appwrite";

const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE;
const USERS_COLLECTION_ID = process.env.REACT_APP_USERS_COLLECTION;
const INTERESTS_COLLECTION_ID = process.env.REACT_APP_INTERESTS_COLLECTION;

// General-purpose methods
export const fetchDocument = async (collectionId, documentId) => {
  try {
    return await databases.getDocument(DATABASE_ID, collectionId, documentId);
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

export const listDocuments = async (collectionId, queries = []) => {
  try {
    return await databases.listDocuments(DATABASE_ID, collectionId, queries);
  } catch (error) {
    console.error("Error listing documents:", error);
    throw error;
  }
};

export const createDocument = async (collectionId, data) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      collectionId,
      ID.unique(),
      data
    );
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

export const updateDocument = async (collectionId, documentId, data) => {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      collectionId,
      documentId,
      data
    );
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Profile-specific methods
export const getUserProfile = async (userId) => {
  return fetchDocument(USERS_COLLECTION_ID, userId);
};

export const addInterest = async (userId, profileUserId) => {
  const interestData = { senderId: userId, receiverId: profileUserId };
  return createDocument(INTERESTS_COLLECTION_ID, interestData);
};

export const checkMutualInterest = async (userId, profileUserId) => {
  const queries = [
    Query.or(
      Query.and(
        Query.equal("senderId", userId),
        Query.equal("receiverId", profileUserId)
      ),
      Query.and(
        Query.equal("senderId", profileUserId),
        Query.equal("receiverId", userId)
      )
    ),
  ];
  const response = await listDocuments(INTERESTS_COLLECTION_ID, queries);
  return response.documents.length === 2; // Mutual interest exists if 2 records are found
};
