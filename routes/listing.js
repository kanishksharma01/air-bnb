const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

//New route
router.get("/new",isLoggedIn,listingController.renderNewForm);
//show route
router.get("/:id",wrapAsync(listingController.showListing));





//edit route
router.get("/:id/edit",
isLoggedIn,
isOwner,
wrapAsync(listingController.renderEditForm));

//update route
router.put("/:id",
isLoggedIn,
isOwner,
upload.single("listing[image]"),
validateListing,
wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,
isOwner,
wrapAsync(listingController.destroyListing));

module.exports = router;
