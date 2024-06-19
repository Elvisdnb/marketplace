const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import controllers
const {
   addProduct,
   editProduct,
   viewProducts,
   viewProductById,
   deleteProduct,
   deleteAllProducts,
} = require('./controllers/manageProducts');

app.get('/api/products', viewProducts); // either 'all' or 'by name'
app.get('/api/products/:id', viewProductById);
app.post('/api/products', addProduct);
app.put('/api/products/:id', editProduct);
app.delete('/api/products/:id', deleteProduct);
app.delete('/api/products', deleteAllProducts);

const mongoose = require('mongoose');

const connect = async (connectionUri) => {
   await mongoose.connect(connectionUri);
};

app.get('/', (req, res) => {
   res.json({ message: 'Welcome to DressStore application.' });
});

const port = process.env.PORT || 3000;

connect(
   'mongodb+srv://owarietaelvis:elvis@cluster0.tisef14.mongodb.net/Marketplace?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
   app.listen(port, () => {
      console.log('Webserver Started on port', port);
   });
});
