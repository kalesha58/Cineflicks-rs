import React from "react";
import { useDispatch } from "react-redux";
import { sendAdminAuthRequest } from "../../api_helpers/api_help";
import { adminActions } from "../../store";
import AuthForm from "../Auth/AuthForm";

const Admin = () => {
  const dispatch=useDispatch();
  const onReloadResponse = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
  };

  const getData = (data) => {
    sendAdminAuthRequest(data.inputs)
      .then(onReloadResponse)
     
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
