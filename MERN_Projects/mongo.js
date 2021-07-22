// const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb+srv://Tanu:v644byTnjNmWFLNq@cluster0.ppihy.mongodb.net/products_test?retryWrites=true&w=majority';

// // v644byTnjNmWFLNq
// const createProduct = async (req, res, next) => {
//     const newProduct = {
//         name: req.body.name,
//         price: req.body.price
//     };

//     const client = new MongoClient(url); //which server we want to connect to

//     try{
//         await client.connect();  //establish connection with mongodb server
//         const db = client.db();     //access specific db on server
//         const result = db.collection('products').insertOne(newProduct);

//     } catch(error){
//         return res.json({message: 'Could not connect to DB!!'})
//     }
//     // client.close();
//     res.json(newProduct);
// }

// const getProducts = async (req, res, next) => {

// }


// exports.createProduct = createProduct;
// exports.getProducts = getProducts;