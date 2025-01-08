import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { IoCheckmarkCircleSharp, IoCloseCircleOutline } from "react-icons/io5";
import moment from "moment";
import "./style.css";
function Category(props) {
  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    "Name",
    {
      name: "Created At",
      options: {
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YYYY"),
      },
    },
    {
      name: "Updated At",
      options: {
        customBodyRender: (value) =>
          moment(new Date(value)).format("DD/MM/YYYY"),
      },
    },
    {
      name: "Available",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value === "Yes" ? (
            <IoCheckmarkCircleSharp className="available-icon available-icon--check" />
          ) : (
            <IoCloseCircleOutline className="available-icon available-icon--close" />
          ),
      },
    },
  ];
  const history = useHistory();
  const { categories } = useSelector((state) => state.categories);
  const auth = useSelector((state) => state.auth);
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
      history.push(`category/edit/${rowData[0]}`);
    },
    selectableRowsHideCheckboxes: true,
  };
  const data = categories.map((category) => [
    category._id,
    category.name,
    moment(category.createdAt).toDate().getTime(),
    moment(category.updatedAt).toDate().getTime(),
    category.isAvailable ? "Yes" : "No",
  ]);
  const renderProductsTable = () =>
    data && (
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Categories"}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  const nagivateToAddPage = () => {
    history.push("/category/add");
  };
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              {auth && auth.user.role === "admin" && (
                <Button variant="primary" onClick={nagivateToAddPage}>
                  Add
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>{renderProductsTable()}</Col>
        </Row>
      </Container>
      {/* {renderAddModal()}
      {renderDetailModal()} */}
    </div>
  );
}

export default Category;
