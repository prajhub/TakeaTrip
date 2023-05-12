import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useBanUserMutation } from "../../Features/users/usersApiSlice";
import { useGetAllUsersQuery } from "../../Features/users/usersApiSlice";

const UserCRUD = () => {
  const [banUser, { isLoading }] = useBanUserMutation();

  const { data: userList } = useGetAllUsersQuery("userList", {
    pollingInterval: 1000,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(userList);

  const dataSource = userList?.map((user) => ({
    key: user._id,
    name: `${user.firstName} ${user.lastName}`,
    verified: user.isVerified ? "Yes" : "No",
    email: user.email,
    role: user.roles,
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
      <div className="">
        <div className="m-3">
          <div className="flex gap-1 cursor-pointer hover:text-primary-700 flex-row items-center">
            <AiOutlineArrowLeft size={20} />
            <p>Back</p>
          </div>
        </div>
        <div className="p-5  text-black">
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

export default UserCRUD;
