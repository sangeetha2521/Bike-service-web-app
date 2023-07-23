import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "state/store";
import { menu } from "./types";
import { Button } from "@mui/material";
import CreateServiceModal from "./modal/CreateServiceModal";
import { logout } from "state/Auth/slice";

export default function Header() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = useAppSelector((state) => state.AuthSlice.activeItem);

  const handleItemClick = (item) => {
    console.log(item);
  };
  const user: any = useAppSelector((state) => state.AuthSlice.user);
  const isAuthenticated = useAppSelector((state) => state.AuthSlice.isAuthenticated);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const handleLogout = async () => {
    dispatch(logout());
  };
  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Bike Service
            <i className="fa fa-code"></i>
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {menu.map((item, index) => (
              <li className="nav-item" key={item.key}>
                <Link
                  to={`/${item.key}`}
                  style={{ fontWeight: 500 }}
                  className="nav-links"
                  onClick={() => handleItemClick(item.key)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user.role == "admin" && isAuthenticated && (
              <Button
                sx={{ fontSize: "small" }}
                size="small"
                style={{
                  alignItems: "flex-end",
                  color: "black",
                  marginTop: "10px",
                  height: "27px",
                  background: "white",
                }}
                onClick={() => setIsOpen(true)}
              >
                + service
              </Button>
            )}

            {isOpen && <CreateServiceModal open={isOpen} handleClose={handleClose} />}
            {isAuthenticated && (
              <Button size="small" style={{ color: "white" }} onClick={handleLogout}>
                Logout
              </Button>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
}
