import {
  Badge,
  Button,
  Card,
  Checkbox,
  DataTable,
  Icon,
  Text,
  TextField,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import React from "react";

const Home = ({ values }) => {
  const handleCheckboxChange = (isChecked, rowIndex) => {
    const item = values.products[rowIndex];
    const updatedSelectedRows = [...values.selectedRows];

    if (isChecked) {
      if (!updatedSelectedRows.find((row) => row.product_id === item.id)) {
        updatedSelectedRows.push({
          product_id: item.id,
          image: item.image,
        });
      }
    } else {
      const indexToRemove = updatedSelectedRows.findIndex(
        (row) => row.product_id === item.id
      );
      if (indexToRemove !== -1) {
        updatedSelectedRows.splice(indexToRemove, 1);
      }
    }

    values.setSelectedRows(updatedSelectedRows);
    values.setBarActive(true);
  };

  const handleNextPage = () => {
    values.fetchLinks(values.searchQuery, values.pagination.endCursor, "next");
  };

  const handlePreviousPage = () => {
    values.fetchLinks(
      values.searchQuery,
      values.pagination.startCursor,
      "prev"
    );
  };

  return (
    <>
      <Card sectioned>
        <div style={{ width: "60%", marginLeft: "20%" }}>
          <TextField
            placeholder="Search"
            suffix={<Icon source={SearchIcon} />}
            autoComplete="off"
            value={values.searchQuery}
            onChange={(e) => values.handleSearchQuery(e)}
          />
        </div>
        <br />
        <br />
        {values.products && values.products.length >= 1 ? (
          <>
            <DataTable
              columnContentTypes={["text", "text", "text", "text", "text"]}
              headings={[
                <Checkbox
                  checked={
                    values.selectedRows.length === values.products.length
                  }
                  onChange={() => {
                    const isAllSelected =
                      values.selectedRows.length === values.products.length;
                    const updatedSelectedRows = isAllSelected
                      ? []
                      : values.products.map((row) => ({
                          product_id: row.id,
                          image: row.image,
                        }));
                    values.setSelectedRows(updatedSelectedRows);
                    values.setBarActive(!isAllSelected);
                  }}
                />,
                <Text variant="headingMd" as="h6">
                  Image
                </Text>,
                <Text variant="headingMd" as="h6">
                  Title
                </Text>,
                <Text variant="headingMd" as="h6">
                  Views
                </Text>,
                <Text variant="headingMd" as="h6">
                  Status
                </Text>,
              ]}
              rows={values.products.map((item, index) => [
                <Checkbox
                  key={item.id}
                  checked={values.selectedRows.some(
                    (row) => row.product_id === item.id
                  )}
                  onChange={(isChecked) =>
                    handleCheckboxChange(isChecked, index)
                  }
                />,
                <div style={{ height: "40px", width: "40px" }}>
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "5px",
                    }}
                    src={item.image}
                    alt="Product"
                  />
                </div>,
                <Text>{item.title}</Text>,
                <Badge>{item.views} </Badge>,
                <Text>
                  {item.status === "Published" ? (
                    <Badge tone="success">{item.status}</Badge>
                  ) : (
                    <Badge tone="warning">{item.status}</Badge>
                  )}
                </Text>,
              ])}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="primary"
                disabled={
                  values.pagination &&
                  values.pagination.hasPreviousPage === false
                }
                onClick={handlePreviousPage}
              >
                Previous
              </Button>
              <div
                style={{
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              ></div>
              <Button
                variant="primary"
                disabled={
                  values.pagination && values.pagination.hasNextPage === false
                }
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div>Products will be visible here</div>
        )}
      </Card>
    </>
  );
};

export default Home;
