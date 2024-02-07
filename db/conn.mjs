// conn.mjs

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString);

let db;

async function connectedToDb() {
    try {
        await client.connect();
        console.log('Connected to the database');
        db = client.db('sample_analytics');
        
        // Create MongoDB indexes
        await createIndexes();

        console.log('Setup completed successfully');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
}

async function createIndexes() {
    try {
        // Create index on the '_id' field of the 'sample_analytics' collection
        await db.collection('sample_analytics').createIndex({ _id: 1 });
        console.log('MongoDB indexes created');
    } catch (error) {
        console.error('Error creating MongoDB indexes', error);
        // Don't exit the process if index creation fails
        // process.exit(1);
    }
}

// Ensure that connectedToDb() is called before exporting db
await connectedToDb();

export default db;
