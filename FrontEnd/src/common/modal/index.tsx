import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, TextField, Grid, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveBookingDetailsLoading } from "state/Booking/slice";
import { useAppSelector } from "state/store";
import { toast } from "react-toastify";

const Modals: React.FC<any> = ({ open, handleClose, selectedService }) => {
  const dispatch = useDispatch();
  const status = useAppSelector((state) => state.booking.apiStatus);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userId = useAppSelector((state) => state.AuthSlice.user.userId);
  const onSubmit = (data) => {
    data.userId = userId;
    const serviceIds = selectedService.map((value) => value.id);
    data.serviceIds = serviceIds;
    data.status = "Pending";
    dispatch(saveBookingDetailsLoading({ data: data }));
  };

  useEffect(() => {
    if (status == "success") {
      toast.success("Booking created Successfully", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          handleClose();
        },
      });
    }
    if (status == "failed") {
      toast.error("Create booking failed", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          handleClose();
        },
      });
    }
  }, [status]);

  const serviceDetails: any = useAppSelector((state) => state.booking.bookingDetails);
  const formFields = [
    { label: "Phone number", name: "phoneNumber", value: 0, disabled: false, type: "number" },
    { label: "Location", name: "location", value: serviceDetails.location, disabled: false, type: "text" },
    { label: "Book service date", name: "date", value: serviceDetails.deliveryDate, type: "datetime-local" },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          maxWidth: "95%",
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          p: 4,
          maxHeight: "95%",
          overflow: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" gutterBottom>
            Booking Form
          </Typography>
          <Grid container spacing={2}>
            {formFields.map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  fullWidth
                  required={true}
                  label={field.value ? "" : field.type === "datetime-local" ? "" : field.label}
                  defaultValue={field.value}
                  {...register(field.name)}
                  disabled={field.disabled}
                  type={field.type}
                />
              </Grid>
            ))}
          </Grid>

          <Button variant="contained" type="submit" color="primary" sx={{ mt: 3 }}>
            Book now
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Modals;
