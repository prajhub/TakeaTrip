const Service = require("../model/Service");
const Booking = require("../model/serviceBooking");
const User = require("../model/user");
const sendEmail = require("../utils/sendEmail");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51N3LOwIPhGSGqTOKdTR1Xv60jDjfCFR3uStcAwMj5jsKaIxnYCkIURvMtgNz9HN5qlbiK53MYMXPsO4uk4Ky2MKw00F2PeqEwp"
);

const bookService = async (req, res, next) => {
  const {
    userid,
    serviceid,
    packagename,
    starttime,
    numofpeople,
    name,
    packageid,
    date,
    token,
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
        userid,
        packagename,
        numofpeople,
        name,
        starttime,
        serviceid,
        packageid,
        date: moment(date).format("DD-MM-YYYY"),
        totalamount,
        transactionid: "123",
      });

      const dateIso = moment(date).format("DD-MM-YYYY");

      const booking = await newBooking.save();

      const servicetemp = await Service.findOneAndUpdate(
        { _id: serviceid, "packages.packageName": packagename },
        {
          $set: {
            "packages.$.numPeopleIncluded": numofpeople,
            "packages.$.date": dateIso,

            "packages.$.bookedby": userid,
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

      const newUser = await User.findByIdAndUpdate(
        userid,
        {
          $push: { paymentHistory: paymentObj },
        },
        { new: true }
      );

      const text = `Thankyou for choosing us. Hope you enjoy the experience `;
      const html = `<p>Thankyou for choosing us. Hope you enjoy the experience</p>`;

      await sendEmail(
        newUser.email,
        "Package booked successfully!",
        text,
        html
      );

      res.status(200).send("Payment successfull, Service booked");
    }
  } catch (error) {
    console.log(error);
  }
};

const getServiceBooking = async (req, res, next) => {
  const id = req.params.id;

  try {
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const bookings = await Booking.find({ serviceid: id });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this service" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { bookService, getServiceBooking };
