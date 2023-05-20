import React, { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
  const param = useParams();

  const [validUrl, setValidUrl] = useState(true);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:5000/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(true);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Email verified successfully!
            </h2>
            <a href="/login">
              <button className="bg-primary-500 text-white px-4 py-2 items-center rounded hover:bg-primary-600">
                Login
              </button>
            </a>
          </div>
        </div>
      ) : (
        <div>404 nots found</div>
      )}
    </Fragment>
  );
};

export default EmailVerify;
