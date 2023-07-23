import * as React from "react";
import {
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "state/store";
import { setDeliveryStatusLoading } from "state/Booking/slice";

export default function BikeServiceBookingItem({ booking }) {
  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Ready for delivery", label: "Ready for delivery" },
    { value: "Delivery completed", label: "Delivery completed" },
  ];
  const user = useAppSelector((state) => state.AuthSlice.user);
  const dispatch = useAppDispatch();
  const handleOnChange = (data, id) => {
    const value = { data: data, id: id, userId: user.userId };
    dispatch(setDeliveryStatusLoading(value));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Recent Bookings
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Delivery date</TableCell>
            {user?.role === "user" && <TableCell>Status</TableCell>}
            <TableCell>Service Details</TableCell>
            {user?.role === "admin" && <TableCell>Change Status</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {booking?.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.date}</TableCell>
              {user?.role === "user" && <TableCell>{row.status}</TableCell>}
              <TableCell>
                {row.serviceIds.map((serviceId) => {
                  return (
                    <React.Fragment key={serviceId._id}>
                      <div key={serviceId._id} style={{ marginBottom: "10px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "16px" }}>{serviceId.name}</div>
                        <div style={{ color: "#666", fontSize: "14px" }}>INR - {serviceId.cost}</div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </TableCell>

              {/* Show the status select box for the admin role */}
              {user?.role === "admin" && (
                <TableCell>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id={`status-label-${row._id}`}>Status</InputLabel>
                    <Select
                      labelId={`status-label-${row._id}`}
                      id={`status-select-${row._id}`}
                      defaultValue={row.status}
                      onChange={(e) => handleOnChange(e.target.value, row._id)}
                      label="Status"
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
