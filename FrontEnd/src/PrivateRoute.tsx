import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { currentUserLogin } from "state/Auth/slice";
import { useAppDispatch, useAppSelector } from "state/store";

const PrivateRoutes = () => {
  const dispatch = useAppDispatch();

  // Get authentication status and loading state from Redux store
  const isAuthernticated = useAppSelector((state) => state.AuthSlice.isAuthenticated);
  const loading = useAppSelector((state) => state.AuthSlice.loading);

  // Dispatch action to check current user login status on mount

  const _login: any = () => dispatch(currentUserLogin());
  useEffect(() => {
    if (!isAuthernticated) {
      _login();
    }
  }, [isAuthernticated]);

  // Show loading indicator while checking authentication status

  if (loading) return <CircularProgress />;

  // Render the outlet (nested routes) if authenticated, otherwise redirect to login

  return isAuthernticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
