const bookings = require("../service/booking.service");
const user = require("../service/user.service");
const nodemailer = require("nodemailer");
const bookingModel = require("../model/booking.model");

const getAllBooking = async (req, res) => {
  try {
    const booking = await bookingModel.find().populate("serviceIds");
    console.log(booking);
    res.status(200).send({ meta: 200, booking: booking });
  } catch (error) {
    res.status(500).send({ meta: 500, error: "Internal Server Error" });
  }
};
const getBooking = async (req, res) => {
  const booking = await bookings.get(req.params.id);
  res.status(200).send({ meta: 200, booking });
};

const createBooking = async (req, res) => {
  const booking = await bookings.createBooking(req.body.data);
  const getUSerById = await user.getAUser(booking.userId);

  // Configuring nodemailer
  const config = {
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  // Email body
  const emailBody = `
    <!DOCTYPE html>
<html>
  <head>
  <body>      
        <td>Hi, your Bike service booking is Successful!. </td>
    <p>Thank you for booking with us! We look forward to serving you.</p>
  </body>
</html>

  `;

  const message = {
    from: process.env.MAIL_USERNAME,
    to: getUSerById.email,
    subject: "Bike-service Booking successfull",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      res.status(200).send({ meta: 401, booking });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email." });
    });
};

const editBooking = async (req, res) => {
  const booking = await bookings.editBooking(req.params.id, req.body.data);

  const config = {
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  // Email body with updated booking status
  const emailBody = `
    <!DOCTYPE html>
<html>
  <head>
  <body>      
        <td>Hi, your Bike service booking status is changed to ${booking.status}</td>
  </body>
</html>

  `;
  const getUSerById = await user.getAUser(booking.userId);
  const message = {
    from: process.env.MAIL_USERNAME,
    to: getUSerById.email,
    subject: "Bike-service Status changed",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      res.status(200).send({ meta: 401, booking });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email." });
    });
};

module.exports = {
  getAllBooking,
  getBooking,
  createBooking,
  editBooking,
};
