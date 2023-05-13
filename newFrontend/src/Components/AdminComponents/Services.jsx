import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGetAllServicesQuery } from "../../Features/api/apiSlice";
import { Link } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const { data: serviceList } = useGetAllServicesQuery("serviceList", {
    pollingInterval: 1000,
  });

  console.log(serviceList);

  const dataSource = serviceList?.map((service) => ({
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
            className="hover:text-primary-700"
            onClick={() => handleNavigateProperty(service)}
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
        <div className="m-3">
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

export default Services;
