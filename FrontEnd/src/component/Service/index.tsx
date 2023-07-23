import React, { useEffect, useState } from "react";
import { fetchServices } from "../../api/servicesApi";
import { useAppDispatch, useAppSelector } from "state/store";
import ServiceList from "./ServiceList/ServiceList";
import useSWR, { mutate } from "swr";
import { setStatus } from "state/Service/slice";
import CircularProgress from "@mui/material/CircularProgress";

export default function Services() {
  const [datas, setData] = useState([]);

  // Get the user data from the Redux store using 'useAppSelector' hook
  const user = useAppSelector((state) => state.AuthSlice.user);

  // Get the API status from the Redux store using 'useAppSelector' hook
  const status = useAppSelector((state) => state.service.apiStatus);

  // Fetch data from the server using 'useSWR' hook
  const { data } = useSWR("/services", fetchServices);

  const dispatch = useAppDispatch();

  // Fetch data from the server on component mount and update the state and Redux store
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setStatus("loading"));

        // Fetch services using the 'fetchServices' function
        const response = await fetchServices();
        setData(response);

        // Set the API status to "none" to indicate no ongoing API request
        dispatch(setStatus("none"));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  // Whenever changes are made successfully, mutate the component to get the latest data
  useEffect(() => {
    if (status === "success") {
      // Mutate the data using 'mutate' function to trigger a re-fetch
      mutate("/services");

      dispatch(setStatus("none"));
    }
  }, [status]);

  // Show a loading indicator while data is being fetched
  if (status == "loading")
    return (
      <div style={{ display: "flex ", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </div>
    );

  // If no data is available, display a message
  if (!data || !datas) return <p style={{ alignItems: "center" }}>No services available!</p>;

  // Render the ServiceList component with the fetched data and user information
  return (
    <div>
      <ServiceList data={data || datas} user={user} />
    </div>
  );
}
