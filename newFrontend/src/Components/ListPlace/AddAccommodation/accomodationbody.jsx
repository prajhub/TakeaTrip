import React, { useState, useEffect } from "react";
import { useCreateAccommodationMutation } from "../../../Features/accommodations/accommodationApiSlice";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Modal } from "antd";
import { useGetUserDetailsQuery } from "../../../Features/api/apiSlice";
import { useDispatch } from "react-redux";
import { setNewInfo } from "../../../Features/auth/authSlice";
import "react-phone-number-input/style.css";

const accomodationbody = () => {
  const form = useForm();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState,
    getValues,
  } = form;
  const { errors } = formState;

  const accommodationTypes = [
    { name: "Hotel", icon: "🏨" },
    { name: "Resort", icon: "🏝️" },
    { name: "Vacation Rental", icon: "🏠" },
    { name: "Apartment", icon: "🏢" },
    { name: "Guesthouse", icon: "🏡" },
    { name: "Hostel", icon: "🛏️" },
    { name: "Motel", icon: "🏩" },
    { name: "Inn", icon: "🏚️" },
    { name: "Villa", icon: "🏰" },
    { name: "Bed and Breakfast", icon: "🛌" },
  ];

  const onSiteStaffOptions = [
    { label: "Full time", value: "full_time" },
    { label: "Part time", value: "part_time" },
    { label: "No on site staff", value: "no_staff" },
  ];

  const amenitiesList = [
    "Free Wi-Fi",
    "Swimming pool",
    "Air conditioning",
    "Parking",
    "Fitness center",
    "Breakfast included",
    "24-hour front desk",
    "Pet-friendly",
    "Non-smoking rooms",
    "Family rooms",
    "Airport shuttle",
    "Spa",
    "Bar",
    "Restaurant",
    "Room service",
    "Laundry",
  ];
  const checkInOptions = [];
  const checkOutOptions = [];
  for (let i = 6; i <= 24; i++) {
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:00 AM`);
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:30 AM`);
    checkOutOptions.push(
      <option key={`${i}:00`} value={`${i}:00 AM`}>{`${i}:00 AM`}</option>
    );
    checkOutOptions.push(
      <option key={`24:00`} value={`12:00 PM`}>
        12:00 PM
      </option>
    );
  }
  for (let i = 0; i <= 5; i++) {
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:00 AM`);
    checkInOptions.push(`${i < 10 ? "0" : ""}${i}:30 AM`);
    checkOutOptions.push(
      <option key={`${i}:30`} value={`${i}:30 PM`}>{`${i}:30 PM`}</option>
    );
  }
  checkInOptions.push(`12:00 PM`);
  for (let i = 13; i <= 24; i++) {
    checkInOptions.push(`${i < 22 ? "0" : ""}${i - 12}:00 PM`);
    checkInOptions.push(`${i < 22 ? "0" : ""}${i - 12}:30 PM`);
  }

  const [selectedType, setSelectedType] = useState(null);

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [hasFrontDesk, setHasFrontDesk] = useState(null);

  const [checkInFrom, setCheckInFrom] = useState("6:00 AM");
  const [checkInTo, setCheckInTo] = useState("5:30 AM");

  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

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

    setUploadedImages(uploadedImagesArray);
    setImagePreviews(
      uploadedImagesArray.map((image) => ({ url: image, id: Math.random() }))
    );
    setValue("photos", uploadedImagesArray);
  };

  const handleDelete = (id) => {
    // remove the image from the imagePreviews state
    setImagePreviews((prevState) =>
      prevState.filter((image) => image.id !== id)
    );

    // remove the image from the uploadedImages state
    const newUploadedImages = uploadedImages.filter(
      (image) => image !== imagePreviews.find((prev) => prev.id === id).url
    );
    setUploadedImages(newUploadedImages);

    // update the form value of "photos"
    setValue("photos", newUploadedImages);
  };

  //Website validation
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  const handleCheckInFromChange = (event) => {
    setCheckInFrom(event.target.value);

    setValue("checkinTime", [newFromValue, checkInTo]);
  };

  const handleCheckInToChange = (event) => {
    const newToValue = event.target.value;
    setCheckInTo(newToValue);
    setValue("checkinTime", [checkInFrom, newToValue]);
  };

  const handleTypeSelect = (type, event) => {
    event.preventDefault();
    setSelectedType(type);
    setValue("type", type.name);
    console.log(selectedType);
  };

  useEffect(() => {
    setValue("amenities", selectedAmenities);
  }, [selectedAmenities]);

  const handleAmenitySelect = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    const answer = event.target.value === "yes";
    setHasFrontDesk(answer);
    setValue("frontDesk", answer);
  };

  const [createAccommodation, { isLoading, isError, error, isSuccess }] =
    useCreateAccommodationMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateStatus, setUpdatedStatus] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { data: returnedData } = await createAccommodation(data);
      if (!returnedData) {
        console.log("error ");
      } else {
        setIsModalVisible(true);
        setUpdatedStatus(true);
      }
      console.log(returnedData);
    } catch (error) {
      console.error(error);
    }
  };

  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails");
  console.log(data);

  useEffect(() => {
    if (updateStatus) {
      dispatch(setNewInfo(data));
    }
  }, [updateStatus, data, dispatch]);

  const navigate = useNavigate();

  const addMore = () => {
    window.location.reload();
  };

  const viewProperty = () => {
    navigate("/account/properties");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-[1400px]   mx-auto py-32">
          <div>
            <h1 className="font-open-san text-4xl font-semibold mb-9">
              How can we find you?
            </h1>
          </div>
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6 ">
              <div className="md:col-span-1 ">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Name & Description
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0 ">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="officialname"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Official name
                        </label>
                        <input
                          type="text"
                          id="placeName"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          autoComplete="family-name"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <span className="text-red-500">
                            {errors.name.message}
                          </span>
                        )}
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Website
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            {...register("website", {
                              required: "Website is required",
                              pattern: {
                                value: regex,
                                message: "Invalid website format",
                              },
                            })}
                            id="company-website"
                            className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            placeholder="www.example.com"
                          />
                        </div>
                        {errors.website && (
                          <span className="text-red-500">
                            {errors.website.message}
                          </span>
                        )}
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium leading-6 mb-2 text-gray-900"
                        >
                          Telephone
                        </label>

                        <input
                          type="text"
                          name="telephone"
                          {...register("contact", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Invalid phone number",
                            },
                          })}
                          id="telephone"
                          className="mt-2 block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.contact && (
                          <span className="text-red-500">
                            {errors.contact.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          {...register("desc", {
                            required: "This field is required",
                          })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                          placeholder="Write something about your place..."
                          defaultValue={""}
                        />
                      </div>
                      {errors.desc && (
                        <span className="text-red-500">
                          {errors.desc.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block " aria-hidden="true">
            <div className="py-5 ">
              <div className="border-t border-gray-200 " />
            </div>
          </div>

          <div className="mt-10  sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Photos
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Travelers interact with photos more than any other part of
                    your property listing, and the right ones can make a
                    difference.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className=" px-4 py-5 sm:p-6">
                    <div className="col-span-full">
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <input
                            type="file"
                            name="file-upload"
                            className="mb-5"
                            multiple
                            onChange={handleImage}
                          />
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
                          <input hidden {...register("photos")} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block " aria-hidden="true">
            <div className="py-5 ">
              <div className="border-t border-gray-200 " />
            </div>
          </div>

          <div className="mt-10  sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Additional Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3 ">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          {...register("country", {
                            required: "This field is required",
                          })}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.country && (
                          <span className="text-red-500">
                            {errors.country.message}
                          </span>
                        )}
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          {...register("address", {
                            required: "This field is required",
                          })}
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.address && (
                          <span className="text-red-500">
                            {errors.address.message}
                          </span>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          {...register("city", {
                            required: "This field is required",
                          })}
                          id="city"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <span className="text-red-500">
                            {errors.city.message}
                          </span>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          type="number"
                          {...register("zipcode", {
                            required: "This field is reuqired",
                          })}
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.zipcode && (
                          <span className="text-red-500">
                            {errors.zipcode.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10  sm:mt-0">
            <div className="md:grid md:grid-cols-3  md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Property ameneities
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Some additional information about your property.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden  shadow sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <section>
                      <h3>Choose the accommodation type</h3>
                      <div className="flex flex-wrap justify-center">
                        {accommodationTypes.map((type) => (
                          <button
                            key={type.name}
                            className={`${
                              selectedType === type
                                ? "bg-primary-500 text-white"
                                : "bg-white text-gray-700"
                            } font-semibold py-2 px-4 border border-gray-400 rounded shadow m-2 flex items-center`}
                            onClick={() => handleTypeSelect(type, event)}
                          >
                            <span className="mr-2">{type.icon}</span>
                            <span>{type.name}</span>
                          </button>
                        ))}
                      </div>
                      <input hidden {...register("type")} />
                    </section>
                    <section>
                      <h2 className="py-2 mb-2">
                        Select ameneities this property offers.
                      </h2>
                      <div className="grid grid-cols-3 gap-4">
                        {amenitiesList.map((amenity) => (
                          <div key={amenity}>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-primary-600"
                                onChange={() => handleAmenitySelect(amenity)}
                                checked={selectedAmenities.includes(amenity)}
                              />
                              <span className="ml-2 text-gray-700">
                                {amenity}
                              </span>
                              <input hidden {...register("amenities")} />
                            </label>
                          </div>
                        ))}
                      </div>
                    </section>
                    <section>
                      <legend className="contents text-xl font-semibold leading-6 text-gray-900">
                        Select the number of rooms / units the property has
                      </legend>
                      <div className="mt-4">
                        <input
                          type="number"
                          className="border-gray-400 border py-2 px-4 rounded ml-2"
                          {...register("numofRooms")}
                        />
                      </div>
                    </section>

                    <section>
                      <legend className="contents text-xl font-semibold leading-6 text-gray-900 ">
                        Is there a front desk at your property?
                      </legend>
                      <div className="mt-5">
                        <div className="flex gap-2 mb-4">
                          <button
                            id="front-desk"
                            className={`px-4 py-2 font-semibold rounded-full ${
                              hasFrontDesk === true
                                ? "bg-primary-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => handleButtonClick(event)}
                            value="yes"
                          >
                            Yes
                          </button>
                          <button
                            id="front-desk"
                            className={`px-4 py-2 font-semibold rounded-full ${
                              hasFrontDesk === false
                                ? "bg-primary-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => handleButtonClick(event)}
                            value="no"
                          >
                            No
                          </button>
                          <input hidden {...register("frontDesk")} />
                        </div>
                      </div>
                    </section>
                    <section>
                      <legend className="contents text-xl font-semibold leading-6  text-gray-900 ">
                        When can guests check in?
                      </legend>
                      <div>
                        <div className="flex gap-4">
                          <div className="flex gap-4 items-center mt-5 mb-4">
                            <label className="block font-medium mb-1">
                              From:
                            </label>
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
                            <label className="block font-medium mb-1">
                              To:
                            </label>
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
                    <section>
                      <legend className="contents text-xl font-semibold leading-6 text-gray-900">
                        When do guests need to check out?
                      </legend>
                      <div>
                        <div className=" mt-5 mb-4">
                          <select
                            {...register("checkoutTime")}
                            className="block w-full py-2 px-3 rounded bg-gray-200 border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white"
                          >
                            {checkOutOptions}
                          </select>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                <button className="py-2.5 mt-5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          footer={null}
          title={
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
              Your property is listed!
            </h3>
          }
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
        >
          <p className="">
            Would you like to view your property or continue listing more?
          </p>
          <div className="mt-4 flex flex-row gap-4">
            <button
              onClick={() => viewProperty()}
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700"
            >
              View Property
            </button>
            <button
              onClick={() => addMore()}
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary-700 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700"
            >
              Add more
            </button>
          </div>
        </Modal>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default accomodationbody;
