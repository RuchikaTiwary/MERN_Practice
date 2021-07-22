const mongoose = require('mongoose');

const Product = require('./models/product');
// Xja4zL5MetPqzU8m
// mongoose.connect('mongodb+srv://mern:Xja4zL5MetPqzU8m@cluster0.r4q4p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
//     .then(() => {
//         console.log('Connected to database');
//     }).catch(() => {
//         console.log('Could not connect to database');
//     })

// ULMI2FVvahWr7Jpr
mongoose.connect(
        'mongodb://Ruchika:mern123@cluster0-shard-00-00.r4q4p.mongodb.net:27017,cluster0-shard-00-01.r4q4p.mongodb.net:27017,cluster0-shard-00-02.r4q4p.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-podww0-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => {
          console.log('Connected to database!')
      }).catch(() => {
          console.log('Connection failed!')
      });    

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price,
    });
    console.log(createdProduct);
    const result = await createdProduct.save();
    
    console.log(result);
    res.json(result);
}

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;