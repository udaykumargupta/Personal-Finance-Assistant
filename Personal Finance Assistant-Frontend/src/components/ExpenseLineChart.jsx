import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpenseLineChart = () => {
  const { analytics } = useSelector((store) => store);

  const chartData = {
    options: {
      chart: {
        id: 'expense-by-date-chart',
        toolbar: { show: false },
        foreColor: '#A0AEC0'
      },
      xaxis: {
        categories: analytics.expensesByDate.map(item => item.date),
        type: 'datetime',
        labels: {
          datetimeUTC: false, // Display dates in local time
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return "₹" + Math.round(value);
          }
        },
      },
      grid: { borderColor: '#2D3748' },
      stroke: { curve: 'smooth' },
      theme: { mode: 'dark' }
    },
    series: [
      {
        name: 'Total Expenses',
        data: analytics.expensesByDate.map(item => item.totalAmount),
      },
    ],
  };

  return (
    <Card className="bg-gray-900 text-white">
        <CardHeader>
            <CardTitle>Expenses Over Time</CardTitle>
        </CardHeader>
        <CardContent>
            {analytics.loading ? (
                <p>Loading chart data...</p>
            ) : analytics.expensesByDate.length > 0 ? (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height={350}
                />
            ) : (
                <p>No expense data available to display.</p>
            )}
        </CardContent>
    </Card>
  );
};

export default ExpenseLineChart;
