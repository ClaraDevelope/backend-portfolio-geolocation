const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  ip: String,
  city: String,
  region: String,
  country: String,
  loc: String, // coordenadas lat,long
  org: String, // ISP o compañía
  timezone: String,
  source: String, // linkedin, infojobs, etc
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Visit', visitSchema);
