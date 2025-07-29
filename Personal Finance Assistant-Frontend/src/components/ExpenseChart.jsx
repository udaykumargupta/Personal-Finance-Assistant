import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpenseChart = () => {
  const { analytics } = useSelector((store) => store);

  // Prepare data for the chart
  const chartData = {
    options: {
      chart: {
        id: 'expense-by-category-chart',
        toolbar: {
          show: false,
        },
        foreColor: '#A0AEC0' // Text color for the whole chart (axes, labels)
      },
      xaxis: {
        categories: analytics.expensesByCategory.map(item => item.category),
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return "₹" + Math.round(value); // Format y-axis labels as currency
          }
        },
      },
      grid: {
        borderColor: '#2D3748', // Darker grid lines for dark mode
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      theme: {
        mode: 'dark',
      }
    },
    series: [
      {
        name: 'Total Expenses',
        data: analytics.expensesByCategory.map(item => item.totalAmount),
      },
    ],
  };

  return (
    <Card className="bg-gray-900 text-white">
        <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
            {analytics.loading ? (
                <p>Loading chart data...</p>
            ) : analytics.expensesByCategory.length > 0 ? (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            ) : (
                <p>No expense data available to display.</p>
            )}
        </CardContent>
    </Card>
  );
};

export default ExpenseChart;
