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
        <div>
          <h1>Email verified succesfully</h1>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      ) : (
        <div>404 nots found</div>
      )}
    </Fragment>
  );
};

export default EmailVerify;
