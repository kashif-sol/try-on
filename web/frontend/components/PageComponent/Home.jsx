import {
  Badge,
  Button,
  Card,
  Checkbox,
  ContextualSaveBar,
  DataTable,
  Frame,
  Icon,
  Loading,
  Text,
  TextField,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";

const Home = ({ values }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalProductRows, setModalProductRows] = useState([
    {
      id: 0,
      Checkbox: 0,
      image:
        "https://www.stoneharbor.com.pk/cdn/shop/products/stone-harbor-boy-s-tee-shirt-boy-s-blue-new-icon-tee-shirt-31233645084725_2000x.jpg?v=1647259298",
      title: "Stone Harbor Boy's Blue Tee Shirt",
      counter: "23",
      status: "Published",
    },
    {
      id: 1,
      Checkbox: 0,
      image:
        "https://www.stoneharbor.com.pk/cdn/shop/products/stone-harbor-boys-shorts-blue-3-4-y-boy-s-super-blue-summer-shorts-31474041946165_5000x.jpg?v=1649484271",
      title: "Stone Harbor Boys Blue Summer Shorts",
      counter: "34",
      status: "Published",
    },
    {
      id: 2,
      Checkbox: 0,
      image:
        "https://cdn.assetsmanagment.com/4/48009CBE-E060-4CD2-8807-F671EBBABFBF.jpg",
      title: "Black T-shirt",
      counter: "13",
      status: "Draft",
    },
    {
      id: 3,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNSvqCanugg2H7U5L3jZ2nsNO3G3nti3rvg&s", // Replace with actual URL
      title: "White Graphic T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 4,
      Checkbox: 1,
      image:
        "https://cdn.assetsmanagment.com/4/311581CC-5EC6-45C8-8F8E-777FEB66981C.jpg", // Replace with actual URL
      title: "Striped Polo T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 5,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIWH5e2nCFVysrCL3k2MN_KkhV66nHBM47GQ&s", // Replace with actual URL
      title: "Blue V-neck T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 6,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLRnyoljRVOQqJBz2CZ0_fdCVTwWpLVlN5Q&s", // Replace with actual URL
      title: "Gray Casual T-shirt",
      counter: "65",
      status: "Draft",
    },
    {
      id: 7,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuEJbsfqQmkWbVuivr7eVOkehbZIQ6SPfag&s", // Replace with actual URL
      title: "Red Sporty T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 8,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAg9mW-QoWv8hUOu9LYbi4uUZ9mtPzh9lonA&s", // Replace with actual URL
      title: "Green Printed T-shirt",
      counter: "65",
      status: "Draft",
    },
    {
      id: 9,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sVFZbSCoOnwfylOarN_OIIRMWZIvziwT0A&s", // Replace with actual URL
      title: "Yellow Retro T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 10,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgaITzcGIonFVzq7dP_PzrSpvGM-YJ6t_OCA&s", // Replace with actual URL
      title: "Orange Graphic Tee",
      counter: "65",
      status: "Published",
    },
    {
      id: 11,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAg9mW-QoWv8hUOu9LYbi4uUZ9mtPzh9lonA&s", // Replace with actual URL
      title: "Pink Summer T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 12,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuEJbsfqQmkWbVuivr7eVOkehbZIQ6SPfag&s", // Replace with actual URL
      title: "Purple Casual T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 13,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNSvqCanugg2H7U5L3jZ2nsNO3G3nti3rvg&s", // Replace with actual URL
      title: "Brown Vintage T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 14,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLRnyoljRVOQqJBz2CZ0_fdCVTwWpLVlN5Q&s", // Replace with actual URL
      title: "Light Blue Sporty Tee",
      counter: "65",
      status: "Draft",
    },
    {
      id: 15,
      Checkbox: 1,
      image: "https://m.media-amazon.com/images/I/61En2V4Na2S._AC_UY1100_.jpg", // Replace with actual URL
      title: "Dark Green Stylish T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 16,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgaITzcGIonFVzq7dP_PzrSpvGM-YJ6t_OCA&s", // Replace with actual URL
      title: "Navy Blue Graphic Tee",
      counter: "65",
      status: "Published",
    },
    {
      id: 17,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuEJbsfqQmkWbVuivr7eVOkehbZIQ6SPfag&s", // Replace with actual URL
      title: "Turquoise Blue Tee",
      counter: "65",
      status: "Draft",
    },
    {
      id: 18,
      Checkbox: 1,
      image:
        "https://cdn.assetsmanagment.com/4/311581CC-5EC6-45C8-8F8E-777FEB66981C.jpg", // Replace with actual URL
      title: "Maroon Comfort Fit T-shirt",
      counter: "65",
      status: "Published",
    },
    {
      id: 19,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvLRnyoljRVOQqJBz2CZ0_fdCVTwWpLVlN5Q&s", // Replace with actual URL
      title: "Olive Green T-shirt",
      counter: "65",
      status: "Draft",
    },
    {
      id: 20,
      Checkbox: 1,
      image: "https://m.media-amazon.com/images/I/61En2V4Na2S._AC_UY1100_.jpg", // Replace with actual URL
      title: "Beige Casual Tee",
      counter: "65",
      status: "Published",
    },
    {
      id: 21,
      Checkbox: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgaITzcGIonFVzq7dP_PzrSpvGM-YJ6t_OCA&s", // Replace with actual URL
      title: "Cream Color T-shirt",
      counter: "65",
      status: "Published",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Calculate total pages based on filtered items
  const filteredItems = modalProductRows.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle search query change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  // Pagination logic
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (isChecked, rowIndex) => {
    const itemId = currentItems[rowIndex].id; // Get the id from currentItems
    const updatedSelectedRows = [...selectedRows];

    if (isChecked && !updatedSelectedRows.includes(itemId)) {
      updatedSelectedRows.push(itemId); // Add to selectedRows
    } else if (!isChecked) {
      const indexToRemove = updatedSelectedRows.indexOf(itemId);
      if (indexToRemove !== -1) {
        updatedSelectedRows.splice(indexToRemove, 1); // Remove from selectedRows
      }
    }

    setSelectedRows(updatedSelectedRows); // Update selectedRows state
    values.setBarActive(true); // Trigger save bar active state
  };

  // Save button click handler
  const handleSaveButtonClick = () => {
    console.log("selectedRows", selectedRows);
    values.setBarActive(false);
  };

  // Discard changes effect
  useEffect(() => {
    if (values.discard && modalProductRows.length > 0) {
      setSelectedRows([]);
      values.setDiscard(false);
    }
  }, [values.discard, modalProductRows]);

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div style={{ margin: values.barActive ? "64px" : "0" }}>
        {values.barActive && (
          <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              onAction: handleSaveButtonClick,
            }}
            discardAction={{
              onAction: () => {
                values.setBarActive(false);
                values.setDiscard(true);
              },
            }}
          />
        )}
      </div>
      <Card sectioned>
        <div style={{ width: "60%", marginLeft: "20%" }}>
          <TextField
            placeholder="Search"
            suffix={<Icon source={SearchIcon} />}
            autoComplete="off"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <br />
        <br />
        {filteredItems.length >= 1 ? (
          <>
            <DataTable
              columnContentTypes={["text", "text", "text", "text", "text"]}
              headings={[
                <Checkbox
                  checked={selectedRows.length === filteredItems.length}
                  onChange={() => {
                    setSelectedRows(
                      selectedRows.length === filteredItems.length
                        ? []
                        : filteredItems.map((row) => row.id)
                    );
                    values.setBarActive(true);
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
              rows={currentItems.map((item, index) => [
                <Checkbox
                  key={item.id}
                  checked={selectedRows.includes(item.id)}
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
                <Text>
                  {/* {item.title.length > 25
                    ? `${item.title.slice(0, 25)}...`
                    : item.title} */}
                  {item.title}
                </Text>,
                <Badge>{item.counter} </Badge>,
                <Text>
                  {item.status == "Published" ? (
                    <>
                      <Badge tone="success">{item.status}</Badge>
                    </>
                  ) : (
                    <>
                      <Badge tone="warning">{item.status}</Badge>
                    </>
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
                disabled={currentPage === 1}
                onClick={() => handlePageChange("previous")}
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
              >
                <Text variant="bodyMd">
                  Page {currentPage} of {totalPages}
                </Text>
              </div>
              <Button
                variant="primary"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange("next")}
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
