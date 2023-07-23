import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "state/store";
import { toast } from "react-toastify";
import { setEditServiceLoading } from "state/Service/slice";

export default function EditServiceModal({ open, handleClose, service, handleUpdateService }) {
  const [serviceName, setServiceName] = useState(service.name);
  const [serviceCost, setServiceCost] = useState(service.cost);
  const status = useAppSelector((state) => state.service.apiStatus);
  const handleNameChange = (event) => {
    setServiceName(event.target.value);
  };

  const handleCostChange = (event) => {
    setServiceCost(event.target.value);
  };
  const dispatch = useAppDispatch();
  const handleUpdate = () => {
    const updatedService = {
      ...service,
      name: serviceName,
      cost: serviceCost,
    };
    dispatch(setEditServiceLoading(updatedService));
    handleUpdateService(updatedService);
  };
  useEffect(() => {
    if (setEditServiceLoading && status == "success") {
      toast.success("Service edited Successfully", {
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
      toast.error("Failed to edit a service", {
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: "medium" }}>Edit Service</DialogTitle>
      <DialogContent>
        <TextField
          label="Service Name"
          sx={{ marginTop: 2 }}
          fullWidth
          value={serviceName}
          onChange={handleNameChange}
          placeholder="Enter service name"
        />
        <TextField
          label="Service Cost"
          sx={{ marginTop: 2 }}
          fullWidth
          value={serviceCost}
          onChange={handleCostChange}
          placeholder="Enter service cost"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
