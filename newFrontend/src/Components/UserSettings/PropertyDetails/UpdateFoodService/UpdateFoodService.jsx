import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { handleSuccess } from "../../../Reusables/SuccessMessage";
import { setClearSuccess } from "../../../../Features/foodService/foodBasicInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteFoodServiceMutation } from "../../../../Features/api/apiSlice";

import { updateFoodService } from "../../../../Features/foodService/updateFoodServiceAction";

const UpdateFoodService = ({ details, onClose }) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState,
    getValues,
  } = useForm();

  const { errors } = formState;

  const [isTouched, setIsTouched] = useState(false);

  const [formData, setFormData] = useState({
    id: details._id,
    website: details.website || "",
    cuisines: details.cuisines || "",
    number: details.number || "",
    city: details.city || "",
    country: details.country || "",
    minPrice: details.minPrice || "",
    maxPrice: details.maxPrice || "",
    description: details.description || "",
  });

  console.log(formData);

  const [deleteFoodService] = useDeleteFoodServiceMutation();
  const deleteFood = async () => {
    try {
      const result = await deleteFoodService(details._id);
      // Handle the result or perform additional actions
      console.log(result);
      onClose();
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const [selectedCuisines, setSelectedCuisines] = useState(
    details.cuisines || []
  );

  const [selectedFoods, setSelectedFoods] = useState(details.foods || []);

  const [selectedFeatures, setSelectedFeatures] = useState(
    details.features || []
  );

  const cuisines = [
    { id: 1, name: "Italian" },
    { id: 2, name: "Latin" },
    { id: 3, name: "Asian" },
    { id: 4, name: "Mexican" },
    { id: 5, name: "American" },
    { id: 6, name: "French" },
    { id: 7, name: "Mediterranean" },
    { id: 8, name: "Indian" },
  ];

  const foods = [
    { id: 1, name: "Brunch" },
    { id: 2, name: "Breakfast" },
    { id: 3, name: "Dinner" },
    { id: 4, name: "Lunch" },
  ];

  const foodFeatures = [
    { id: 1, name: "Delivery" },
    { id: 2, name: "Takeout" },
    { id: 3, name: "Reservations" },
    { id: 4, name: "Outdoor Seating" },
    { id: 5, name: "Seating" },
    { id: 6, name: "Street Parking" },
    { id: 7, name: "Free off-street parking" },
    { id: 8, name: "Highchairs Available" },
    { id: 9, name: "Wheelchair Accessible" },
    { id: 10, name: "Serves Alcohol" },
    { id: 11, name: "Wine and Beer" },
    { id: 12, name: "Digital Payments" },
    { id: 13, name: "Accepts Credit Cards" },
    { id: 14, name: "Family style" },
    { id: 15, name: "Non-smoking restaurants" },
    { id: 16, name: "Gift Cards Available" },
  ];

  const handleCuisineChange = (event) => {
    const cuisineName = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedCuisines([...selectedCuisines, cuisineName]);
      setValue("id", details._id);
    } else {
      setSelectedCuisines(
        selectedCuisines.filter((name) => name !== cuisineName)
      );
      setValue(
        "cuisines",
        selectedCuisines.filter((name) => name !== cuisineName)
      );

      return;
    }
    setValue("cuisines", [...selectedCuisines, cuisineName]);
  };

  const handleFoodChange = (event) => {
    const foodName = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedFoods([...selectedFoods, foodName]);
    } else {
      setSelectedFoods(selectedFoods.filter((name) => name !== foodName));
      setValue(
        "foods",
        selectedFoods.filter((name) => name !== foodName)
      );

      return;
    }
    setValue("foods", [...selectedFoods, foodName]);
  };

  const handleFeatureChange = (event) => {
    const featureName = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedFeatures([...selectedFeatures, featureName]);
    } else {
      setSelectedFeatures(
        selectedFeatures.filter((name) => name !== featureName)
      );
      setValue(
        "features",
        selectedFeatures.filter((name) => name !== featureName)
      );

      return;
    }
    setValue("features", [...selectedFeatures, featureName]);
  };
  //For photos
  const [uploadedImages, setUploadedImages] = useState(details.photos || []);
  const [imagePreviews, setImagePreviews] = useState(
    (details.photos || []).map((photo) => ({
      url: photo,
      id: Math.random(),
    }))
  );
  useEffect(() => {
    setValue("photos", uploadedImages);
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

  const { successMessage } = useSelector((state) => state.listFoodService);
  const { success } = useSelector((state) => state.listFoodService);

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

  const onSubmit = async (data) => {
    try {
      const {
        number,
        website,
        address,
        minPrice,
        maxPrice,
        description,
        cuisines,
        foods,
        features,
      } = data;

      const updatedFormData = {
        ...formData,
        number: number ? number : details.number,
        website: website ? website : details.website,
        address: address ? address : details.address,
        minPrice: minPrice ? minPrice : details.minPrice,
        maxPrice: maxPrice ? maxPrice : details.maxPrice,
        description: description ? description : details.description,
        cuisines: cuisines ? cuisines : details.cuisines,
        foods: foods ? foods : details.foods,
        features: features ? features : details.features,
      };

      setFormData(updatedFormData);

      dispatch(updateFoodService(updatedFormData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Phone Number
              </label>
              <input
                type="number"
                onBlur={() => setIsTouched(true)}
                {...register("number")}
                id="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
              />
              <input hidden {...register("id")} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Website
              </label>
              <div className="mt-2 flex rounded-md  shadow-sm">
                <div>
                  <span className="inline-flex py-2 items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                    http://
                  </span>
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    onBlur={() => setIsTouched(true)}
                    {...register("website")}
                    id="website"
                    className="block w-full flex-1 px-10 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                onBlur={() => setIsTouched(true)}
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Price Range
              </label>
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col">
                  <input
                    type="number"
                    onBlur={() => setIsTouched(true)}
                    id="minPrice"
                    {...register("minPrice")}
                    className="mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 py-2 px-4  "
                  />
                </div>
                <div className="flex flex-col ">
                  <input
                    type="number"
                    {...register("maxPrice")}
                    id="maxPrice"
                    onBlur={() => setIsTouched(true)}
                    className=" mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 py-2 px-4 "
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Description
              </label>
              <input
                {...register("description")}
                id="description"
                onBlur={() => setIsTouched(true)}
                rows="5"
                type="text"
                className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500  "
                placeholder="Write a description..."
              />
            </div>

            <section>
              <h2 className="py-2 mb-2 text-sm font-medium text-gray-900">
                Select cuisines.
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {cuisines.map((cuisine) => (
                  <label key={cuisine.id} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={cuisine.name}
                      onBlur={() => setIsTouched(true)}
                      {...register("cuisines")}
                      className="form-checkbox h-5 w-5 text-primary-600"
                      onChange={(event) => {
                        handleCuisineChange(event);
                        setIsTouched(true);
                      }}
                      checked={selectedCuisines.includes(cuisine.name)}
                    />
                    <span className="ml-2 text-gray-700">{cuisine.name}</span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h2 className="py-2 mb-2 text-sm font-medium text-gray-900">
                Select served meals.
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {foods.map((food) => (
                  <label key={food.id} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={food.name}
                      onBlur={() => setIsTouched(true)}
                      {...register("foods")}
                      className="form-checkbox h-5 w-5 text-primary-600"
                      onChange={(event) => {
                        handleFoodChange(event);
                        setIsTouched(true);
                      }}
                      checked={selectedFoods.includes(food.name)}
                    />
                    <span className="ml-2 text-gray-700">{food.name}</span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h2 className="py-2 mb-2 text-sm font-medium text-gray-900">
                Select features.
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {foodFeatures.map((feature) => (
                  <label key={feature.id} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={feature.name}
                      onBlur={() => setIsTouched(true)}
                      {...register("features")}
                      className="form-checkbox h-5 w-5 text-primary-600"
                      onChange={(event) => {
                        handleFeatureChange(event);
                        setIsTouched(true);
                      }}
                      checked={selectedFeatures.includes(feature.name)}
                    />
                    <span className="ml-2 text-gray-700">{feature.name}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="sm:col-span-2">
              <span className="text-lg font-semibold mt-4 mb-4">
                Update Photos
              </span>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <input
                    type="file"
                    name="file-upload"
                    className="mb-5"
                    onBlur={() => setIsTouched(true)}
                    multiple
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
            </section>
          </div>
          <button
            disabled={!isTouched}
            className={`text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mr-2 mb-2 ${
              !isTouched
                ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          >
            Edit Service
          </button>
          <button
            type="button"
            onClick={deleteFood}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Delete
          </button>
        </form>
        <DevTool control={control} />
      </section>
    </>
  );
};

export default UpdateFoodService;
