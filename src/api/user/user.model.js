const mongoose = require("mongoose");
var validate = require('mongoose-validator');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  
   
    
  },
  password: {
    type: String,
  },
  country: {
    type: String,
  },

  newpassword: {
    type: String,
  },
  Token: {
    type: String,
    default: " ",
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    required: true,
  },
  DOB: {
    type: Number,
    max: 14,
  },

  city: {
    type: String,
  },

  state: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return state.test(v);
      },
      message: (props) => `${props.value} !`,
    },
    required: [true,],
  }
});
userSchema.path('email').set(function(v) {
  return capitalize(v);
});
userSchema.pre('save', function(next) {
  notify(this.get('email'));
  next();
});

module.exports = mongoose.model("user", userSchema);
