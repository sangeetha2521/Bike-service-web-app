import { useState } from "react";
import ServiceItem from "./BookingItem";
import Modals from "common/modal";
import { useAppSelector } from "state/store";
import { Typography } from "@mui/material";

export function BookingList({ data, user }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const userDetails = useAppSelector((state) => state.AuthSlice.user);

  const filteredBookings = data?.booking?.filter((booking) => booking.userId === userDetails.userId);

  return (
    <>
      <div style={{ display: "", justifyContent: "center", marginTop: "10px" }}>
        {userDetails.role == "user" ? (
          <>
            {filteredBookings?.length > 0 ? (
              <>
                <ServiceItem booking={filteredBookings} />
              </>
            ) : (
              <Typography>No Bookings available!</Typography>
            )}
          </>
        ) : (
          <>
            <ServiceItem booking={data.booking} />
          </>
        )}
        {open && <Modals open={open} handleClose={handleClose} />}
      </div>
    </>
  );
}
