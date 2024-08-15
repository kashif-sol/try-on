import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  DataTable,
  FormLayout,
  Icon,
  List,
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
          price: item.price,
          title: item.title,
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
      <Card>
        <div style={{ display: "flex", gap: "30px",alignItems:"center"}}>
          <div>
            <Text variant="headingMd" as="h6">
              Welcome to MIRRARME - Your Virtual Try-On Solution!
            </Text>
            <Text>
              MIRRARME’s cutting-edge virtual try-on technology allows your
              customers to see how clothes will look on them before making a
              purchase. By simply uploading a photo, our AI seamlessly
              integrates the selected clothing onto their image, providing a
              realistic and personalized shopping experience.
            </Text>
            <br />
            <Text variant="headingMd" as="h6">
              Getting Started:
            </Text>
            <div style={{ marginLeft: "1rem" }}>
              <Text variant="headingSm" as="h6">
              How to add Try On Button?
              </Text>
              <List type="bullet">
                <List.Item>
                Please review video for instructions on how to add the Try On with AI button/block to your product page. Once added, this will apply to all product pages that use Try On with AI.
                </List.Item>
              </List>
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <Text variant="headingSm" as="h6">
                Add New Clothing for Try-On:
              </Text>
              <List type="bullet">
                <List.Item>
                  Simply select the tick box next to the product you want to
                  enable for virtual try-on. Click “Save” to update your store.
                </List.Item>
              </List>
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <Text variant="headingSm" as="h6">
                Remove Clothing from Try-On:
              </Text>
              <List type="bullet">
                <List.Item>
                  Select the tick box next to the product you want to remove
                  from the virtual try-on feature. Click “Remove” to update your
                  store.
                </List.Item>
              </List>
            </div>
          </div>
          {/* video */}
          <div style={{ width: "1050px" }}>
            <video width="100%" controls loop>
              <source src=" /loom-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Card>
      <br />

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
              columnContentTypes={[
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
                "text",
              ]}
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
                          price: row.price,
                          title: row.title,
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
                  Price
                </Text>,
                <Text variant="headingMd" as="h6">
                  Views
                </Text>,
                <Text variant="headingMd" as="h6">
                  Status
                </Text>,
                <Text variant="headingMd" as="h6">
                  Action
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
                <Text>{item.price}</Text>,
                <Badge>{item.views} </Badge>,
                <Text>
                  {item.status === "Published" ? (
                    <Badge tone="success">{item.status}</Badge>
                  ) : (
                    <Badge tone="warning">{item.status}</Badge>
                  )}
                </Text>,
                <div>
                  {item.status === "Published" && (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => {
                          values.handleRemoveProduct(item.id);
                        }}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </div>,
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
            {values.barActive && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ButtonGroup>
                  <Button
                    variant="primary"
                    onClick={() => {
                      values.setSelectedRows([]);
                      values.setBarActive(false);
                      values.setDiscard(true);
                    }}
                  >
                    Discard
                  </Button>
                  <Button
                    onClick={() => {
                      values.handleSaveButtonClick();
                    }}
                  >
                    Save
                  </Button>
                </ButtonGroup>
              </div>
            )}
          </>
        ) : (
          <div>Products will be visible here</div>
        )}
      </Card>
    </>
  );
};

export default Home;
