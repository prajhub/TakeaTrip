import React from "react";
import { Table, Modal } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetPaymentHistoryQuery } from "../../../Features/api/apiSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";

const Body = () => {
  const navigate = useNavigate();

  const id = useSelector((state) => state.auth.userInfo._id);

  const { data: paymentDetail } = useGetPaymentHistoryQuery(id, {
    pollingInterval: 1000,
  });

  console.log(paymentDetail);

  const dataSource = paymentDetail?.map((detail) => ({
    key: detail._id,
    amount: detail.amount,
    date: detail.date,
    transactionId: detail.transactionId,
    bookingId: detail.bookingId,
  }));

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `$ ${text}`,
    },
  ];

  return (
    <>
      <div class=" h-[400px]  ">
        <div className=" mt-3 text-black">
          <Link to="/adashboard">
            <div className="flex gap-1 cursor-pointer hover:text-primary-700 flex-row items-center">
              <AiOutlineArrowLeft size={20} />
              <p>Back</p>
            </div>
          </Link>
          <div className="mt-7">
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
