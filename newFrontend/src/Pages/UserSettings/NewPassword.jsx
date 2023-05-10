import React, { useEffect } from "react";
import Header from "../../Components/Reusables/header";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useUpdatePasswordMutation } from "../../Features/api/apiSlice";

const NewPassword = () => {
  const form = useForm();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState,
    getValues,
  } = form;
  const { errors } = formState;

  const dispatch = useDispatch();
  const { id, token } = useParams();
  const [updatePassword, { isSuccess }] = useUpdatePasswordMutation();

  const userValid = async () => {
    const res = await fetch(
      `http://localhost:5000/users/passwordreset/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.status == 201) {
      console.log("user valid");
    } else {
      //navigate to error page
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const onSubmit = async (data) => {
    dispatch(updatePassword({ id, token, data }));
  };

  return (
    <>
      <Header />

      <section className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container border border-gray-300 rounded-md mx-auto max-w-5xl flex items-center flex-col p-4">
            <h1 className="font-sans text-4xl font-semibold">
              Enter your new password
            </h1>

            <div className="flex flex-col  w-[550px] gap-2 mt-5">
              <span className="font-semibold">Password</span>
              <input
                type="text"
                {...register("password", {
                  required: "Enter password",
                })}
                placeholder="Enter your new password"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <button className="text-white mt-5 w-[550px] bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
              Send
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </section>
    </>
  );
};

export default NewPassword;
