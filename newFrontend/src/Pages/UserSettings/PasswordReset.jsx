import React from "react";
import Header from "../../Components/Reusables/header";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useDispatch } from "react-redux";
import { useForgotpasswordMutation } from "../../Features/api/apiSlice";

const PasswordReset = () => {
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

  const [forgotPassword, { isLoading }] = useForgotpasswordMutation();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(forgotPassword(data));
  };
  return (
    <>
      <Header />

      <section className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container border border-gray-300 rounded-md mx-auto max-w-5xl flex items-center flex-col p-4">
            <h1 className="font-sans text-4xl font-semibold">
              Enter your email
            </h1>

            <div className="flex flex-col  w-[550px] gap-2 mt-5">
              <span className="font-semibold">Email</span>
              <input
                type="text"
                {...register("email", {
                  required: "Enter your email",
                })}
                placeholder="Enter your email address"
              />
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

export default PasswordReset;
