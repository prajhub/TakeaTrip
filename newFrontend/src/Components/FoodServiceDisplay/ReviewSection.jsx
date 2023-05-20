import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Rate } from "antd";
import UserReviewCard from "./UserReviewCard";
import { useGetReviewsByBusinessQuery } from "../../Features/api/apiSlice";

const ReviewSection = ({ data }) => {
  console.log(data);
  const id = data?._id;

  const { data: businessReview } = useGetReviewsByBusinessQuery(id, {
    pollingInterval: 1000,
  });

  console.log(businessReview);
  const numOfReviews = businessReview?.length;

  return (
    <>
      <section className="max-w-[1400px] mx-auto">
        <div>
          <h1 className="text-2xl flex flex-row items-center font-semibold">
            <AiFillStar className="mr-2" />
            {numOfReviews} Review
          </h1>
        </div>

        <UserReviewCard id={id} />
      </section>
    </>
  );
};

export default ReviewSection;
