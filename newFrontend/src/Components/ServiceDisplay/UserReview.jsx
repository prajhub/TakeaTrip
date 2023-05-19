import React from "react";
import {
  useGetReviewsByBusinessQuery,
  useGetUserDetailsQuery,
} from "../../Features/api/apiSlice";
import { Rate, Avatar } from "antd";
import { AiFillStar } from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";
const UserReview = ({ data }) => {
  const { data: businessReview } = useGetReviewsByBusinessQuery(data, {
    pollingInterval: 1000,
  });

  const numOfReviews = businessReview?.length;

  const reviewerIds = businessReview?.map((review) => review.reviewerid);
  const reviewerId = reviewerIds?.[0];
  console.log(reviewerId);

  const { data: userDetail } = useGetUserDetailsQuery(reviewerId, {
    pollingInterval: 1000,
  });

  console.log(userDetail);

  return (
    <>
      <section className="max-w-[1400px] mx-auto mt-4 ">
        <div className="flex flex-col w-[600px] gap-3">
          <div>
            <h1 className="text-2xl flex flex-row items-center font-semibold">
              <AiFillStar className="mr-2" /> {numOfReviews} Review
            </h1>
          </div>
          {businessReview?.map((review) => (
            <div className=" p-5">
              <div className="flex gap-3 ">
                {userDetail?.photo[0] ? (
                  <Avatar
                    size={{
                      xs: 24,
                      sm: 32,
                      md: 40,
                      lg: 64,
                      xl: 80,
                      xxl: 100,
                    }}
                    src={<img alt="photo" src={userDetail?.photo[0]} />}
                  />
                ) : (
                  <Avatar size={30} icon={<UserOutlined />} />
                )}
                <div className="flex flex-col ">
                  <h2 className="font-semibold text-black">
                    {review.reviewerName}
                  </h2>
                  {/* <p className="text-xs text-gray-500">January 2021</p> */}
                </div>
              </div>
              <p className="mt-4 ml-10">{review.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UserReview;
