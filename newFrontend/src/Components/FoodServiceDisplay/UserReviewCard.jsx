import React from "react";
import { Rate, Avatar } from "antd";

import { useGetReviewsByBusinessQuery } from "../../Features/api/apiSlice";

const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

const UserReviewCard = ({ id }) => {
  const { data: businessReview } = useGetReviewsByBusinessQuery(id, {
    pollingInterval: 1000,
  });

  console.log(businessReview);
  return (
    <>
      <section className="max-w-[1400px] mx-auto mt-4 ">
        <div className="flex flex-col w-[600px] gap-3">
          {businessReview?.map((review) => (
            <div className=" p-5">
              <div className="flex gap-3 ">
                <Avatar size={40} src={<img src={url} alt="avatar" />} />
                <div className="flex flex-col ">
                  <h2 className="font-semibold text-black">
                    {review.reviewerName}
                  </h2>
                  <p className="text-xs text-gray-500">January 2021</p>
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
