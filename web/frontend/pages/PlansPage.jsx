import { Frame, Loading, Page, Toast } from "@shopify/polaris";
import React, { useContext, useEffect, useState } from "react";
import PlansComponent from "../components/PageComponent/PlansComponent";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { wrapper } from "../components/PageComponent/WrapperComponent";

const PlansPage = () => {
  const {
    loadingActive,
    setLoadingActive,
    showToast,
    setShowToast,
    toastContent,
    setToastContent,
    handleToggleActive,
  } = useContext(wrapper);
  const fetch = useAuthenticatedFetch();
  const [plans, setPlans] = useState([]);
  const [isPlan, setIsPlan] = useState("");
  console.log("is Plan", isPlan);

  const fetchPlans = async () => {
    setLoadingActive(true);
    try {
      const response = await fetch("/api/plans");

      const data = await response.json();
      if (data.status == "success") {
        setPlans(data.plans);
        setIsPlan(data.is_plan == null ? "" : data.is_plan);
      }
    } catch (error) {
    } finally {
      setLoadingActive(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handlePlan = async (id) => {
    setLoadingActive(true);
    try {
      const response = await fetch(`api/subscribe_plan?plan_id=${id}`);
      const data = await response.json();
      if (data.status == "success") {
        // const url = await response.text();

        window.parent.location.href = data.url;
      }

      //   if (response.ok) {
      //     const url = await response.text();

      //     window.parent.location.href = url;
      //   }
      // return data;
    } catch (error) {
      setToastContent("Error to subscribed the plan");
      setShowToast(true);
    } finally {
      setLoadingActive(false);
    }
  };

  const values = {
    plans,
    setPlans,
    handlePlan,
    isPlan,
  };

  return (
    <Page>
      <Frame>
        <PlansComponent values={values} />
        <div>
          {showToast && (
            <Toast content={toastContent} onDismiss={handleToggleActive} />
          )}
        </div>
        <div>{loadingActive && <Loading />}</div>
      </Frame>
    </Page>
  );
};

export default PlansPage;
