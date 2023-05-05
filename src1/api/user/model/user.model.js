const mongoose = require("mongoose");
var validate = require("mongoose-validator");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      match: [/^[a-z,a-z]+/, "please enter valid first name"],
    },
    lastname: {
      type: String,
      match: [/^[a-z,a-z]+/, "please enter valid first name"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        `/^[^\s@]+@[^\s@]
    +\.[^\s@]+$/`,
        "please enter valid email",
      ],
      required: "Email address is required",
      validator: [validate.isEmail(), "this email fformatis required"],
    },
    password: {
      type: String,
    },
    country: {
      type: String,
      required: true,
      validate: {
        validator: async function (v) {
          const country = await userSchema.findone({ name: v });
          return country !== null;
        },
        message: "invalid country",
      },
    },

    Token: {
      type: String,
      default: " ",
    },
    age: { type: Number, min: 18, max: 65 },
  },
  {
    state: {
      type: String,
      required: true,
      validate: {
        validator: async function (v) {
          const country = await Country.findone({ name: this.country });
          return country && country.state.some((state) => state.name == v);
        },
        mesaage: "invalid state",
      },
    },
  },
  {
    cities: {
      type: String,
      required: true,
      validate: {
        validator: async function (v) {
          const state = await mongoose.model.findone({ cities: v });
          if (!state) {
            return false;
          }
          return true;
        },
        message: (props) => `${props.value} is not valid city`,
      },
    },
  },
  {
    dateofyear: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          const currentdate = new Date();
          const currentyear = currentDate.getfullyear();
          const userbirth = currentyear - v;
          return dob >= 14;
        },
        message: (props) => `user must be  older then 14`,
      },
    },
  }
);

module.exports = mongoose.model("user", userSchema);
