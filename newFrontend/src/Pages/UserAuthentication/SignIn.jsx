import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLogo from "../../assets/mainlogo.png";
import { userLogin } from "../../Features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../../Components/Reusables/ErrorMessage";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const SignIn = () => {
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

  const { loading, error, token, userInfo } = useSelector(
    (state) => state.auth
  );

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const errClass = errMsg ? "errmsg" : "offscreen"

  useEffect(() => {
    if (token) {
      // console.log(userInfo)
      navigate("/");
    }
  }, [navigate, token]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   dispatch(userLogin({ email, password }));
  // };

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(userLogin({ email, password }));
  };

  if (error) {
    handleError(error);
  }

  return (
    <div className="flex   min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 px-6 py-8 rounded shadow-md items-center">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={MainLogo}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a
              href="#"
              className=" ml-1 font-medium text-primary-600 hover:text-primary-500"
            >
              Create One
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                {...register("email", {
                  required: "This field is required",
                })}
                type="text"
                autoComplete="off"
                required
                class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className=" mt-5">
              <label for="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "This field is required",
                })}
                class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
           

            <div className="text-sm">
              <a
                href="/forgotpassword"
                className="font-medium text-primary-600 hover:text-red-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 ">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-primary-500 group-hover:text-primary-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
          {loading ? <p>Loading...</p> : "Login"}
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
};

export default SignIn;
