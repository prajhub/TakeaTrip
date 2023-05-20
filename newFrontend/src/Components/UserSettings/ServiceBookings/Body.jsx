import React from "react";
import { Table, Modal } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetPaymentHistoryQuery } from "../../../Features/api/apiSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
import { useGetServiceBookingHistoryQuery } from "../../../Features/api/apiSlice";

const Body = () => {
  const { id } = useParams();

  const { data: serviceBookingDetails } = useGetServiceBookingHistoryQuery(id, {
    pollingInterval: 1000,
  });

  console.log(serviceBookingDetails);

  const dataSource = serviceBookingDetails?.map((detail) => ({
    key: detail._id,
    date: detail.date,
    packageid: detail.packageid,
    packagename: detail.packagename,
    totalamount: detail.totalamount,
    userid: detail.userid,
  }));

  const columns = [
    {
      title: "Package Name",
      dataIndex: "packagename",
      key: "packagename",
    },
    {
      title: "Package ID",
      dataIndex: "packageid",
      key: "packagename",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total",
      dataIndex: "totalamount",

      key: "totalamount",
      render: (text) => `$${text}`,
    },

    {
      title: "Booked By",
      dataIndex: "userid",
      key: "userid",
    },
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
          <div className="mt-7 ">
            {serviceBookingDetails ? (
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
