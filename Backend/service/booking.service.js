const bookingModel = require("../model/booking.model");
const { v4: uuidv4 } = require("uuid");

const getAll = async () => {
  try {
    const bookings = await bookingModel.find();
    return bookings;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const get = async (id) => {
  try {
    const booking = await bookingModel.findById(id);
    return booking;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const createBooking = async (data) => {
  console.log(data);
  try {
    const id = uuidv4();
    const newBooking = new bookingModel({ id, ...data });
    const booking = await newBooking.save();
    return booking;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const editBooking = async (id, data) => {
  console.log(id);
  try {
    const booking = await bookingModel.findByIdAndUpdate(id, data);
    return booking;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAll,
  get,
  createBooking,
  editBooking,
};
