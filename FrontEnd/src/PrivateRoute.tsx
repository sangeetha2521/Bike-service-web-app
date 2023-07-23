import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { currentUserLogin, login } from "state/Auth/slice";
import { useAppDispatch, useAppSelector } from "state/store";
import { redirect } from "react-router-dom";

const PrivateRoutes = () => {
  const dispatch = useAppDispatch();

  const isAuthernticated = useAppSelector((state) => state.AuthSlice.isAuthenticated);

  const loading = useAppSelector((state) => state.AuthSlice.loading);

  const _login: any = () => dispatch(currentUserLogin());
  useEffect(() => {
    if (!isAuthernticated) {
      _login();
    }
  }, [isAuthernticated]);
  if (loading) return <CircularProgress />;
  return isAuthernticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
