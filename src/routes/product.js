const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProducts,
  getPriceHistory,
  getPriceTrends
} = require('../controllers/productController');

router.post('/', addProduct);
router.get('/', getProducts);
router.get('/:id/history', getPriceHistory);
router.get('/:id/trends', getPriceTrends);

module.exports = router;