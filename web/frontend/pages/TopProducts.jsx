import React, { useContext, useEffect, useState } from "react";
import TopProductsComponent from "../components/PageComponent/TopProductsComponent";
import { useAuthenticatedFetch } from "../hooks";
import { wrapper } from "../components/PageComponent/WrapperComponent";
import { Page } from "@shopify/polaris";

const TopProducts = () => {
  const fetch = useAuthenticatedFetch();
  const {
    loadingActive,
    setLoadingActive,
    showToast,
    setShowToast,
    toastContent,
    setToastContent,
    handleToggleActive,
  } = useContext(wrapper);
  const [products, setProducts] = useState([]);

  const fetchTopProducts = async () => {
    setLoadingActive(true);
    try {
      const response = await fetch("/api/top-products");
      const data = await response.json();
      if (data.status === "success") {
        setProducts(data.top_products);
        // setToastContent(result.message);
        // setShowToast(true);
      }
    } catch (error) {
      console.error("Error fetching top products:", error);
    } finally {
      setLoadingActive(false);
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  return (
    <>
      <Page fullWidth>
        <TopProductsComponent products={products} />
      </Page>
    </>
  );
};

export default TopProducts;
