const express = require("express");
const {
  addServiceProvider,
  updateService,
  getService,
  getServiceByLocation,
} = require("../controllers/addServiceProviderController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/", verifyJWT, addServiceProvider);

//UPDATE
router.put("/:id", updateService);

//Get one
router.get("/bservice/:id", getService);

//GET
router.get("/", getServiceByLocation);

module.exports = router;
