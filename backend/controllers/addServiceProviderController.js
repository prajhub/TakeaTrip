const User = require('../model/user')
const Service = require('../model/Service');
const cloudinary = require('../utils/cloudinary')


const addServiceProvider = async (req, res) => {

    const { city, address, zipCode, photos, serviceType, activityOption,  serviceOption, phoneNum, description, name, website, country } = req.body;

    try {
        // find the user by ID
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        
      

      
        
        // create a new service with the provided data
        const newService = new Service({
          city,
          address,
          zipCode,
          serviceType,
          photos,
          activityOption,
          serviceOption,
          phoneNum,
          description,
          name,
          website,
          country
        });
        
        // save the new service
        const savedService = await newService.save();
        
        // add the new service to the user's services array
        user.services.push(savedService._id);

        // Change user's role to Service Provider
        user.roles = "Service Provider";
        
        
        // save the updated user
        await user.save();
        
        res.status(200).json(savedService);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    }


    const updateService = async (req, res) => {
      try {
          const serviceId = req.params.id;
          console.log(serviceId)
  
          // const { address, description, number, website, image, cuisines, foods, features, minPrice, maxPrice } = req.body;
          // console.log(image)
          const updatedService = await Service.findByIdAndUpdate(serviceId, {
            $set: req.body
          }, { new: true });
      
          res.status(200).json(updatedService);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
  }

  const getService = async (req, res) => {

    const id = req.params.id

    try {
        const service = await Service.findById(id)
        if(!service){
            return res.status(400).json({ message: 'Food service not found'})
        }
        res.status(200).json(service)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}
  
    
    module.exports = { addServiceProvider, updateService, getService };

