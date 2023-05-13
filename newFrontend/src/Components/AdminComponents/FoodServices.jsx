import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetAllFoodServiceQuery } from "../../Features/api/apiSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
const FoodServices = () => {
  const navigate = useNavigate();

  const { data: foodList } = useGetAllFoodServiceQuery("foodList", {
    pollingInterval: 1000,
  });

  console.log(foodList);

  const dataSource = foodList?.map((service) => ({
    key: service._id,
    name: service.name,
    city: service.city,
    country: service.country,
    address: service.address,
  }));

  const handleNavigateProperty = (service) => {
    navigate(`/adashboard/user/properties/${service.key}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, service) => (
        <span>
          <a
            onClick={() => handleNavigateProperty(service)}
            className="hover:text-primary-700"
          >
            View
          </a>
        </span>
      ),
    },
  ];

  return (
    <>
      <div class=" h-[200px] ">
        <div className=" mt-3 text-black">
          <Link to="/adashboard">
            <div className="flex gap-1 cursor-pointer hover:text-primary-700 flex-row items-center">
              <AiOutlineArrowLeft size={20} />
              <p>Back</p>
            </div>
          </Link>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default FoodServices;
