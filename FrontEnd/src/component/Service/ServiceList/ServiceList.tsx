import React, { useEffect, useState } from "react";
import ServiceItem from "./ServiceItem";
import { Button } from "@mui/material";
import Modals from "common/modal";
import { useAppDispatch, useAppSelector } from "state/store";
import { setTotalCost } from "state/Booking/slice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { setSelectedServices, setSelectedServicesDeleteLoading } from "state/Service/slice";
import { toast } from "react-toastify";
import EditServiceModal from "common/modal/EditServiceModel";

export default function ServiceList({ data, user }) {
  const [open, setOpen] = useState(false);
  const status = useAppSelector((state) => state.service.apiStatus);
  const selectedServices: any = useAppSelector((state) => state.service.selectedService) || [];
  const dispatch = useAppDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);

  const handleEditService = (service) => {
    setEditService(service);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleDelete = (serviceId) => {
    const updatedSelectedServiceRedux = selectedServices.filter((service) => service.id !== serviceId);
    dispatch(setSelectedServices(updatedSelectedServiceRedux));
  };

  const handleDeleteService = async (serviceId) => {
    dispatch(setSelectedServicesDeleteLoading(serviceId));
  };
  const handleCheckboxChange = (id, serviceName, serviceCost) => {
    const isServiceSelected = selectedServices.some((service) => service.id === id);

    if (!isServiceSelected) {
      // If the service is not selected, add it to the selectedServices array
      const updatedSelectedServices = [
        ...selectedServices,
        {
          name: serviceName,
          id: id,
          cost: serviceCost,
        },
      ];
      dispatch(setSelectedServices(updatedSelectedServices));
    } else {
      // If the service is already selected, remove it from the selectedServices array
      const updatedSelectedServices = selectedServices.filter((service) => service.id !== id);
      dispatch(setSelectedServices(updatedSelectedServices));
    }
  };

  const calculateTotalCost = () => {
    let totalCost = 0;
    selectedServices.forEach((selectedService) => {
      const { id } = selectedService;
      const selectedServiceObj = data?.service?.find((service) => service._id === id);

      if (selectedServiceObj) {
        totalCost += selectedServiceObj.cost;
      }
    });
    dispatch(setTotalCost(totalCost));
    return totalCost;
  };

  const handleBookNow = () => {
    setOpen(true);
    calculateTotalCost();
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (setSelectedServicesDeleteLoading && status == "success") {
      toast.success("Service deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (status == "error") {
      toast.error("Failed to delete service", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [status]);
  return (
    <>
      <div style={{ position: "relative" }}>
        {editModalOpen && (
          <>
            {data?.service?.map((service) => (
              <EditServiceModal
                open={editModalOpen}
                handleClose={handleCloseEditModal}
                service={editService}
                handleUpdateService={handleEditService}
              />
            ))}
          </>
        )}
        {selectedServices.length > 0 && (
          <Button
            size="small"
            style={{ position: "absolute", color: "white", top: 0, right: 0, margin: "10px", background: "#ff6b6b" }}
            onClick={handleBookNow}
          >
            <ShoppingCartCheckoutIcon />
            {calculateTotalCost()}
          </Button>
        )}
        {open && <Modals open={open} handleClose={handleClose} selectedService={selectedServices} />}

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data?.service?.map((services) => (
            <div key={services._id} style={{ margin: "4px", marginTop: "20px" }}>
              <ServiceItem
                service={services}
                selected={selectedServices.some((selected) => selected.id === services._id)}
                handleCheckboxChange={handleCheckboxChange}
                handleDelete={handleDelete}
                handleDeleteService={handleDeleteService}
                handleEditService={handleEditService}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
