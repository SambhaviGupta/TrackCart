const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  threshold: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);