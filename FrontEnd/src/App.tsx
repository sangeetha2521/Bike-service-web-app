import "./App.css";
import { Routes, Route, HashRouter, Navigate, BrowserRouter } from "react-router-dom";
import React from "react";
import Services from "./component/Service";
import { Provider } from "react-redux";
import store from "state/store";
import Header from "common/header";
import Bookings from "component/Bookings";
import SignUp from "component/SignUp";
import HomePage from "component";
import SignIn from "component/SignIn";
import PrivateRoutes from "PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const APP: React.FC = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/services"
              index
              element={
                <>
                  <Services />
                </>
              }
            />

            <Route
              path="/bookings"
              index
              element={
                <>
                  <Bookings />
                </>
              }
            />
          </Route>

          <Route path="/signup" index element={<SignUp />} />
          <Route path="/admin/signup" index element={<SignUp />} />
          <Route path="/login" index element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default APP;
