import { createSlice } from "@reduxjs/toolkit";
import { InitialState, RoleType } from "./types";
const initialState: InitialState = {
  apiStatus: "none",
  bookingDetails: [
    {
      id: "",
      name: "New user",
      userId: "sangeetha@kon.co",
      phoneNumber: 0,
      serviceIds: [],
      totalCost: 0,
      location: "",
      deliveryDate: "",
      status: "Pending",
    },
  ],
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setTotalCost: (state, action) => {
      const { id, totalCost } = action.payload;
      const bookingIndex = state.bookingDetails.findIndex((booking) => booking.id === id);
      if (bookingIndex !== -1) {
        state.bookingDetails[bookingIndex].totalCost = totalCost;
      }
    },
    saveBookingDetailsLoading: (state, action) => {},
    saveBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },
    saveBookingDetailsSuccess: (state, action) => {},
    setDeliveryStatusLoading: (state, payload) => {},

    setDeliveryStatus: (state, action) => {
      const { id, data } = action.payload;
      const bookingIndex = state.bookingDetails.findIndex((booking) => booking.id === id);
      if (bookingIndex !== -1) {
        state.bookingDetails[bookingIndex].status = data;
      }
    },
    setStatus: (state, action) => {
      state.apiStatus = action.payload;
    },
  },
});

export const {
  setTotalCost,
  saveBookingDetailsLoading,
  saveBookingDetails,
  saveBookingDetailsSuccess,
  setDeliveryStatusLoading,
  setDeliveryStatus,
  setStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;
