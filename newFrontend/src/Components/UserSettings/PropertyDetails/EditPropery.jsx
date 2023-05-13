import React, { useState, useEffect } from "react";

import axios from "axios";
import { setClearSuccess } from "../../../Features/accommodations/updateAccoSlice";
import { handleSuccess } from "../../Reusables/SuccessMessage";
import Spinner from "../../Reusables/Spinner";
import { useNavigate } from "react-router";
import { MdFreeBreakfast, MdOutlinePets } from "react-icons/md";
import { BiSpa } from "react-icons/bi";
import { GiCampingTent } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { updateAccomodation } from "../../../Features/accommodations/updateAccoAction";

const EditPropery = ({ selectedProperty, onClose }) => {
  const [isTouched, setIsTouched] = useState(false);
  //React-hook-form
  const form = useForm();
  const { register, control, setValue, handleSubmit, watch, getValues } = form;

  const [formData, setFormData] = useState({
    id: selectedProperty._id,
    address: selectedProperty.address,
    amenities: selectedProperty.amenities || "",
    checkinTime: selectedProperty.checkinTime || "",
    checkoutTime: selectedProperty.checkoutTime || "",
    frontDesk: selectedProperty.frontDesk || false,
    spa: selectedProperty.spa || false,
    breakfast: selectedProperty.breakfast || false,
    pets: selectedProperty.pets || false,
    outdoor: selectedProperty.outdoor || false,
    selfCheckIn: selectedProperty.selfCheckIn || false,
  });

  console.log(formData);

  const [amenities, setAmenities] = useState(selectedProperty.amenities || []);

  //Amenities List
  const amenitiesList = [
    { id: 1, name: "Free Wi-Fi" },
    { id: 2, name: "Swimming pool" },
    { id: 3, name: "Air conditioning" },
    { id: 4, name: "Parking" },
    { id: 5, name: "Fitness center" },
    { id: 6, name: "Breakfast included" },
    { id: 7, name: "24-hour front desk" },
    { id: 8, name: "Pet-friendly" },
    { id: 9, name: "Non-smoking rooms" },
    { id: 10, name: "Family rooms" },
    { id: 11, name: "Airport shuttle" },
    { id: 12, name: "Spa" },
    { id: 13, name: "Bar" },
    { id: 14, name: "Restaurant" },
    { id: 15, name: "Room service" },
    { id: 16, name: "Laundry" },
    { id: 17, name: "Conference Space" },
    { id: 18, name: "Restaurant on-site" },
    { id: 19, name: "Pool" },
  ];

  const navigate = useNavigate();

  const handleAddRoom = () => {
    navigate(`/account/properties/${selectedProperty._id}/createRoom`, {
      state: { selectedProperty },
    });
  };

  //Front Desk
  const [hasFrontDesk, setHasFrontDesk] = useState(null);
  console.log(hasFrontDesk);

  const handleButtonClick = (event) => {
    const answer = event.target.value === "yes";
    setHasFrontDesk(answer);
    setIsTouched(true);
    setValue("frontDesk", answer);
  };

  //Self check in
  const [hasSelfCheckIn, setHasSelfCheckIn] = useState(null);

  const handleSelfClick = (event) => {
    const answer = event.target.value === "yes";
    setHasSelfCheckIn(answer);
    setIsTouched(true);
    setValue("selfCheckIn", answer);
  };

  //Handle check in
  const [checkInFrom, setCheckInFrom] = useState("6:00 AM");
  const [checkInTo, setCheckInTo] = useState("5:30 AM");

  const checkInTimes = [checkInFrom, checkInTo];
  console.log(checkInTimes);

  const checkInOptions = [];

  for (let i = 6; i <= 24; i++) {
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:00 AM`);
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:30 AM`);
  }

  const handleCheckInFromChange = (event) => {
    setCheckInFrom(event.target.value);
    setIsTouched(true);

    setValue("checkinTime", [newFromValue, checkInTo]);
  };

  const handleCheckInToChange = (event) => {
    const newToValue = event.target.value;
    setCheckInTo(newToValue);
    setValue("checkinTime", [checkInFrom, newToValue]);
  };

  //Chck out time

  const checkOutOptions = [];

  for (let i = 6; i <= 24; i++) {
    checkOutOptions.push(
      <option key={`${i}:00`} value={`${i}:00 AM`}>{`${i}:00 AM`}</option>
    );
  }

  checkOutOptions.push(
    <option key={`12:00`} value={`12:00 PM`}>
      12:00 PM
    </option>
  );

  const [checkoutTime, setCheckoutTime] = useState(
    checkOutOptions[0].props.value
  );

  const handleCheckoutChange = (e) => {
    setCheckoutTime(e.target.value);
    setIsTouched(true);
    setValue("checkoutTime", e.target.value);
  };

  //Breakfast

  const [offersBreakfast, setOffersBreakfast] = useState(null);

  const handleBreakfastClick = (event) => {
    const answer = event.target.value === "yes";
    setOffersBreakfast(answer);
    setValue("breakfast", answer);
    setIsTouched(true);
  };

  //Spas
  const [hasSpa, setHasSpa] = useState(null);

  const handleSpaClick = (event) => {
    const answer = event.target.value === "yes";
    setHasSpa(answer);
    setValue("spa", answer);
    setIsTouched(true);
  };

  //Pets
  const [allowsPet, setAllowsPet] = useState(null);

  const handlePetClick = (event) => {
    const answer = event.target.value === "yes";
    setAllowsPet(answer);
    setValue("pets", answer);
    setIsTouched(true);
  };

  //Recreation
  const [recreation, setRecreation] = useState(null);

  const handleRecClick = (event) => {
    const answer = event.target.value === "yes";
    setRecreation(answer);
    setIsTouched(true);
    setValue("outdoor", answer);
  };

  //Amnities select

  const handleAmenityChange = (event) => {
    const amenityName = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setAmenities([...amenities, amenityName]);
    } else {
      setAmenities(amenities.filter((name) => name !== amenityName));
      setValue(
        "amenities",
        amenities.filter((name) => name !== amenityName)
      );
      return;
    }
    setValue("amenities", [...amenities, amenityName]);
  };

  //For photos
  const [uploadedImages, setUploadedImages] = useState(
    selectedProperty.photos || []
  );
  const [imagePreviews, setImagePreviews] = useState(
    (selectedProperty.photos || []).map((photo) => ({
      url: photo,
      id: Math.random(),
    }))
  );
  useEffect(() => {
    setValue("photos", uploadedImages);
    setValue("id", selectedProperty._id);
  }, [uploadedImages, setValue]);

  const handleImage = async (e) => {
    const files = e.target.files;
    let uploadedImagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "gqtcjdks");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dhngfjx6o/image/upload",
          formData
        );
        uploadedImagesArray.push(res.data.secure_url);
      } catch (err) {
        console.log(err);
      }
    }

    // combine the existing images with the newly uploaded images
    const updatedImages = uploadedImagesArray.concat(uploadedImages);
    setUploadedImages(updatedImages);
    setImagePreviews(
      updatedImages.map((image) => ({ url: image, id: Math.random() }))
    );
    setValue("photos", updatedImages);
  };

  const handleDelete = (id) => {
    const deletedImage = imagePreviews.find((prev) => prev.id === id);

    // remove the image from the imagePreviews state
    setImagePreviews((prevState) =>
      prevState.filter((image) => image.id !== id)
    );

    // remove the image from the uploadedImages state
    const newUploadedImages = uploadedImages.filter(
      (image) => image !== deletedImage.url
    );
    setUploadedImages(newUploadedImages);

    // update the form value of "photos"
    setValue("photos", newUploadedImages);
  };
  const dispatch = useDispatch();

  const { successMessage } = useSelector((state) => state.updateAcco);
  const { success } = useSelector((state) => state.updateAcco);

  useEffect(() => {
    if (success) {
      // Display the alert
      // alert(successMessage);

      handleSuccess(success, successMessage);
      onClose();
      // Clear the success state
      dispatch(setClearSuccess());
    }
  }, [success, dispatch, onClose, successMessage]);

  const onSumbit = async (data) => {
    try {
      const {
        amenities,
        breakfast,
        checkinTime,
        checkoutTime,
        frontDesk,
        outdoor,
        pets,
        photos,
        selfCheckIn,
        spa,
      } = data;

      const updatedFormData = {
        ...formData,
        amenities: amenities ? amenities : selectedProperty.amenities,
        checkinTime: checkinTime ? checkinTime : selectedProperty.checkIinTime,
        checkoutTime: checkoutTime
          ? checkoutTime
          : selectedProperty.checkoutTime,
        breakfast: breakfast ? breakfast : selectedProperty.breakfast,
        frontDesk: frontDesk ? frontDesk : selectedProperty.frontDesk,
        outdoor: outdoor ? outdoor : selectedProperty.outdoor,
        pets: pets ? pets : selectedProperty.pets,
        photos: photos,
        selfCheckIn: selfCheckIn ? selfCheckIn : selectedProperty.selfCheckIn,
        spa: spa ? spa : selectedProperty.spa,
      };

      if (photos.length > 0) {
        updatedFormData.photos = photos;
      } else {
        delete updatedFormData.photos;
      }
      setFormData(updatedFormData);

      dispatch(updateAccomodation(updatedFormData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="w-full h-full flex flex-col">
        <form onSubmit={handleSubmit(onSumbit)}>
          <div className="flex flex-col gap-9">
            {/* Front Desk */}
            <section className="border p-4 bg-gray-200">
              <span className="contents text-lg font-semibold leading-6 text-gray-900 ">
                Is there a front desk at your property?
              </span>
              <div className="mt-5">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    value="yes"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      hasFrontDesk === true
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleButtonClick}
                  >
                    Yes
                  </button>

                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      hasFrontDesk === false
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleButtonClick}
                    value="no"
                  >
                    No
                  </button>
                  <input hidden {...register("frontDesk")} />
                </div>
              </div>
            </section>

            {/* Front Desk */}

            {/* Self Check in */}

            <section className="border p-4 bg-gray-200">
              <span className="contents text-lg font-semibold leading-6 text-gray-900 ">
                Is self check-in available?
              </span>
              <div className="mt-5">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      hasSelfCheckIn === true
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleSelfClick}
                    value="yes"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      hasSelfCheckIn === false
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleSelfClick}
                    value="no"
                  >
                    No
                  </button>
                  <input hidden {...register("selfCheckIn")} />
                </div>
              </div>
            </section>

            {/* Self Check in */}

            {/* Check in time */}

            <section className="">
              <span className="contents text-xl font-semibold leading-6  text-gray-900 ">
                When can guests check in?
              </span>
              <div>
                <div className="flex gap-4">
                  <div className="flex gap-4 items-center mt-5 mb-4">
                    <label className="block font-medium mb-1">From:</label>
                    <select
                      value={checkInFrom}
                      onChange={handleCheckInFromChange}
                      className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white"
                    >
                      {checkInOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <label className="block font-medium mb-1">To:</label>
                    <select
                      value={checkInTo}
                      onChange={handleCheckInToChange}
                      className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white"
                    >
                      {checkInOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <input type="hidden" {...register("checkinTime")} />
                  </div>
                </div>
              </div>
            </section>

            {/* Check in time */}

            {/* Check out time */}

            <section>
              <span className="contents text-xl font-semibold leading-6 text-gray-900">
                When do guests need to check out?
              </span>
              <div>
                <div className=" mt-5 mb-4">
                  <select
                    value={checkoutTime}
                    onChange={handleCheckoutChange}
                    className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white"
                  >
                    {checkOutOptions}
                    <input hidden {...register("checkoutTime")} />
                  </select>
                </div>
              </div>
            </section>

            {/* Check out time */}

            {/* Offer breakfast */}

            <section className="border p-4 bg-gray-200">
              <span className=" flex flex-row items-center gap-2 text-lg font-semibold leading-6 text-gray-900 ">
                <MdFreeBreakfast size={20} />
                Do you offer breakfast?
              </span>
              <div className="mt-5">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      offersBreakfast === true
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleBreakfastClick}
                    value="yes"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      offersBreakfast === false
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleBreakfastClick}
                    value="no"
                  >
                    No
                  </button>
                  <input hidden {...register("breakfast")} />
                </div>
              </div>
            </section>

            {/* Offer breakfast */}

            {/* Has Spa */}

            <section className="border p-4 bg-gray-200">
              <span className="flex flex-row items-center gap-2 text-lg font-semibold leading-6 text-gray-900 ">
                <BiSpa size={20} />
                Do you have a spa or spa services?
              </span>
              <div className="mt-5">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      hasSpa === true
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleSpaClick}
                    value="yes"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      hasSpa === false
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleSpaClick}
                    value="no"
                  >
                    No
                  </button>
                  <input hidden {...register("spa")} />
                </div>
              </div>
            </section>

            {/* Has Spa */}

            <div className="font-semibold text-lg text-gray-500">
              More facilities
            </div>

            {/* Allow pet */}

            <section className="border p-4 bg-gray-200">
              <span className="flex flex-row items-center gap-2 text-lg font-semibold leading-6 text-gray-900 ">
                <MdOutlinePets size={20} /> Do you allow pets?
              </span>
              <div className="mt-5">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      allowsPet === true
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handlePetClick}
                    value="yes"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      allowsPet === false
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handlePetClick}
                    value="no"
                  >
                    No
                  </button>
                  <input hidden {...register("pets")} />
                </div>
              </div>
            </section>

            {/* Allow pet */}

            {/* Recreation */}

            <section className="border p-4 bg-gray-200">
              <span className="flex flex-row items-center gap-2 text-lg font-semibold leading-6 text-gray-900 ">
                <GiCampingTent size={20} /> Do you have outdoor recreation
                areas?
              </span>
              <div className="mt-5">
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      recreation === true
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleRecClick}
                    value="yes"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="front-desk"
                    className={`px-4 py-2 font-semibold rounded-full ${
                      recreation === false
                        ? "bg-primary-600 text-white ring-2 ring-primary-600"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={handleRecClick}
                    value="no"
                  >
                    No
                  </button>
                  <input hidden {...register("outdoor")} />
                </div>
              </div>
            </section>
            {/* Recreation */}

            <section>
              <h2 className="py-2 mb-2 font-semibold">Select more amenities</h2>
              <div className="grid grid-cols-3 gap-4">
                {amenitiesList.map((amenity) => (
                  <label key={amenity.id} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={amenity.name}
                      {...register("amenities")}
                      className="form-checkbox h-5 w-5 text-primary-600"
                      onChange={(event) => {
                        handleAmenityChange(event);
                        setIsTouched(true);
                      }}
                      checked={amenities.includes(amenity.name)}
                    />
                    <span className="ml-2 text-gray-700">{amenity.name}</span>
                  </label>
                ))}
              </div>
            </section>
            <span className="text-lg font-semibold">Update Photos</span>

            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <input
                  type="file"
                  name="file-upload"
                  className="mb-5"
                  multiple
                  onBlur={() => setIsTouched(true)}
                  onChange={handleImage}
                />
                <div className="flex flex-row gap-4 flex-wrap">
                  {imagePreviews.map((image) => (
                    <div
                      key={image.id}
                      className="flex flex-col mb-5 w-80 border border-gray-200 rounded-md overflow-hidden shadow-md"
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-48 object-cover"
                      />
                      <button onClick={() => handleDelete(image.id)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                <input hidden {...register("photos")} />
              </div>
            </div>
          </div>
          <button
            disabled={!isTouched}
            className={`text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mr-2 mb-2 ${
              !isTouched
                ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          >
            Update
          </button>
        </form>
        <DevTool control={control} />
      </section>
      <button
        onClick={handleAddRoom}
        type="button"
        className="text-white  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mr-2 mb-2"
      >
        Add Room
      </button>
    </>
  );
};

export default EditPropery;
