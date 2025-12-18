const Product = require("../models/productModel");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ 
        success: false,
        message: "Name and price are required" 
      });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ 
        success: false,
        message: "Price must be a positive number" 
      });
    }

    const newProduct = new Product({ name, price });
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      product: savedProduct
    });
  } catch (err) {
    console.error('Create product error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: Object.values(err.errors).map(e => e.message).join(', ')
      });
    }
    res.status(500).json({ 
      success: false,
      message: err.message || "Failed to create product" 
    });
  }
};
// READ ALL
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    console.error('Get all products error:', err);
    res.status(500).json({ 
      success: false,
      message: err.message || "Failed to fetch products" 
    });
  }
};
// get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (err) {
    console.error('Get product by ID error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: "Invalid product ID" 
      });
    }
    res.status(500).json({ 
      success: false,
      message: err.message || "Failed to fetch product" 
    });
  }
};

// edit product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      return res.status(400).json({ 
        success: false,
        message: "Price must be a positive number" 
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...(name && { name }), ...(price !== undefined && { price }) },
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    
    res.json({
      success: true,
      product: updatedProduct
    });
  } catch (err) {
    console.error('Update product error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: "Invalid product ID" 
      });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: Object.values(err.errors).map(e => e.message).join(', ')
      });
    }
    res.status(500).json({ 
      success: false,
      message: err.message || "Failed to update product" 
    });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    res.json({ 
      success: true,
      message: "Product deleted successfully" 
    });
  } catch (err) {
    console.error('Delete product error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: "Invalid product ID" 
      });
    }
    res.status(500).json({ 
      success: false,
      message: err.message || "Failed to delete product" 
    });
  }
};
