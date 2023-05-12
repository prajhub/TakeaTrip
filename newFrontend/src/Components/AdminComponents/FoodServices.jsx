import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import { Link } from "react-router-dom";
import { useBanUserMutation } from "../../Features/users/usersApiSlice";
import { useGetAllFoodServiceQuery } from "../../Features/api/apiSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
const FoodServices = () => {
  const [banUser, { isLoading }] = useBanUserMutation();

  const { data: foodList } = useGetAllFoodServiceQuery("foodList", {
    pollingInterval: 1000,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(foodList);

  const dataSource = foodList?.map((service) => ({
    key: service._id,
    name: service.name,
    city: service.city,
    country: service.country,
    address: service.address,
  }));

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleBanUser = () => {
    console.log(selectedUser.key);
    try {
      const response = banUser({ userId: selectedUser.key }).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      render: (_, user) => (
        <span>
          <a>Edit</a> |{" "}
          <a
            onClick={() => handleEditClick(user)}
            className=" hover:text-[red]"
          >
            Ban
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
          <Modal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            okText="Ban"
            onOk={handleBanUser}
            okButtonProps={{ className: "bg-primary-500 hover:bg-primary-400" }}
          >
            <h1 className="text-2xl font-semibold">
              Do you want to ban the user?
            </h1>
            <div className="mt-4">
              <p>User ID: {selectedUser?.key}</p>
              <p>Name: {selectedUser?.name}</p>
              <p>Verified: {selectedUser?.verified}</p>
              <p>Email: {selectedUser?.email}</p>
              <p>Role: {selectedUser?.role}</p>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default FoodServices;
