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
        backgroundColor: "#E95C87",
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y", // Set this to 'y' to make the bars horizontal
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Number of tries",
        },
        grid: {
          display: false, // Remove vertical grid lines
        },
      },
      y: {
        title: {
          display: true,
          // text: "Products",
        },
        ticks: {
          callback: function (value) {
            return this.getLabelForValue(value);
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    barThickness: 40, // Adjust the width of the bars
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
