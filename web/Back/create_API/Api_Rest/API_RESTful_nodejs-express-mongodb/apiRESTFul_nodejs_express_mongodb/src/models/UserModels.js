const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  creatAt: { type: Date, default: Date.now }

})

const mongoModel = mongoose.model("UserdataRESTFull", userSchema);

// Export model
module.exports = mongoModel