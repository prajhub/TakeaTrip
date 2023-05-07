import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { updateReview } from "../../Features/Review/updateReviewAction";
import { deleteReview } from "../../Features/Review/deleteReviewAction";
import PropertyDisplayTable from "./PropertyDisplayTable";
import { Rate } from "antd";
import { useGetReviewsByIdQuery } from "../../Features/api/apiSlice";
import { useUpdateUserMutation } from "../../Features/api/apiSlice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BsFillTelephoneFill, BsGlobe } from "react-icons/bs";
import { useGetUserDetailsQuery } from "../../Features/api/apiSlice";

const MainBody = () => {
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();
  const form1 = useForm();
  const form2 = useForm();

  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    control: control1,
    setValue: setValue1,
  } = form1;

  const {
    register: registerForm2,
    setValue: setValue2,
    handleSubmit: handleSubmitForm2,
    control: control2,
    formState: formState2,
  } = form2;

  const { errors } = formState2;
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 2000, //1 secs
  });
  console.log(data);

  const passId = data?._id;
  console.log(passId);

  const { data: reviewsData } = useGetReviewsByIdQuery(passId, {
    pollingInterval: 1000,
  });

  console.log(reviewsData);

  //Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //For email

  //For User image change / add
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
    setValue1("photo", uploadedImagesArray);
    setValue1("id", passId);
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
    setValue1("photo", newUploadedImages);
  };

  const onSubmit1 = (data) => {
    const { firstName, lastName, email, password, photo } = data;
    console.log(firstName, lastName, email, password);
    updateUser({ id: passId, email, password, firstName, lastName, photo });
    onClose();
  };

  const onSubmit2 = (data) => {
    dispatch(updateReview(data));

    onClose();
  };

  //Editing Review
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openModal2 = (review) => {
    setSelectedReview(review);
    setIsOpenModal2(true);
  };

  const closeModal2 = () => {
    setIsOpenModal2(false);
  };

  const handleRateChange = (value) => {
    const selectedRateString = value.toString();
    const selectedRateNumber = parseFloat(
      selectedRateString.match(/-?\d+(?:\.\d+)?/)[0]
    );
    console.log(selectedRateNumber);
    setValue2("rating", selectedRateNumber);
    setValue2("reviewId", selectedReview?._id);
  };

  const onDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
  };

  return (
    <>
      <div class="pl-0 md:pl-64 ">
        <div className="p-6 mt-4 border-b shadow-sm">
          <h1 className="font-open-san text-3xl font-semibold">My profile</h1>
        </div>

        <section className="bg-gray-200 w-full h-full flex flex-col">
          {data && (
            <div className="w-full max-w-4xl py-5 h-[300px] bg-white border m-7  border-gray-200 rounded-lg shadow ">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="col-span-3">
                  <div className="flex items-center space-x-6 ml-7">
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }}
                      src={<img alt="avatar" src={data?.photo[0]} />}
                    />

                    <div className="flex flex-col ">
                      <h1 className="text-2xl font-bold">
                        {data.firstName} {data.lastName}
                      </h1>

                      <p className="text-gray-500 mt-4 text-sm flex items-center">
                        <MdEmail className="mr-1" />
                        {data.email}
                      </p>
                      <p className="text-gray-500 mt-4 text-sm flex items-center">
                        <BsFillTelephoneFill className="mr-1" />: 123-456-7890
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <ul className="">
                    <li className="flex items-center">
                      <BsGlobe className="mr-1" /> English (US)
                    </li>
                    <li className="ml-5">English (US)</li>
                  </ul>
                </div>
              </div>
              <Button
                type="button"
                colorScheme="lime"
                onClick={onOpen}
                className="text-white mt-20 ml-10 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Edit Profile
              </Button>

              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit your profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <section>
                      <form onSubmit={handleSubmitForm1(onSubmit1)}>
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              {...registerForm1("firstName")}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                              placeholder={data.firstName}
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              {...registerForm1("lastName")}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                              placeholder={data.lastName}
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                              Email
                            </label>
                            <input
                              type="text"
                              {...registerForm1("email")}
                              id="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                              placeholder={data.email}
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              {...registerForm1("password")}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            />
                          </div>
                          <div className="col-span-full">
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                              <div className="text-center">
                                <input
                                  type="file"
                                  name="file-upload"
                                  className="mb-5"
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
                                    <button
                                      onClick={() => handleDelete(image.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))}
                                <input hidden {...registerForm1("photo")} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            Update
                          </button>
                        </div>
                      </form>
                      <DevTool control={control1} />
                    </section>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          )}

          <div className="w-full max-w-4xl py-5 h-[300px] bg-white border m-7  border-gray-200 rounded-lg shadow ">
            <div className="flex flex-col">
              <div>
                <h2 className="font-open-san text-xl font-semibold p-4">
                  My properties
                </h2>
              </div>

              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Property
                    </th>

                    <th scope="col" class="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <PropertyDisplayTable id={passId} />
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full max-w-4xl py-5 h-[300px] bg-white border m-7  border-gray-200 rounded-lg shadow ">
            <div className="flex flex-col">
              <div>
                <h2 className="font-open-san text-xl font-semibold p-4">
                  My reviewss
                </h2>
              </div>
              {reviewsData?.map((review) => (
                <div className="">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <Rate
                      className="text-3xl"
                      disabled
                      allowHalf
                      value={review?.rating}
                    />
                    <p className="text-gray-700 text-md mt-2 mb-4">
                      {review.description}
                    </p>
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() => onDeleteReview(review._id)}
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                      >
                        Del
                      </button>
                      <button
                        onClick={() => openModal2(review)}
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Modal isOpen={isOpenModal2} size="3xl" onClose={closeModal2}>
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <section className="p-5">
                      <form onSubmit={handleSubmitForm2(onSubmit2)}>
                        <div className="flex flex-col gap-6">
                          <span className="text-4xl font-semibold">
                            Changed your mind?
                          </span>

                          <div>
                            <Rate
                              onChange={handleRateChange}
                              className="text-4xl"
                            />
                            <input hidden {...registerForm2("rating")} />
                          </div>

                          <div className="flex flex-col">
                            <p>Write down your review</p>
                            <textarea
                              {...registerForm2("description", {
                                required: "Please write something...",
                              })}
                              className="mt-4 text-gray-600"
                            />
                            <input
                              hidden
                              {...registerForm2("reviewId", {
                                required: "Please write a new review",
                              })}
                            />
                            {errors.reviewId && (
                              <span className="text-red-500 mt-2">
                                {errors.reviewId.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <button className="py-2.5 px-5 mr-2 mb-2 mt-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                          Submit
                        </button>
                      </form>
                      <DevTool control={control2} />
                    </section>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainBody;
