import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { capitalizeFirstLetter, formatThousand } from "../../helpers/util";
import moment from "moment";

function Orders(props) {
  const columns = [
    {
      name: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YYYY"),
      },
    },
    {
      name: "id",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    "Type",
    "Client",
    "Phone",
    {
      name: "Total",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => `${formatThousand(value)}`,
      },
    },
    "Process",
  ];
  const history = useHistory();
  const { orders } = useSelector((state) => state.orders);
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableHeadCell: {
          contentWrapper: {
            justifyContent: "center",
          },
          toolButton: {
            marginLeft: "0",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            textAlign: "center",
          },
        },
      },
    });

  const options = {
    filter: true,
    filterType: "multiselect",
    download: false,
    print: false,
    onRowClick: (rowData, rowMeta) => {
      history.push(`orders/${rowData[1]}`);
    },
    selectableRowsHideCheckboxes: true,
  };
  const data = orders.map((order) => {
    const orderReversed = [...order.process].reverse();
    return [
      moment(order.createdAt).toDate().getTime(),
      order._id,
      order.paymentOption.toUpperCase(),
      order.address.name,
      order.address.phone,
      Number(order.totalAmount),
      capitalizeFirstLetter(
        orderReversed.find((x) => x.isCompleted === true).type
      ),
    ];
  });
  const renderProductsTable = () =>
    data && (
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Order"}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  return (
    <div>
      <Container>
        <Row className="mt-4">
          <Col md={12}>{renderProductsTable()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Orders;
