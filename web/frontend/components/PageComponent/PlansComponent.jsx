import { Button, Card, Divider, Grid, List, Text } from "@shopify/polaris";
import React from "react";

const PlansComponent = ({ values }) => {
  return (
    <Card>
      <Grid>
        {values.plans ? (
          <>
            {values.plans.map((item) => (
              <Grid.Cell
                columnSpan={{
                  xs: 6,
                  sm: 4,
                  md: 4,
                  lg: 4,
                  xl: 4,
                }}
              >
                <>
                  <br />
                  <Card>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Text variant="headingMd" as="h6">
                        {item.name}
                      </Text>
                    </div>

                    <br />
                    <Divider borderColor="border-inverse" />
                    <br />
                    <Text variant="headingSm" as="h6">
                      {/* {item.views} */}
                      Plan Information
                    </Text>

                    <br />
                    <List type="bullet">
                      <List.Item>{item.plan_info}</List.Item>
                    </List>
                    <br />
                    {/* <div>
                    <Text variant="heading2xl" as="h6">
                      {"$" + item.price}
                    </Text>
                  </div> */}

                    <br />
                    <Button
                      variant="primary"
                      size="large"
                      fullWidth
                      onClick={() => {
                        values.handlePlan(item.id);
                      }}
                      //   disabled={values.isPlan == item.plan_id}
                    >
                      {values.isPlan == item.plan_id ? (
                        <>Subscribed</>
                      ) : (
                        <>
                          <Text variant="heading2xl" as="h6">
                            {"$" + item.price} /Month
                          </Text>
                        </>
                      )}

                      {/* Subscribe */}
                    </Button>
                  </Card>
                </>
              </Grid.Cell>
            ))}
          </>
        ) : (
          <>
            <Text>Plans Will be shown here</Text>
          </>
        )}
      </Grid>
    </Card>
  );
};

export default PlansComponent;
