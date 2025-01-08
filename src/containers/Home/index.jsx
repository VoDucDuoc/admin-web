import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { formatThousand } from "../../helpers/util";
import { getTotalOrderPricePerMonthByYear } from "../../actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const chartOptions = {
  plugins: {
    title: {
      display: true,
      text: "Revenue each month of the year",
    },
  },
};

const chartLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const lineOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Revenue in the last 7 days",
    },
  },
};

function Home(props) {
  const dispatch = useDispatch();
  const statistic = useSelector((state) => state.statistic);
  const [year, setYear] = useState(new Date().getFullYear());
  const { isIniting } = useSelector((state) => state.init);

  const hanleNextYear = () => {
    if (year >= new Date().getFullYear()) return;
    setYear((prev) => prev + 1);
    dispatch(getTotalOrderPricePerMonthByYear(year + 1));
  };
  const hanlePrevYear = () => {
    setYear((prev) => prev - 1);
    dispatch(getTotalOrderPricePerMonthByYear(year - 1));
  };

  const pieData = {
    labels: (statistic.top5 && statistic.top5.products) || [],
    datasets: [
      {
        data: (statistic.top5 && statistic.top5.quantitySold) || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 120, 0, 0.2)",
          "rgba(255, 227, 0, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 120, 0, 1)",
          "rgba(255, 227, 0,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: (statistic.total7day && statistic.total7day.days) || [],
    datasets: [
      {
        label: "Revenue each day",
        data: (statistic.total7day && statistic.total7day.revenue) || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Revenue each month",
        data:
          (statistic.totalPerMonth && statistic.totalPerMonth.revenues) || [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  /**
   * Tổng doanh thu, tổng số sản phẩm, tổng số đơn hàng
Biểu đồ 12 cột thể hiện doanh thu từng tháng
Biểu đồ tròn top 5 sản phẩm bán chạy
Biểu đồ tròn xem top 3 category đem lại doanh thu cao nhất
   */
  return (
    <Container>
      <Row className="mt-2">
        <Col sm="4">
          <div className="statistic__number">
            <Row className="d-flex align-items-center h-100">
              <Col sm="3">
                <div
                  className="statistic__number-icon"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <LocalAtmIcon />
                </div>
              </Col>
              <Col sm="9">
                <p className="m-0 text-uppercase font-weight-bold text-secondary statistic__number-title">
                  Total revenue
                </p>
                <p
                  className="m-0 statistic__number-value"
                  style={{ color: "var(--primary)" }}
                >
                  {statistic.revenue && `${formatThousand(statistic.revenue)}`}
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm="4">
          <div className="statistic__number">
            <Row className="d-flex align-items-center h-100">
              <Col sm="3">
                <div
                  className="statistic__number-icon"
                  style={{ backgroundColor: "#00C6AB" }}
                >
                  <ShoppingBasketIcon />
                </div>
              </Col>
              <Col sm="9">
                <p className="m-0 text-uppercase font-weight-bold text-secondary statistic__number-title">
                  Total products
                </p>
                <p
                  className="m-0 statistic__number-value"
                  style={{ color: "#00C6AB" }}
                >
                  {statistic.totalProduct}{" "}
                  <span style={{ fontSize: "0.8rem" }}>PRODUCTS</span>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm="4">
          <div className="statistic__number">
            <Row className="d-flex align-items-center h-100">
              <Col sm="3">
                <div
                  className="statistic__number-icon"
                  style={{ backgroundColor: "#FDC60A" }}
                >
                  <ReceiptIcon />
                </div>
              </Col>
              <Col sm="9">
                <p className="m-0 text-uppercase font-weight-bold text-secondary statistic__number-title">
                  Total order
                </p>
                <p
                  className="m-0 statistic__number-value"
                  style={{ color: "#FDC60A" }}
                >
                  {statistic.totalOrder}{" "}
                  <span style={{ fontSize: "0.8rem" }}>ORDERS</span>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className="mt-2 mb-2">
        <Col className="mt-3" sm="12">
          <div className="statistic__chart">
            <div style={{ height: "360px", width: "70%", margin: "auto" }}>
              <Bar options={chartOptions} data={chartData} />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Button disabled={isIniting} onClick={hanlePrevYear}>
                {isIniting && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}{" "}
                Back
              </Button>
              <p className=" mx-3 my-auto">{year}</p>
              <Button
                disabled={isIniting || year === new Date().getFullYear()}
                onClick={hanleNextYear}
              >
                {isIniting && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}{" "}
                Next
              </Button>
            </div>
          </div>
        </Col>
        <Col sm="12" className="mt-2">
          <Row>
            <Col sm="6" className="mt-3">
              <div className="statistic__chart" style={{ height: "360px" }}>
                <Pie
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: "Top 5 best selling products",
                      },
                    },
                  }}
                />
              </div>
            </Col>
            <Col sm="6" className="mt-3">
              <div className="statistic__chart" style={{ height: "360px" }}>
                <Line options={lineOptions} data={lineData} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

Home.propTypes = {};

export default Home;
