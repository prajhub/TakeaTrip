import React from "react";
import { Rate, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  useGetReviewsByBusinessQuery,
  useGetUserDetailsQuery,
} from "../../Features/api/apiSlice";

const UserReviewCard = ({ id }) => {
  const { data: businessReview } = useGetReviewsByBusinessQuery(id, {
    pollingInterval: 1000,
  });

  const reviewerIds = businessReview?.map((review) => review.reviewerid);
  const reviewerId = reviewerIds?.[0];

  const { data: userDetail } = useGetUserDetailsQuery(reviewerId, {
    pollingInterval: 1000,
  });

  return (
    <>
      <section className="max-w-[1400px] mx-auto mt-4 ">
        <div className="flex flex-col w-[600px] gap-3">
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
              <p className="mt-4">{review.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UserReviewCard;
