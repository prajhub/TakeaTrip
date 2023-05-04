import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { RiRestaurantLine } from "react-icons/ri";
import { MdCarRental } from "react-icons/md";
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";

import { BiBed } from "react-icons/bi";
import { MdOutlineLocalActivity } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { useCreateFoodServiceMutation } from "../../Features/foodService/addFoodServiceSlice";

const ListFoodServiceBody = () => {
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

  const [selectedListing, setSelectedListing] = useState("");

  const listClick = (name) => {
    setSelectedListing(name);
    setValue("type", name);
  };

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
  const [createFoodService, { isError, isSuccess, isLoading }] =
    useCreateFoodServiceMutation();

  const onSubmit = async (data) => {
    try {
      const { data: returnedData } = await createFoodService(data);
      if (!returnedData) {
        console.log("error ayo");
      }
      console.log(returnedData);
    } catch (error) {
      console.error(error);
    }
  };

  //basic info

  const [tele, setTele] = useState("");
  const [website, setWebsite] = useState("");
  const [desc, setDesc] = useState("");
  const [placeName, setPlaceName] = useState("");

  console.log(desc);

  const handlePlaceName = (event) => {
    setPlaceName(event.target.value);
  };

  const handleWebsite = (event) => {
    setWebsite(event.target.value);
  };

  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  //Locaiton INfo
  const dispatch = useDispatch();

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

  return (
    <>
      <section className="max-w-[1400px]   mx-auto py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className=" md:py-5">
            <div className=" h-[100px]  flex flex-col">
              <h2 className="font-open-san-normal text-2xl font-semibold">
                What type of restaurant is it?
              </h2>
              <div className="flex flex-row pt-4 ">
                <button
                  type="button"
                  onClick={() => listClick("Cafe")}
                  className="text-black bg-white border border-gray-400 hover:border-black  focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 "
                >
                  <BiBed className="w-5 h-5 mr-2 -ml-1 " />
                  Café
                </button>
                <button
                  type="button"
                  onClick={() => listClick("Restaurant")}
                  className="text-black bg-white border border-gray-400  hover:border-black  focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 "
                >
                  <MdOutlineLocalActivity className="w-5 h-5 mr-2 -ml-1 " />
                  Restaurant
                </button>
                <button
                  type="button"
                  onClick={() => listClick("Diner")}
                  className="text-black bg-white border border-gray-400  hover:border-black   focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 "
                >
                  <RiRestaurantLine className="w-5 h-5 mr-2 -ml-1 " />
                  Diner
                </button>
                <button
                  type="button"
                  onClick={() => listClick("Pub")}
                  className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 "
                >
                  <MdCarRental className="w-5 h-5 mr-2 -ml-1 " />
                  Pub
                </button>
                <button
                  type="button"
                  onClick={() => listClick("Food Truck")}
                  className="text-black bg-white border border-gray-400  hover:border-black focus:border-black font-medium rounded-lg text-sm px-20 py-2.5 text-center flex items-center mr-2 "
                >
                  <MdCarRental className="w-5 h-5 mr-2 -ml-1 " />
                  Food Truck
                </button>
                <input hidden {...register("type")} />
              </div>

              <div className="py-7"></div>
            </div>
          </section>
          {/*  Basic Info*/}
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
                          name="placeName"
                          id="placeName"
                          {...register("name")}
                          autoComplete="family-name"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
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
                            {...register("website")}
                            name="company-website"
                            id="company-website"
                            className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            placeholder="www.example.com"
                          />
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="telephone"
                          className="block text-sm font-medium leading-6 mb-2 text-gray-900"
                        >
                          Telephone
                        </label>
                        <input
                          type="number"
                          placeholder="Enter phone number"
                          {...register("number")}
                        />
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
                          {...register("description")}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:py-1.5 sm:text-sm sm:leading-6"
                          placeholder="Write something about your place..."
                        />
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
          {/* Basic Info*/}
          {/* Photo Section*/}
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
          {/* Photo Section*/}

          {/* Loc Info*/}
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
                          Where does your experience take place?
                        </label>
                        <select
                          {...register("country")}
                          className="block appearance-none w-full bg-white border mt-3 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option>Select a country</option>
                          {countries.map((country) => (
                            <option
                              key={country.name.common}
                              value={country.name.common}
                            >
                              {country.name.common}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="officialname"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City or town
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          {...register("city")}
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="streetAddress"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          {...register("address")}
                          id="streetAddress"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
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
                          {...register("zipcode")}
                          id="zipcode"
                          autoComplete="family-name"
                          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
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

          {/* Loc Info */}

          <button class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2   focus:outline-none">
            Continue
          </button>
        </form>
        <DevTool control={control} />
      </section>
    </>
  );
};

export default ListFoodServiceBody;
