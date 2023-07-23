import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "./types";

const initialState: AdminState = {
  status: {},
  activeItem: "",
  service: [],
  selectedService: [],
  apiStatus: "none",
};

const ServicesSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setActiveItem: (state, data) => (state.activeItem = data.payload),
    createServiceLoading: (state, data) => {},
    createServiceSuccess: (state, data) => {
      state.service = data.payload;
      state.apiStatus = "success";
    },
    setEditService: (state, data) => {
      state.service = data.payload;
      state.apiStatus = "success";
    },
    setEditServiceLoading: (state, data) => {},
    setSelectedServicesDelete: (state, action) => {
      state.service = action.payload;
      state.apiStatus = "success";
    },
    setSelectedServicesDeleteLoading: (state, action) => {},
    setStatus: (state, action) => {
      state.apiStatus = action.payload;
    },
    setSelectedServices: (state, action) => {
      state.selectedService = action.payload;
    },
  },
});

export const {
  setActiveItem,
  createServiceLoading,
  createServiceSuccess,
  setSelectedServicesDelete,
  setSelectedServicesDeleteLoading,
  setEditServiceLoading,
  setEditService,
  setSelectedServices,
  setStatus,
} = ServicesSlice.actions;

export default ServicesSlice.reducer;
