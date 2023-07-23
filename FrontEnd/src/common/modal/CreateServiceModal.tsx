import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createServiceLoading } from "state/Service/slice";
import { useAppSelector } from "state/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CreateServiceModal: React.FC<any> = ({ open, handleClose }) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    p: 4,
  };
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    dispatch(createServiceLoading({ data: data }));
  };

  const formFields = [
    { label: "Service name", name: "name", type: "text" },
    { label: "Description", name: "description", type: "text" },
    { label: "Cost", name: "cost", type: "number" },
    { label: "Service type", name: "service_type", type: "text" },
    { label: "Image link", name: "img", type: "text" },
  ];
  const status = useAppSelector((state) => state.service.apiStatus);

  useEffect(() => {
    if (status == "success") {
      toast.success("Service created Successfully", {
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
      toast.error("Failed to create a service", {
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Create Service
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map((field) => (
            <div key={field.name} style={{ marginBottom: 16 }}>
              <TextField
                label={field.label}
                variant="outlined"
                fullWidth
                required
                {...register(field.name)}
                error={!!errors[field.name]}
              />
            </div>
          ))}
          <Button variant="contained" color="primary" fullWidth type="submit">
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateServiceModal;
