import React from "react";
import { Table, Modal } from "antd";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetPaymentHistoryQuery } from "../../../Features/api/apiSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetBookingHistoryQuery,
  useGetUserByIdQuery,
} from "../../../Features/api/apiSlice";

const Body = () => {
  const { id } = useParams();

  const { data: bookingDetail } = useGetBookingHistoryQuery(id, {
    pollingInterval: 1000,
  });

  console.log(bookingDetail);

  const userIds = bookingDetail?.map((detail) => detail.userid) || [];

  const { data: userDetails } = useGetUserByIdQuery(userIds, {
    pollingInterval: 1000,
  });

  console.log(userDetails);

  const dataSource = bookingDetail?.map((detail) => ({
    key: detail._id,
    fromDate: detail.fromdate,
    toDate: detail.todate,
    room: detail.room,
    roomId: detail.roomid,
    roomNumber: detail.roomnumber,
    totalAmount: detail.totalamount,
    userId: detail.userid,
  }));

  const columns = [
    {
      title: "From",
      dataIndex: "fromDate",
      key: "fromDate",
    },
    {
      title: "To",
      dataIndex: "toDate",
      key: "toDate",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Room ID",
      dataIndex: "roomId",
      key: "roomId",
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => `$${text}`,
    },
    {
      title: "Booked By",
      dataIndex: "userId",
      key: "userId",
    },

    // {
    //   title: "Booked By",
    //   key: "userName",
    //   render: ({ userId }) => {
    //     const userDetail = userDetails.find((user) => user.id === userId);

    //     if (userDetail) {
    //       return userDetail.firstName; // Assuming the name property exists in the user object
    //     }

    //     return null;
    //   },
    // },
  ];

  return (
    <>
      <div class=" h-[400px]  ">
        <div className=" mt-3 text-black">
          <Link to="/account/properties">
            <div className="flex gap-1 cursor-pointer hover:text-primary-700 flex-row items-center">
              <AiOutlineArrowLeft size={20} />
              <p>Back</p>
            </div>
          </Link>
          <div className="mt-7">
            {bookingDetail ? (
              <Table dataSource={dataSource} columns={columns} />
            ) : (
              <Skeleton active />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
