import {
  ContextualSaveBar,
  Frame,
  Loading,
  Page,
  Toast,
} from "@shopify/polaris";
import Home from "../components/PageComponent/Home";
import { useCallback, useContext, useState } from "react";
import { wrapper } from "../components/PageComponent/WrapperComponent";
import { useAuthenticatedFetch } from "../hooks";
import debounce from "debounce";
import { useQuery } from "react-query";

export default function HomePage() {
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
  const [discard, setDiscard] = useState(false);
  const [barActive, setBarActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchLinks = async (
    searchQuery = "",
    cursor = "",
    direction = "next"
  ) => {
    setLoadingActive(true);
    try {
      const cursorParam =
        direction === "next" ? `endCursor=${cursor}` : `startCursor=${cursor}`;
      const response = await fetch(
        `/api/get-products?${cursorParam}&search=${searchQuery}`
      );
      const data = await response.json();
      if (data.status === "success") {
        setProducts(data.products);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingActive(false);
    }
  };

  const handleDebouncedSearch = useCallback(
    debounce((searchQuery) => fetchLinks(searchQuery, ""), 1000),
    []
  );

  useQuery("links", () => fetchLinks(searchQuery, ""), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleSearchQuery = (e) => {
    setSearchQuery(e);
    handleDebouncedSearch(e);
  };

  const handlePostData = async (arr) => {
    setLoadingActive(true);
    const apiUrl = "/api/save-products";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: arr }),
      });
      const result = await response.json();
      if (result.status == "success") {
        setToastContent(result.message);
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingActive(false);
    }
  };

  const handleSaveButtonClick = () => {
    handlePostData(selectedRows);
    setBarActive(false);
  };

  const values = {
    discard,
    setDiscard,
    barActive,
    setBarActive,
    searchQuery,
    setSearchQuery,
    products,
    setProducts,
    pagination,
    handleSearchQuery,
    fetchLinks,
    selectedRows,
    setSelectedRows,
  };

  return (
    <Page>
      <Frame>
        <div style={{ margin: barActive ? "64px" : "0" }}>
          {values.barActive && (
            <ContextualSaveBar
              message="Unsaved changes"
              saveAction={{
                onAction: handleSaveButtonClick,
              }}
              discardAction={{
                onAction: () => {
                  setBarActive(false);
                  setDiscard(true);
                },
              }}
            />
          )}
        </div>
        <Home values={values} />
        <div>
          {showToast && (
            <Toast content={toastContent} onDismiss={handleToggleActive} />
          )}
        </div>
        <div>{loadingActive && <Loading />}</div>
      </Frame>
    </Page>
  );
}
