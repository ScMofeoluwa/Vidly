const Joi = require("joi");
const mongoose = require("mongoose");
const { customerSchema } = require("./customer");

const rentalSchema = new mongoose.Schema({
  customer: { type: customerSchema, required: true },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
