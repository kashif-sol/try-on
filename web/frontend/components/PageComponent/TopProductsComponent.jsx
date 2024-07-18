import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "@shopify/polaris";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopProductsComponent = ({ products }) => {
  const productTitles = products.map((product) => {
    const title = product.title || `Product ${product.id}`;
    return title.length > 40 ? `${title.slice(0, 40)}...` : title;
  });
  const productViews = products.map((product) => product.views);

  const chartData = {
    labels: productTitles,
    datasets: [
      {
        label: "Number of tries",
        data: productViews,
        backgroundColor: "#12436d",
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Number of tries",
        },
        grid: {
          display: false, // Remove horizontal grid lines
        },
      },
      x: {
        title: {
          display: true,
          //   text: "Number of Views",
        },
        ticks: {
          callback: function (value) {
            return this.getLabelForValue(value);
          },
          autoSkip: false,
          maxRotation: 45,
          //   minRotation: 45,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      //   title: {
      //     display: true,
      //     text: "Top products by tries",
      //   },
    },
    barThickness: 40, // Decrease the width of the bars
  };

  return (
    <div>
      <Card>
        <div style={{ height: "500px", width: "100%" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};

export default TopProductsComponent;
