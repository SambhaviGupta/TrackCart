const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const Product = require('./src/models/Product');
const PriceHistory = require('./src/models/PriceHistory');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', require('./src/routes/product'));

// Cron job - runs every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running price update cron job...');
  try {
    const products = await Product.find();

    for (const product of products) {
      // Mock price fluctuation (+/- 10%)
      const fluctuation = (Math.random() * 0.2 - 0.1);
      const newPrice = parseFloat((product.currentPrice * (1 + fluctuation)).toFixed(2));

      // Save to price history
      await new PriceHistory({ productId: product._id, price: newPrice }).save();

      // Update current price
      product.currentPrice = newPrice;
      await product.save();

      // Alert if price drops below threshold
      if (newPrice < product.threshold) {
        console.log(`ALERT: ${product.name} price dropped to ₹${newPrice} — below threshold of ₹${product.threshold}`);
      }
    }

    console.log('Price update complete');
  } catch (err) {
    console.log('Cron error:', err);
  }
});

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.log(err));