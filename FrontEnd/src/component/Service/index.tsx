import React, { useEffect, useState } from "react";
import { fetchServices } from "../../api/servicesApi";
import { useAppDispatch, useAppSelector } from "state/store";
import ServiceList from "./ServiceList/ServiceList";
import useSWR, { mutate } from "swr";
import { setStatus } from "state/Service/slice";
import CircularProgress from "@mui/material/CircularProgress";

export default function Services() {
  const [datas, setData] = useState([]);
  const user = useAppSelector((state) => state.AuthSlice.user);
  const status = useAppSelector((state) => state.service.apiStatus);
  const { data } = useSWR("/services", fetchServices);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setStatus("loading"));
        const response = await fetchServices();
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
      mutate("/services");
      dispatch(setStatus("none"));
    }
  }, [status]);
  if (status == "loading")
    return (
      <div style={{ display: "flex ", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </div>
    );
  if (!data || !datas) return <p style={{ alignItems: "center" }}>No services available!</p>;
  return (
    <div>
      <ServiceList data={data || datas} user={user} />
    </div>
  );
}
