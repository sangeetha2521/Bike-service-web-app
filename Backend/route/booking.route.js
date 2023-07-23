const express = require("express");
const { authorization } = require("../service/auth.service");
const bookingController = require("../controller/booking.controller");

const router = express.Router();

router.get("/", authorization, bookingController.getAllBooking);
router.post("/", authorization, bookingController.createBooking);
router.get("/:id", authorization, bookingController.getBooking);
router.put("/:id", authorization, bookingController.editBooking);

module.exports = router;
