// lib/db.js
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get database
export async function getDatabase() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || 'wellness_app');
}

// User model functions
export async function createUser(userData) {
  const db = await getDatabase();
  const users = db.collection('users');
  
  const user = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await users.insertOne(user);
  return result;
}

export async function getUserByEmail(email) {
  const db = await getDatabase();
  const users = db.collection('users');
  return await users.findOne({ email });
}

export async function getUserById(id) {
  const db = await getDatabase();
  const users = db.collection('users');
  return await users.findOne({ _id: new ObjectId(id) });
}

export async function updateUser(id, updateData) {
  const db = await getDatabase();
  const users = db.collection('users');
  
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: { 
        ...updateData, 
        updatedAt: new Date() 
      } 
    }
  );
  return result;
}

export async function updateUserSubscription(userId, subscriptionData) {
  const db = await getDatabase();
  const users = db.collection('users');
  
  return await users.updateOne(
    { _id: new ObjectId(userId) },
    { 
      $set: { 
        subscription: subscriptionData,
        updatedAt: new Date()
      } 
    }
  );
}