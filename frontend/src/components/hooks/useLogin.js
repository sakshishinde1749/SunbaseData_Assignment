import React from "react";
import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [login, setLogin] = useState({
    login_id: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp",
          JSON.stringify(login),
        )
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
        }).catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return { login, handleChange, handleSubmit, error };
};

export default useLogin;
