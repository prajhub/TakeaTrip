const Booking = require('../model/roomBooking');
const Room = require('../model/room');

const bookRoom = async (req, res, next) => {

    try {
        const { roomId, checkinDate, checkoutDate } = req.body;
        const userId = req.user.userId;
        console.log(userId)
    
        // find the room being reserved
        const room = await Room.findById(roomId);
    
        // check if room is available for the requested dates
        const isAvailable = room.roomNumbers.some(
          ({ unavailableDates }) =>
            checkinDate < Math.max(...unavailableDates.map((d) => new Date(d))) &&
            checkoutDate > Math.min(...unavailableDates.map((d) => new Date(d)))
        );
    
        if (!isAvailable) {
          return res.status(400).json({ msg: 'Room is not available for the requested dates' });
        }
    
        // create the booking
        const booking = new Booking({
          user: userId,
          room: roomId,
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
        });
    
        // save the booking
        await booking.save();
    
        // update room's unavailable dates
        const roomNumberIndex = room.roomNumbers.findIndex((number) => number.number === req.body.roomNumber);
        room.roomNumbers[roomNumberIndex].unavailableDates.push(checkinDate, checkoutDate);
        await room.save();
    
        return res.status(200).json({ msg: 'Room reservation created successfully!' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }

}



module.exports = { bookRoom}