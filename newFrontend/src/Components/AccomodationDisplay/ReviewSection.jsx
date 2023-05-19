import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Rate } from "antd";
import UserReviewCard from "./UserReviewCard";

const ReviewSection = ({ data, review }) => {
  console.log(review);

  const numOfReviews = review?.length;
  const id = data?._id;

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
