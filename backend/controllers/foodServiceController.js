const FoodService = require("../model/foodservice");
const User = require("../model/user");

const createNewFoodService = async (req, res) => {
  const { name, country, city, address, number, type, photos, zipcode } =
    req.body;

  const userId = req.user.userId;

  if (!name || !country || !city || !address || !number || !type) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Finding the user and declaring it owner
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingFoodService = await FoodService.findOne({ name });
    if (existingFoodService) {
      return res.status(409).json({ message: "The place already exists" });
    }

    const newFoodService = new FoodService({
      name,
      zipcode,
      country,
      city,
      address,
      number,
      type,
      owner: user._id,
      photos,
    });
    await newFoodService.save();

    user.foodservices.push(newFoodService);

    // Change user's role to Service Provider
    user.roles = "Service Provider";

    await user.save();

    res.status(200).json(newFoodService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateFoodService = async (req, res) => {
  try {
    const foodServiceId = req.params.id;
    console.log(foodServiceId);

    // const { address, description, number, website, image, cuisines, foods, features, minPrice, maxPrice } = req.body;
    // console.log(image)
    const updatedFoodService = await FoodService.findByIdAndUpdate(
      foodServiceId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedFoodService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getFoodService = async (req, res) => {
  const id = req.params.id;

  try {
    const foodService = await FoodService.findById(id);
    if (!foodService) {
      return res.status(400).json({ message: "Food service not found" });
    }
    res.status(200).json(foodService);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getFoodServices = async (req, res) => {
  try {
    const foodService = await FoodService.find();
    res.status(200).json(foodService);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getFoodServiceByLocation = async (req, res, next) => {
  const { location } = req.query;
  try {
    const foodservice = await FoodService.find({
      $or: [{ city: location }, { country: location }],
    });

    if (!foodservice.length) {
      return res.status(404).json("No service found");
    }

    res.status(200).json(foodservice);
  } catch (error) {
    next(err);
  }
};

const deleteFoodService = async (req, res) => {
  try {
    await FoodService.findByIdAndDelete(req.params.id);
    res.status(200).json("The food service has been deleted.");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

module.exports = {
  createNewFoodService,
  updateFoodService,
  getFoodService,
  deleteFoodService,
  getFoodServiceByLocation,
  getFoodServices,
};
