const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  total_cash: {
    type: Number,
    required: true,
    default: 0,
  },
  buckets: {
    type: Map,
    of: Number, // Assumes buckets contain numeric values
    default: {},
  },
  leftover: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Export the model
module.exports = mongoose.model('Budget', budgetSchema);
