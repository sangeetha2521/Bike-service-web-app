import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/store";
import { BookingList } from "./BookingList/BookingList";
import { fetchBookings } from "api/bookingApi";
import useSWR, { mutate } from "swr";
import { setStatus } from "state/Booking/slice";
import { CircularProgress } from "@mui/material";

export default function Bookings() {
  const [datas, setData] = useState([]);
  const user = useAppSelector((state) => state.AuthSlice.user);
  const status = useAppSelector((state) => state.booking.apiStatus);
  const { data } = useSWR("/booking", fetchBookings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setStatus("loading"));
        const response = await fetchBookings();
        setData(response);
        dispatch(setStatus("none"));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  //Whenever the changes made successfully , mutated the component for getting latest data
  useEffect(() => {
    if (status === "success") {
      mutate("/booking");
      dispatch(setStatus("none"));
    }
  }, [status]);
  if (status == "loading")
    return (
      <div style={{ display: "flex ", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </div>
    );
  if (!data || !datas) return <p style={{ alignItems: "center" }}>No bookings available!</p>;
  return (
    <div>
      <BookingList data={data || datas} user={user} />
    </div>
  );
}
