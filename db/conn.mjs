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

        // Create collections with validation rules
        await createCollectionsWithValidation();
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
}

async function createIndexes() {
    try {
        // Create index on the 'fieldName' field of the 'sample_analytics' collection
        await db.collection('sample_analytics').createIndex({ fieldName: 1 });
        console.log('MongoDB indexes created');
    } catch (error) {
        console.error('Error creating MongoDB indexes', error);
        process.exit(1);
    }
}

async function createCollectionsWithValidation() {
    try {
        // Create 'sample_analytics' collection with validation rules
        await db.createCollection('sample_analytics', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                        age: {
                            bsonType: 'int',
                            minimum: 18,
                            description: 'must be an integer and is required'
                        }
                        // Add more validation rules as needed
                    }
                }
            }
        });
        console.log('Collections with validation rules created');
    } catch (error) {
        console.error('Error creating collections with validation rules', error);
        process.exit(1);
    }
}

connectedToDb();

export default db;

