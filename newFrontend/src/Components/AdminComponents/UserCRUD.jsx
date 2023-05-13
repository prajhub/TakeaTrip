import React, { useState, useEffect } from "react";
import { Table, Modal, Skeleton } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import {
  useBanUserMutation,
  useGetAllUsersQuery,
} from "../../Features/users/usersApiSlice";

import { useGetAccommodationByUserIDQuery } from "../../Features/api/apiSlice";

import { Badge } from "antd";

const UserCRUD = () => {
  const navigate = useNavigate();
  const [banUser, { isLoading }] = useBanUserMutation();

  const { data: userList } = useGetAllUsersQuery("userList", {
    pollingInterval: 1000,
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: accoList } = useGetAccommodationByUserIDQuery(
    selectedUser?.key,
    {
      pollingInterval: 1000,
    }
  );

  const accommodationsArray = accoList?.accommodations || [];
  const foodServicesArray = accoList?.foodservices || [];
  const servicesArray = accoList?.services || [];

  const allProperties = [
    ...accommodationsArray,
    ...foodServicesArray,
    ...servicesArray,
  ];

  console.log(allProperties);

  const dataSource2 = allProperties.map((item) => ({
    key: item._id,
    name: item.name,
    country: item.country,
    city: item.city,
    address: item.address,
  }));

  const [modalVisible2, setModalVisible2] = useState(false);

  const dataSource = userList?.map((user) => ({
    key: user._id,
    name: `${user.firstName} ${user.lastName}`,
    verified: user.isVerified ? "Yes" : "No",
    email: user.email,
    role: user.roles,
    photo: user.photo && user.photo.length > 0 ? user.photo[0] : null,
  }));

  const handleBanClick = (user) => {
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

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setModalVisible2(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (text, record) => <span>{record.verified ? "Yes" : "No"}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => (
        <span>
          <a
            onClick={() => handleViewClick(user)}
            className="hover:text-primary-700"
          >
            View
          </a>{" "}
          |{" "}
          <a onClick={() => handleBanClick(user)} className=" hover:text-[red]">
            Ban
          </a>
        </span>
      ),
    },
  ];

  const columns2 = [
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <span>
          <a
            onClick={() => handleNavigateProperty(item)}
            className="hover:text-primary-700"
          >
            View
          </a>{" "}
        </span>
      ),
    },
  ];

  const handleNavigateProperty = (item) => {
    navigate(`/adashboard/user/properties/${item.key}`);
  };

  return (
    <>
      <div className="">
        <div className="m-3">
          <Link to="/adashboard">
            <div className="flex gap-1 cursor-pointer hover:text-primary-700 flex-row items-center">
              <AiOutlineArrowLeft size={20} />
              <p>Back</p>
            </div>
          </Link>
        </div>
        <div className="p-5  text-black">
          <Table dataSource={dataSource} columns={columns} />
          <Modal
            width={1000}
            visible={modalVisible2}
            onCancel={() => setModalVisible2(false)}
            okText="Nothing"
            okButtonProps={{ className: "bg-primary-500 hover:bg-primary-400" }}
          >
            <h1 className="text-2xl font-semibold">User Details</h1>
            <div className="mt-4">
              <div>
                <div class="items-center md:max-w-[500px] h-[200px] bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                  <a>
                    <img
                      class="w-[200px] h-[200px] rounded-lg sm:rounded-none sm:rounded-l-lg"
                      src={selectedUser?.photo}
                      alt="Avatar"
                    />
                  </a>
                  <div class="p-5 flex flex-col gap-1">
                    <h3 class="text-xl font-bold tracking-tight text-gray-900 ">
                      <a href="">{selectedUser?.name}</a>
                    </h3>
                    <span class="text-gray-500 dark:text-gray-400">
                      {selectedUser?.role}
                    </span>
                    <span class="text-gray-500 dark:text-gray-400">
                      {selectedUser?.email}
                    </span>

                    <span className="md:mt-20">
                      <Badge
                        color={selectedUser?.role === "Yes" ? "green" : "red"}
                      />
                      <span className="text-xs text-gray-400 ml-2">
                        {selectedUser?.role === "Yes"
                          ? "Verified"
                          : "Not Verified"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="mt-6">
                <span className="text-md font-semibold">
                  All of user's properties
                </span>
              </div>
              <div className="md:mt-2 cursor-pointer">
                {accoList && dataSource2.length > 0 ? (
                  <Table dataSource={dataSource2} columns={columns2} />
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </Modal>

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

export default UserCRUD;
