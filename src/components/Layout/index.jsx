import React from "react";
import Header from "../Header";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LabelIcon from "@mui/icons-material/Label";
import "./style.css";
function Layout(props) {
  const auth = useSelector((state) => state.auth);
  const wasLoggedIn = () => (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <ul>
            {auth && auth.user.role === "admin" && (
              <li>
                <NavLink exact to="/">
                  <DashboardIcon /> Home
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/categories">
                <CategoryIcon />
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/products">
                <LocalGroceryStoreIcon /> Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders">
                <ReceiptIcon />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/labels">
                <LabelIcon />
                Labels
              </NavLink>
            </li>
          </ul>
        </Col>
        <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
  return (
    <>
      <Header />
      {auth.authenticate ? wasLoggedIn() : props.children}
    </>
  );
}

export default Layout;
