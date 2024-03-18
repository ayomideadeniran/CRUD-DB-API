const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));


// route
app.get('/', (req, res) => {
    res.send('Hello World from server.js');
})


app.get('/blog', (req, res) => {
    res.send('Hello Blog, my name is KNIGHTS');
})


app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message); 
        res.status(500).json({message: error.message});
    }
})



app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message); 
        res.status(500).json({message: error.message});
    }
})




app.post("/products", async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message); 
        res.status(500).json({message: error.message});
    }
})
//update
app.put("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product) {
            return res.status(404).json({message: `Product not found product with this ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message); 
        res.status(500).json({message: error.message});
    }
})

app.delete("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: `Product not found product with this ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//DB

mongoose.
    connect('mongodb+srv://ayomideratata:apinode@cluster100.clxzfrd.mongodb.net/')
    .then(() => {
        app.listen(3000, () => {
            console.log('node Server listening on port 3000');
        })
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.log(err);
    })

