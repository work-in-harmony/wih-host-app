// src/components/SalesChart.jsx
import { useEffect, useState } from "react";
import { API_URLS } from "../constants/urls";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ startDate, endDate }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const params = new URLSearchParams({ startDate, endDate });
        const response = await fetch(
          `${API_URLS.adminSalesReport}?${params}`,
          {
            method: "POST", // or 'POST', etc.
            credentials: "include", // <-- This is the line you need
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Sales Report Data:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching sales report:", error);
      }
    };

    fetchSalesData();
  }, [startDate, endDate]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis
          dataKey="_id"
          label={{ value: "Month", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis
          label={{ value: "Sales (₹)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="totalSales" stroke="#4f46e5" />
      </LineChart>
    </ResponsiveContainer>
  );
}
