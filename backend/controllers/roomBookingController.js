const Booking = require("../model/roomBooking");
const Room = require("../model/room");
const User = require("../model/user");
const moment = require("moment");
const Accommodation = require("../model/accommodation");
const sendEmail = require("../utils/sendEmail");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51N3LOwIPhGSGqTOKdTR1Xv60jDjfCFR3uStcAwMj5jsKaIxnYCkIURvMtgNz9HN5qlbiK53MYMXPsO4uk4Ky2MKw00F2PeqEwp"
);

const bookRoom = async (req, res, next) => {
  const {
    room,
    userid,
    fromdate,
    roomid,
    roomnumber,
    token,
    todate,
    totalamount,
  } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "usd",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newBooking = new Booking({
        room,
        roomnumber,
        fromdate,
        todate,

        roomid,
        totalamount,

        userid,
        transactionId: "1234",
      });

      const fromdateISO = moment(fromdate, "DD-MM-YYYY").toISOString();
      const todateISO = moment(todate, "DD-MM-YYYY").toISOString();

      const booking = await newBooking.save();

      const roomtemp = await Room.findOneAndUpdate(
        { _id: roomid, "roomNumbers.number": roomnumber },
        {
          $set: {
            "roomNumbers.$.fromdate": fromdateISO,
            "roomNumbers.$.todate": todateISO,
            "roomNumbers.$.userId": userid,
          },
        },
        { new: true }
      );

      const paymentObj = {
        bookingId: booking._id,
        transactionId: payment.id,
        amount: totalamount,
        date: new Date().toISOString().slice(0, 10),
      };

      console.log(paymentObj);

      // Update the user's hasBookedRoom field to true & add the payment history
      const updatedUser = await User.findByIdAndUpdate(
        userid,
        {
          $push: { paymentHistory: paymentObj },
          $set: { hasBookedRoom: true },
        },
        { new: true }
      );

      const text = `Thankyou for booking a room. We hope you enjoy your stay `;
      const html = `<p>Thankyou for booking a room. We hope you enjoy your stay</p>`;

      await sendEmail(
        updatedUser.email,
        "Room booked successfully!",
        text,
        html
      );
    }

    res.send("Payment successfull, Your room is booked");
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getPaymentHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json(user.paymentHistory);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getRoomBookings = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Find the accommodation by ID
    const accommodation = await Accommodation.findById(id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    // Retrieve the room IDs associated with the accommodation
    const roomIds = accommodation.rooms;

    // Find the bookings for the room IDs
    const bookings = await Booking.find({ roomid: { $in: roomIds } });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { bookRoom, getPaymentHistory, getRoomBookings };
