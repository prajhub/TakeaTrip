import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useGetAllAccommodationsQuery } from "../../Features/api/apiSlice";

const Accommodations = () => {
  const navigate = useNavigate();

  const { data: accoList } = useGetAllAccommodationsQuery("accoList", {
    pollingInterval: 21000,
  });

  console.log(accoList);

  const dataSource = accoList?.map((acco) => ({
    key: acco._id,
    name: acco.name,
    address: acco.address,
    city: acco.city,
    country: acco.country,
  }));

  const handleNavigateProperty = (acco) => {
    navigate(`/adashboard/user/properties/${acco.key}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
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
      title: "Action",
      key: "action",
      render: (_, acco) => (
        <span>
          <a
            onClick={() => handleNavigateProperty(acco)}
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
      <div>
        <div className=" m-3">
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

export default Accommodations;
