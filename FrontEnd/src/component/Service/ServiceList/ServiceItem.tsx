import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  SvgIcon,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "state/store";

export default function ServiceItem({
  service,
  selected,
  handleCheckboxChange,
  handleDelete,
  handleDeleteService,
  handleEditService,
}) {
  const descriptions = service.description.split(",");
  const user = useAppSelector((state) => state.AuthSlice.user.role);
  return (
    <ImageListItem
      key={service.img}
      sx={{
        flexBasis: "20%",
        height: "100%",
        display: "flex",
        alignItems: "stretch",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={service.img} alt={service.name} loading="lazy" style={{ height: "200px", objectFit: "cover" }} />
        <ImageListItemBar
          sx={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
          }}
          title={service.name}
          position="top"
          actionIcon={
            <>
              {selected && user != "admin" ? (
                <IconButton sx={{ color: "white" }} aria-label={`star ${service.name}`}>
                  <DeleteIcon onClick={() => handleDelete(service._id)} />
                </IconButton>
              ) : (
                <>
                  {user == "user" && (
                    <Checkbox
                      sx={{ color: "white" }}
                      checked={selected}
                      onChange={() => handleCheckboxChange(service._id, service.name, service.cost)}
                    />
                  )}
                  {user == "admin" && (
                    <>
                      <IconButton sx={{ color: "white" }} aria-label={`edit ${service.name}`}>
                        <EditIcon onClick={() => handleEditService(service)} />
                      </IconButton>
                      <IconButton sx={{ color: "white" }} aria-label={`star ${service.name}`}>
                        <DeleteIcon onClick={() => handleDeleteService(service._id)} />
                      </IconButton>
                    </>
                  )}
                </>
              )}
            </>
          }
          actionPosition="left"
        />
        <CardContent style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            INR: {service.cost}
          </Typography>
          {selected ? (
            <Typography variant="body2" style={{ flex: 1 }}>
              {descriptions.map((description, index) => (
                <div key={index}>
                  {description}
                  <br />
                </div>
              ))}
            </Typography>
          ) : null}
        </CardContent>
      </Card>
    </ImageListItem>
  );
}
