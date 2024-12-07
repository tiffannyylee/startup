const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
    email: { type: String, required: true }, // Add email for identifying user budgets

  total_cash: { type: Number, required: true },
  buckets: { type: Map, of: Number, required: true }, // Flexible map for bucket names and values
  leftover: { type: Number, required: true }
});

const Budget = mongoose.model('Budget', bucketSchema);

module.exports = Budget;
