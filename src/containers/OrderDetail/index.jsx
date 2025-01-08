import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetail, updateOrder, getInitialData } from "../../actions";
import Card from "../../components/UI/Card";
import { formatDate, formatThousand } from "../../helpers/util";
import { generatePictureUrl } from "../../urlConfig";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import "./style.css";

function OrderDetail(props) {
  const { id } = useParams();

  const { order } = useSelector((state) => state.orders);
  const [steps, setSteps] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getOrderDetail(id));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (order.process && order.process.length > 0) {
      setSteps(order.process);
    }
  }, [id, order.process]);
  const getTotal = () => {
    if (!order.items) return 0;
    return order.items.reduce((totalPrice, currentItem) => {
      totalPrice += currentItem.quantity * currentItem.paidPrice;
      return totalPrice;
    }, 0);
  };
  const activeStep =
    steps &&
    steps.length -
      1 -
      [...steps].reverse().findIndex((step) => step.isCompleted === true);
  const handleNext = () => {
    const cloneSteps = [...steps];
    cloneSteps[activeStep + 1].isCompleted = true;
    cloneSteps[activeStep + 1].date = new Date().toISOString();
    setSteps([...cloneSteps]);
    dispatch(updateOrder({ _id: id, process: cloneSteps }));
  };
  const handleBack = () => {
    const cloneSteps = [...steps];
    cloneSteps[activeStep].isCompleted = false;
    delete cloneSteps[activeStep].date;
    setSteps([...cloneSteps]);
    dispatch(updateOrder({ _id: id, process: cloneSteps }));
  };

  return (
    <>
      {order && (
        <>
          {steps && (
            <Box
              sx={{
                width: "100%",
                marginBottom: "1.2rem",
                marginTop: "0.4rem",
              }}
            >
              <Stepper activeStep={activeStep + 1} alternativeLabel>
                {steps.map((step, index) => {
                  return (
                    <Step key={step._id}>
                      <StepLabel>
                        {step.type && <span>{step.type.toUpperCase()}</span>}
                        <p>
                          {step.date
                            ? new Date(step.date).toLocaleString()
                            : "N/A"}
                        </p>
                      </StepLabel>
                    </Step>
                  );
                })}
                <Button
                  disabled={
                    activeStep === 0 ||
                    activeStep + 1 === steps.length ||
                    (activeStep === 1 &&
                      order.paymentOption &&
                      order.paymentOption.toLowerCase() === "zalo")
                  }
                  onClick={handleBack}
                  className="process-back"
                >
                  Back
                </Button>
                <Button
                  disabled={
                    activeStep + 1 === steps.length ||
                    (activeStep === 0 &&
                      order.paymentOption &&
                      order.paymentOption.toLowerCase() === "zalo")
                  }
                  onClick={handleNext}
                  className="process-next"
                >
                  {activeStep + 1 === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Stepper>
            </Box>
          )}
          {order.paymentOption && (
            <p style={{ color: "#888" }}>
              Payment: {order.paymentOption.toUpperCase()}
            </p>
          )}
          {order.address && (
            <div className="order-detail-card p-1 pl-3">
              <p className="my-2">
                <span className="mr-3">
                  <strong className="mr-8">Receiver: </strong>
                  {order.address.name}
                </span>
                <span className="mr-3">
                  <strong className="mr-1">Phone: </strong>
                  {order.address.phone}
                </span>
              </p>
              <p className="my-2">
                <span className="mr-3">
                  <strong className="mr-1">Address: </strong>
                  {order.address.address}
                </span>
                <span className="mr-3">
                  <strong className="mr-1">Ward: </strong>
                  {order.address.ward}
                </span>
                <span className="mr-3">
                  <strong className="mr-1">District: </strong>
                  {order.address.district}
                </span>
                <span className="mr-3">
                  <strong className="mr-1">City: </strong>
                  {order.address.city}
                </span>
              </p>
            </div>
          )}
          <div className="order-detail-card">
            <table className="order-detail__product-table">
              <thead>
                <th className="order-detail__product-table-heading"></th>
                <th className="order-detail__product-table-heading">Product</th>
                <th className="order-detail__product-table-heading">
                  Quantity
                </th>
                <th className="order-detail__product-table-heading">
                  Unit price
                </th>
                <th className="order-detail__product-table-heading">
                  Total Price
                </th>
              </thead>
              <tbody>
                {order &&
                  order.items &&
                  order.items.map((item) => (
                    <tr key={item._id}>
                      <td className="order-detail__product-table-image-wrapper">
                        <img
                          className="order-detail__product-table-image"
                          src={generatePictureUrl(
                            item.productId.productPictures[0]
                          )}
                          alt=""
                        />
                      </td>
                      <td>{item.productId.name}</td>
                      <td>{item.quantity}</td>
                      <td className="text-right">
                        {formatThousand(item.paidPrice)}
                      </td>
                      <td className="text-right">
                        {formatThousand(item.quantity * item.paidPrice)}
                      </td>
                    </tr>
                  ))}
                {/* <tr className="text-right">
                  <td colSpan="4">Subtotal</td>
                  <td>{formatThousand(getTotal())}</td>
                </tr>
                <tr className="text-right">
                  <td colSpan="4">Shipping</td>
                  <td>0</td>
                </tr> */}
                <tr className="text-right">
                  <td colSpan="4">Total</td>
                  <td>{formatThousand(getTotal())}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
export default OrderDetail;
