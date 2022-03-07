import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export const Chart = ({income, expenses}) => {

  const data = [
    {
      name: "Profit and loss statement",
      income: income,
      expenses: expenses
    }
  ];

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="income" fill="#00642e" />
      <Bar dataKey="expenses" fill="#ba131a" />
    </BarChart>
  );
}
