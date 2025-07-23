// MongoDB connection utility for Vercel Serverless Functions
import { MongoClient, Db } from "mongodb";

// This file is used to connect to MongoDB in a serverless environment like Vercel
const uri = process.env.MONGODB_URI || "";
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  console.log("Connecting to MongoDB with URI:", uri);
  if (cachedClient && cachedDb) {
    console.log("Using cached MongoDB client");
    return { client: cachedClient, db: cachedDb };
  }
  if (!uri) {
    console.error("MONGODB_URI environment variable is not defined");
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    cachedClient = client;
    cachedDb = db;
    console.log("MongoDB connection established");
    return { client, db };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
