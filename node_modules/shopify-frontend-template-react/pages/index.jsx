import { Frame, Page } from "@shopify/polaris";
import Home from "../components/PageComponent/Home";
import { useState } from "react";

export default function HomePage() {
  const [barActive, setBarActive] = useState(false);
  const [discard, setDiscard] = useState(false);
  const values = {
    barActive,
    setBarActive,
    discard,
    setDiscard,
  };
  return (
    <Page fullWidth>
      <Frame>
        {/* <div
          style={{
            width: "80%",
            marginLeft: "10%",
          }}
        >
        </div> */}
        <Home values={values} />
      </Frame>
    </Page>
  );
}
