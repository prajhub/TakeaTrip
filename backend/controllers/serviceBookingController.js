const Service = require("../model/Service");
const Booking = require("../model/serviceBooking");
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
            "packages.$.startTime": starttime,
            "packages.$.bookedby": userid,
          },
        },
        { new: true }
      );

      res.status(200).send("Payment successfull, Service booked");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { bookService };
