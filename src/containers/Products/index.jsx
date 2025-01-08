import MUIDataTable from "mui-datatables";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { IoCheckmarkCircleSharp, IoCloseCircleOutline } from "react-icons/io5";
import "./style.css";
function Products(props) {
  const history = useHistory();
  const { products } = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);
  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    "#",
    "Name",
    "Category",
    "Regular Price",
    "Price",
    "Sale",
    "Quantity",
    "Quantity sold",
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
  const options = {
    filter: true,
    filterType: "multiselect",
    download: false,
    print: false,
    onRowClick: (rowData, rowMeta) => {
      history.push(`product/${rowData[0]}`);
    },
    selectableRowsHideCheckboxes: true,
    rowsPerPage: 100,
  };
  const data = products.map((product, index) => [
    product._id,
    index + 1,
    product.name,
    product.category,
    Number(product.regularPrice),
    Number(product.salePrice),
    Number(product.sale),
    Number(product.quantity),
    Number(product.quantitySold),
    product.isAvailable ? "Yes" : "No",
  ]);
  const renderProductsTable = () =>
    data && (
      <MUIDataTable
        title={"Products"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              {auth && auth.user.role === "admin" && (
                <Button
                  variant="primary"
                  onClick={() => {
                    history.push("/product/add");
                  }}
                >
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

export default Products;
