import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import React, { createContext, useCallback, useEffect, useState } from "react";
export const wrapper = createContext();

const WrapperComponent = ({ children }) => {
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();
  const [loadingActive, setLoadingActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");

  const handleToggleActive = () => {
    setShowToast(!showToast);
  };

  return (
    <>
      <wrapper.Provider
        value={{
          loadingActive,
          setLoadingActive,
          showToast,
          setShowToast,
          toastContent,
          setToastContent,
          handleToggleActive,
        }}
      >
        {children}
      </wrapper.Provider>
    </>
  );
};

export default WrapperComponent;
