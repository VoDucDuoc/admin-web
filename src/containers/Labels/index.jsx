import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getLabels } from "../../actions";
import "./style.css";
function Labels(props) {
  const columns = [
    {
      name: "Id",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    "Name",
    {
      name: "Color",
      options: {
        customBodyRender: (value) => (
          <div className="label__color" style={{ color: value }}>
            {value}
          </div>
        ),
      },
    },
  ];
  const history = useHistory();
  const { labels } = useSelector((state) => state.labels);
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
      history.push(`label/edit/${rowData[0]}`);
    },
    selectableRowsHideCheckboxes: true,
  };
  const data = labels.map((label) => [label._id, label.name, label.color]);
  const renderLabelTable = () =>
    data && (
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Labels"}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  const nagivateToAddPage = () => {
    history.push("/label/add");
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
          <Col md={12}>{renderLabelTable()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Labels;
