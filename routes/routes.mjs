import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb'; // Import ObjectId from the mongodb package

const router = express.Router();

// GET route for the root path to display a welcome message
router.get("/", (req, res) => {
    res.send("Welcome to the API.");
});

// GET route for fetching all customers with a limit of 20
router.get("/customers", async (req, res) => {
    try {
        // Fetch customers from the 'customers' collection with a limit of 20
        const customers = await db.collection('customers').find().limit(20).toArray();
        
        res.json(customers);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching customers:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Get route for accounts
router.get("/accounts", async (req, res) => {
    try {
        // Fetch customers from the 'customers' collection with a limit of 20
        const accounts= await db.collection('accounts').find().limit(20).toArray();
        
        res.json(accounts);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching accounts:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Get route for transactions
router.get("/transactions", async (req, res) => {
    try {
        // Fetch customers from the 'customers' collection with a limit of 20
        const transactions = await db.collection('transactions').find().limit(20).toArray();
        
        res.json(transactions);
    } catch (error) {
      
        console.error('Error fetching transactions:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET route for fetching a single customer by ID
router.get("/customers/:id", async (req, res) => {
    try {
        let collection = await db.collection("customers");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);
    
        if (!result) res.send("Not found").status(404);
        else res.send(result).status(200);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching customer:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a single customer
router.delete("/:id", async (req, res) => {
    await customers.findByIdAndDelete(req.params.id)
    res.status(204).json({
      data: "Item was deleted"
    })
    
  });

// Create a new customer 

router.post('/', async (req,res) =>{
    let collection = await db.collection('customers')
    let newDocument = req.body

    
    let result = await collection.insertOne(newDocument)
    res.send(result).status(204)
})

//Update a customer ID
router.patch("/customers/:id", async (req, res) => {
    let collection = await db.collection("grades")
    let query = { class_id: Number(req.params.id) }
  
    let result = await collection.updateMany(query, {
      $set: { class_id: req.body.class_id }
    })
  
    if (!result) res.send("Not found").status(404)
    else res.send(result).status(200)
  })


export default router;
