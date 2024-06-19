const Product = require('../models/marketplace');

/*
  * POST /api/products  
  * Adds a new product
*/

const addProduct = async (req, res) => {
    const info = req.body;

    const newProduct = new Product(info);
    await newProduct.save();

    res.json({ message: 'Product has been added' })
}


/*
  * PUT /api/products/:id
  * Updates the product by ID
*/

const editProduct = async (req, res) => {
    const { changes } = req.body;

    body = {
        changes: {
            // key: value
            quantity: 10,
            description: 'else'
        }
    }

    await Product.findOneAndUpdate(
        { _id: req.params.id }, // identifier
        changes // changes
    );

    res.json({ message: 'Product has been edited' });
};


/* 
  * GET /api/products,
  * GET /api/products?name=[name],
*/

const viewProducts = async (req, res) => {

    const name = req.query.name;

    if (!name) {
        const allProducts = await Product.find();
        res.json({ response: allProducts });

        return;
    }

    const matched = await Product.find({ name: { $regex: new RegExp(req.query.name, 'i') } });

    res.json({
        products: matched
    });
}


/*
  * GET /api/products/:id
  * View a product by ID
*/

const viewProductById = async (req, res) => {
    const productById = await Product.findOne({ _id: req.params.id })
    res.json({ productById });
}


/*
  * DELETE /api/products/:id
  * Deletes a product by ID
*/

const deleteProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })

    if (product) {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Product' });
        return;
    }

    res.json({ message: 'Product doesn\'t exist' })
};


/*
  * DELETE /api/products
  * Deletes all products
*/

const deleteAllProducts = async (req, res) => {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted' });
};

module.exports = {
    addProduct,
    editProduct,
    viewProducts,
    viewProductById,
    deleteProduct,
    deleteAllProducts
};