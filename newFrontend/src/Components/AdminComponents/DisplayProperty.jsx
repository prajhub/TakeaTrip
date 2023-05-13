import React from "react";
import { useParams } from "react-router";
import {
  useGetPropertyByIdQuery,
  useGetReviewsByBusinessQuery,
} from "../../Features/api/apiSlice";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../Features/Review/deleteReviewAction";
import { Skeleton } from "antd";

const DisplayProperty = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: PropertyData } = useGetPropertyByIdQuery(id, {
    pollingInterval: 2000,
  });
  console.log(PropertyData);

  const { data: Reviews } = useGetReviewsByBusinessQuery(PropertyData?._id, {
    pollingInterval: 1000,
  });

  console.log(Reviews);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const date =
    Reviews && Reviews.length > 0 ? formatDate(Reviews[0]?.date) : "";

  const onDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
  };

  return (
    <>
      <div className="bg-gray-100 h-screen p-6 rounded-lg shadow-md">
        <div className="border p-5 bg-white border-gray-200 rounded-xl">
          {" "}
          <h2 className="text-2xl font-bold mb-4">{PropertyData?.name}</h2>
          <p className="text-gray-700 mb-2 font-semibold">
            Type: {PropertyData?.type}
          </p>
          <p className="text-gray-700 mb-2 font-semibold">
            Address: {PropertyData?.address}
          </p>
          <p className="text-gray-700 mb-2 font-semibold">
            City: {PropertyData?.city}
          </p>
          <p className="text-gray-700 mb-2 font-semibold">
            Country: {PropertyData?.country}
          </p>
          <p className="text-gray-700 mb-2 font-semibold">
            Contact: {PropertyData?.contact}
          </p>
          <p className="text-gray-700 mb-2 font-semibold">
            Website: {PropertyData?.website}
          </p>
        </div>

        <div className="border bg-white border-gray-200 mt-4  rounded-xl p-5">
          <span className="text-lg font-semibold">Reviews</span>
          {Reviews && Reviews.length > 0 ? (
            <div>
              {Reviews?.map((review) => (
                <div className=" bg-white rounded-lg shadow-md p-6 mb-4">
                  <div className="flex gap-2 flex-col">
                    <span className="text-lg font-medium">
                      {review.description}
                    </span>
                    <p className="text-sm text-gray-400">
                      by {review.reviewerName}
                    </p>
                    <p className="text-xs">on {date}</p>
                  </div>
                  <button
                    onClick={() => onDeleteReview(review._id)}
                    className="py-2.5 px-5 mr-2 mt-4 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <Skeleton />
          )}
        </div>

        <h3 className="text-xl font-bold mb-2">Photos:</h3>
        <div className="flex flex-wrap">
          {PropertyData?.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Photo ${index + 1}`}
              className="w-48 h-36 object-cover mr-4 mb-4"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayProperty;
