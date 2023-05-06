const Booking = require("../model/roomBooking");
const Room = require("../model/room");
const User = require("../model/user");
const moment = require("moment");
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
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),

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

      // Update the user's hasBookedRoom field to true
      await User.findByIdAndUpdate(userid, { hasBookedRoom: true });
    }

    res.send("Payment successfull, Your room is booked");
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { bookRoom };
