const adoptionOffers = require("../models/petModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllAdoptionOffers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    adoptionOffers.find({ offerAdoption: true }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const adoptedOffer = await features.query;
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: adoptedOffer.length,
    data: {
        adoptedOffer,
    },
  });
});

exports.getAdoptedOffer = catchAsync(async (req, res, next) => {
  const adoptedOffer = await adoptionOffers.findById(req.params.id, {
    offerAdoption: true,
  });

  if (!adoptedOffer || adoptedOffer.offerAdoption === false) {
    return next(
      new AppError("No pet found with that ID or Not offered for adoption", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
        adoptedOffer,
    },
  });
});

exports.offerPetAdoption = catchAsync(async (req, res, next) => {
  const adoptedOffer = await adoptionOffers.findByIdAndUpdate(req.params.id);

  if (!adoptedOffer || adoptedOffer.offerAdoption === true) {
    return next(
      new AppError("No pet found with that ID or Not offered for adoption", 404)
    );
  }

  adoptedOffer.offerAdoption = true;
  res.status(201).json({
    status: "success",
    pet: adoptedOffer,
  });
});

exports.deleteAdoptionOffer = catchAsync(async (req, res, next) => {
  const adoptedOffer = await adoptionOffers.findByIdAndUpdate(req.params.id);

  if (!adoptedOffer || adoptedOffer.offerAdoption === false) {
    return next(
      new AppError("No pet found with that ID or Not offered for adoption", 404)
    );
  }
  adoptedOffer.offerAdoption = false;
  res.status(204).json({
    status: "success",
  });
});