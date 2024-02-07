import express from 'express'
import db from '../db/conn.mjs'
import { ObjectId } from 'mongodb'

const router = express.Router()

// GET route to fetch data from MongoDB
router.get('/', async (req, res) => {
    try {
        // Assuming 'collectionName' is the name of your MongoDB collection
        const data = await db.collection('sample analytics').find().toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});





export default router