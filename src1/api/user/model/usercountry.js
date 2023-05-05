const mongoose = require("mongoose");
export const countrySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: [stateSchema],
      required: true,
      default: [],
    },
  });
  
  const Country=mongoose.model('Country',countrySchema)