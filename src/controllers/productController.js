const Product = require('../models/Product');
const PriceHistory = require('../models/PriceHistory');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, currentPrice, threshold } = req.body;
    const product = new Product({ name, currentPrice, threshold });
    await product.save();

    // Log initial price
    await new PriceHistory({ productId: product._id, price: currentPrice }).save();

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get price history for a product
exports.getPriceHistory = async (req, res) => {
  try {
    const history = await PriceHistory.find({ productId: req.params.id })
      .sort({ date: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get price trends for a product
exports.getPriceTrends = async (req, res) => {
  try {
    const history = await PriceHistory.find({ productId: req.params.id });

    if (history.length === 0)
      return res.status(404).json({ message: 'No price history found' });

    const prices = history.map(h => h.price);
    const lowest = Math.min(...prices);
    const highest = Math.max(...prices);
    const average = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
    const latest = prices[prices.length - 1];
    const percentageDrop = (((highest - latest) / highest) * 100).toFixed(2);

    res.json({ lowest, highest, average, latest, percentageDrop: `${percentageDrop}%` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};