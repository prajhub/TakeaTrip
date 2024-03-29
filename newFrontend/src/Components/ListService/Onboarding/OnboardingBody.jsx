import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";

import { Modal } from "antd";

import { useNavigate } from "react-router";
import { FaMapSigns } from "react-icons/fa";
import { GiFlyingFox } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { setNewInfo } from "../../../Features/auth/authSlice";
import { useGetUserDetailsQuery } from "../../../Features/api/apiSlice";
import { useCreateServiceMutation } from "../../../Features/services/addServiceSlice";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const OnboardingBody = () => {
  const [createService] = useCreateServiceMutation();

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

  const navigate = useNavigate();

  //Images

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

  //Public INfo

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateStatus, setUpdatedStatus] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSubmit = async (formData) => {
    try {
      const { data } = await createService(formData);

      if (!data) {
        console.log("error");
      } else {
        setIsModalVisible(true);
        setUpdatedStatus(true);
      }
      console.log(data);
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

  const addMore = () => {
    window.location.reload();
  };

  const viewProperty = () => {
    navigate("/account/properties");
  };

  return (
    <>
      <div className="max-w-[1400px]   mx-auto py-20 ">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Public Info */}

          <div>
            <h1 className="font-open-san text-4xl font-semibold mb-9">
              Let's start with the basics
            </h1>
          </div>
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6 ">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    This information will show on your public Tripadvisor
                    listing.
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="officialname"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Where does your experience take place?
                        </label>
                        <select
                          {...register("country", {
                            required: "This field is required",
                          })}
                          value={watch("country")}
                          className="block appearance-none w-full bg-white border mt-3 border-gray-400 hover:border-gray-500 px-4 py-3 mb-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select a country</option>
                          {countries.map((country) => (
                            <option
                              key={country.name.common}
                              value={country.name.common}
                            >
                              {country.name.common}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <span className="text-[red] text-sm ">
                            {errors.country.message}
                          </span>
                        )}
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Tell us more
                        </label>
                        <div className="mt-2 ">
                          <textarea
                            id="description"
                            {...register("description", {
                              required: "This field is required",
                            })}
                            rows={3}
                            className="mt-1 mb-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            placeholder="Write a brief description about the tours, activities, or other experiences you offer."
                          />
                          {errors.description && (
                            <span className="text-[red] text-sm ">
                              {errors.description.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="officialName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Official name
                        </label>
                        <input
                          type="text"
                          placeholder="This is the name used when marketing your tours, activities, or experiences."
                          id="officialName"
                          {...register("name", {
                            required: "This field is required",
                          })}
                          autoComplete="family-name"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <span className="text-[red] text-sm ">
                            {errors.name.message}
                          </span>
                        )}
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="website"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Website
                        </label>
                        <div className="mt-2 flex flex-col rounded-md shadow-sm">
                          <input
                            type="text"
                            {...register("website", {
                              required: "This field is required",
                            })}
                            id="website"
                            className="block w-full flex-1 mb-2 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            placeholder="www.example.com"
                          />

                          {errors.website && (
                            <span className="text-[red] text-sm ">
                              {errors.website.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium leading-6 mb-2 text-gray-900"
                        >
                          Telephone
                        </label>
                        <div className="flex flex-col gap-2">
                          <input
                            type="number"
                            {...register("phoneNum", {
                              required: "This field is required",
                            })}
                          />

                          {errors.phoneNum && (
                            <span className="text-[red] text-sm ">
                              {errors.phoneNum.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                      <label
                          htmlFor="price"
                          className="block text-sm font-medium leading-6 mb-2 text-gray-900"
                        >
                          What is the cheapest price for your packages?
                        </label>
                      <div className="mt-4">
                        <input
                          type="number"
                          className="border-gray-400 border py-2 px-4 rounded ml-2"
                          {...register("cheapestPrice")}
                        />
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

          {/* Public Info */}

          {/* Photos*/}

          <div className="mt-10  sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-xl font-semibold leading-6 mb-4 text-gray-900">
                    Add photos that capture what you offer
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    The first photo will be your cover photo, which is one of
                    the first things travelers will see on your listing.
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
          {/* Photos */}

          {/* Location Info */}

          <div>
            <h1 className="text-xl font-semibold leading-6 mb-4 text-gray-900">
              Next, tell us where you operate from
            </h1>
          </div>
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6 ">
              <div className="md:col-span-1"></div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="officialname"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Search for a city or town
                        </label>
                        <input
                          type="text"
                          {...register("city", {
                            required: "This field is required",
                          })}
                          autoComplete="family-name"
                          className="mt-2 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <span className="text-[red] text-sm ">
                            {errors.city.message}
                          </span>
                        )}
                      </div>

                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          {...register("address", {
                            required: "This field is required",
                          })}
                          id="streetAddress"
                          autoComplete="family-name"
                          className="mt-2 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.address && (
                          <span className="text-[red] text-sm ">
                            {errors.address.message}
                          </span>
                        )}
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="zipcode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Zip code/postal code
                        </label>
                        <input
                          type="number"
                          {...register("zipCode", {
                            required: "This field is required",
                          })}
                          id="zipcode"
                          autoComplete="family-name"
                          className="mt-2 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        {errors.zipCode && (
                          <span className="text-[red] text-sm ">
                            {errors.zipCode.message}
                          </span>
                        )}
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

          {/*Location Info  */}

          {/*Experience  */}

          <div>
            <h1 className="text-xl font-semibold leading-6 mb-4 text-gray-900">
              About your experiences
            </h1>
          </div>
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6 ">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base  leading-6 text-gray-900">
                    The information that you provide here will be used for your
                    Tripadvisor listing. Here, travelers can see what
                    products/experiences you offer and where you're located.
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <div className="flex flex-col space-y-4">
                          {/* First Selection  */}
                          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                            <input
                              type="radio"
                              id="tours"
                              name="serviceType"
                              value="tours"
                              {...register("serviceType", {
                                required: "This field is required",
                              })}
                            />

                            <div className="flex flex-row items-center ml-6 ">
                              <FaMapSigns size={45} className="mr-3" />
                              <div className="flex flex-col ml-3">
                                <h3 className="text-xl font-semibold">Tours</h3>
                                <p className="text-md mb-4 text-gray-600">
                                  Guided visits to one or more sites
                                </p>
                                <span className="font-semibold">
                                  What tours do you offer?
                                </span>
                                {/*Dropdown for Tours*/}

                                <div className="mt-3">
                                  <select
                                    defaultValue=""
                                    {...register("serviceOption")}
                                    name="serviceOption"
                                  >
                                    <option value="">Select an option</option>
                                    <optgroup label="Air Tours">
                                      <option value="Air Tours">
                                        Air Tours
                                      </option>
                                      <option value="Balloon Rides">
                                        Balloon Rides
                                      </option>
                                      <option value="Helicopter Tours">
                                        Helicopter Tours
                                      </option>
                                    </optgroup>
                                    <optgroup label="Land Tour">
                                      <option value="Bike Tours">
                                        Bike Tours
                                      </option>
                                      <option value="Bus Tours">
                                        Bus Tours
                                      </option>
                                      <option value="Motorcycle Tours">
                                        Motorcycle Tours
                                      </option>
                                      <option value="Train Tours">
                                        Train Tours
                                      </option>
                                      <option value="Walking Tours">
                                        Walking Tours
                                      </option>
                                    </optgroup>
                                    <optgroup label="Food & Drinks">
                                      <option value="Beer Tasting Tours">
                                        Beer Tasting Tours
                                      </option>
                                      <option value="Wine Tasting Tours">
                                        Wine Tasting Tours
                                      </option>
                                      <option value="Distillery Tours">
                                        Distillery Tours
                                      </option>
                                      <option value="Food tours">
                                        Food tours
                                      </option>
                                    </optgroup>
                                    <optgroup label="Water Tours">
                                      <option value="Boat Tours">
                                        Boat Tours
                                      </option>
                                      <option value="Fishing Cruises">
                                        Fishing Cruises
                                      </option>
                                      <option value="Gondola Cruise">
                                        Gondola Cruise
                                      </option>
                                      <option value="Speedboat tours">
                                        Speedboat tours
                                      </option>
                                    </optgroup>
                                    <option value="Private Tour">
                                      Private Tour
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* First Selection  */}

                          {/* Second Selection  */}
                          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                            <input
                              type="radio"
                              id="activities"
                              name="serviceType"
                              value="activities"
                              {...register("serviceType")}
                            />

                            <div className="flex flex-row items-center ml-6 ">
                              <GiFlyingFox size={45} className="mr-3" />
                              <div className="flex flex-col ml-3">
                                <h3 className="text-xl font-semibold">
                                  Activities
                                </h3>
                                <p className="text-md mb-4 text-gray-600">
                                  Instructed, hands-on experiences
                                </p>
                                <span className="font-semibold">
                                  What activities do you offer?
                                </span>
                                <div className="mt-3">
                                  <select
                                    defaultValue=""
                                    {...register("activityOption")}
                                    name="activityOption"
                                  >
                                    <option value="">Select an option</option>
                                    <optgroup label="Air Activities">
                                      <option value="Paragliding">
                                        Paragliding
                                      </option>
                                      <option value="Skydiving">
                                        Skydiving
                                      </option>
                                      <option value="Ziplining">
                                        Helicopter Ziplining
                                      </option>
                                    </optgroup>
                                    <optgroup label="Land & Outdoor activities">
                                      <option value="Climbing">Climbing</option>
                                      <option value="Hiking">Hiking</option>
                                      <option value="Safaris">Safaris</option>
                                      <option value="Ski & Snow activities">
                                        Ski & Snow activities
                                      </option>
                                    </optgroup>
                                    <optgroup label="Water activities">
                                      <option value="Kayaking">Kayaking</option>
                                      <option value="Parasailing">
                                        Parasailing
                                      </option>
                                      <option value="Surfing">Surfing</option>
                                      <option value="Water Skiing">
                                        Water Skiing
                                      </option>
                                    </optgroup>
                                    <optgroup label="Water Tours">
                                      <option value="Boat Tours">
                                        Boat Tours
                                      </option>
                                      <option value="Fishing Cruises">
                                        Fishing Cruises
                                      </option>
                                      <option value="Gondola Cruise">
                                        Gondola Cruise
                                      </option>
                                      <option value="Speedboat tours">
                                        Speedboat tours
                                      </option>
                                    </optgroup>
                                    <option value="Private Tour">
                                      Private Tour
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          {errors.serviceType && (
                            <span className="text-[red] text-sm ">
                              {errors.serviceType.message}
                            </span>
                          )}
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

          {/*Experience  */}

          <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2   focus:outline-none">
            Continue
          </button>
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
      </div>
    </>
  );
};

export default OnboardingBody;
