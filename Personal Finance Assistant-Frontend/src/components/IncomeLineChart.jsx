import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IncomeLineChart = () => {
  const { analytics } = useSelector((store) => store);

  const chartData = {
    options: {
      chart: {
        id: 'income-by-date-chart',
        toolbar: { show: false },
        foreColor: '#A0AEC0'
      },
      xaxis: {
        categories: analytics.incomeByDate.map(item => item.date),
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
        name: 'Total Income',
        data: analytics.incomeByDate.map(item => item.totalAmount),
      },
    ],
  };

  return (
    <Card className="bg-gray-900 text-white">
        <CardHeader>
            <CardTitle>Income Over Time</CardTitle>
        </CardHeader>
        <CardContent>
            {analytics.loading ? (
                <p>Loading chart data...</p>
            ) : analytics.incomeByDate.length > 0 ? (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height={350}
                />
            ) : (
                <p>No income data available to display.</p>
            )}
        </CardContent>
    </Card>
  );
};

export default IncomeLineChart;
