const User = require('../model/user')
const Service = require('../model/Service');
const cloudinary = require('../utils/cloudinary')


const addServiceProvider = async (req, res) => {

    const { city, streetAddress, zipCode, serviceType, img, serviceOption, phoneNum, description, officialName, website, country } = req.body;

    try {
        // find the user by ID
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        
        // update the user's isServiceProvider attribute to true
        user.isServiceProvider = true;

        //uploading image to cloudniary
        const result = await cloudinary.uploader.upload(img, {
          folder: "service",
          width: 300,
          crop: 'scale'
      })
        
        // create a new service with the provided data
        const newService = new Service({
          city,
          streetAddress,
          zipCode,
          serviceType,
          photos: {
            public_id: result.public_id,
            url: result.secure_url
        },
          serviceOption,
          phoneNum,
          description,
          officialName,
          website,
          country
        });
        
        // save the new service
        const savedService = await newService.save();
        
        // add the new service to the user's services array
        user.services.push(savedService._id);
        
        // save the updated user
        const savedUser = await user.save();
        
        res.status(200).json(savedService);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    }
    
    module.exports = { addServiceProvider };

