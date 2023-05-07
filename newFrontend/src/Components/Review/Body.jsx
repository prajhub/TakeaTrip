import React, { useEffect } from "react";
import { Rate } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postReview } from "../../Features/Review/postReviewAction";
import { useGetUserDetailsQuery } from "../../Features/api/apiSlice";
import { DevTool } from "@hookform/devtools";
import { useParams } from "react-router";

const Body = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log(id);

  const businessId = id;

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

  const { data: userData } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 15000,
  });
  console.log(userData);

  const reviewerid = userData?._id;

  const handleRateChange = (value) => {
    const selectedRateString = value.toString();
    const selectedRateNumber = parseFloat(
      selectedRateString.match(/-?\d+(?:\.\d+)?/)[0]
    );
    console.log(selectedRateNumber);
    setValue("rating", selectedRateNumber);
    setValue("reviewerid", reviewerid);
  };

  useEffect(() => {
    if (userData) {
      const name = userData.firstName + " " + userData.lastName;
      setValue("reviewerName", name);

      setValue("businessId", businessId);
    }
  }, [userData]);

  const onSubmit = (formData) => {
    dispatch(postReview(formData));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="max-w-[1400px] mx-auto">
          <div className="p-5 border-b  md:w-[600px]">
            <h1 className="text-4xl font-semibold">Did you enjoy your stay?</h1>
          </div>

          <div className="flex flex-col p-4  md:w-[700px]">
            <div className="flex flex-col p-2 mt-2 gap-2">
              <span className="text-xl font-semibold">Rate the place</span>
              <Rate
                allowHalf
                className=" text-4xl"
                onChange={handleRateChange}
              />
              <input hidden {...register("rating")} />
              <input hidden {...register("reviewerid")} />
              <input hidden {...register("businessId")} />
            </div>
            <div className="flex flex-col p-2 mt-2 gap-2">
              <span className="text-xl font-semibold">Write your review</span>
              <textarea
                placeholder="Write here..."
                {...register("description", {
                  required: "Please write a description",
                })}
              ></textarea>
              <input hidden {...register("reviewerName")} />
            </div>
          </div>
        </section>
        <div className="max-w-[1400px] mx-auto p-4">
          <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">
            Submit Review
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Body;
