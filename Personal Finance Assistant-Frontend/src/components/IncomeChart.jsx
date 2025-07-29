import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IncomeChart = () => {
  const { analytics } = useSelector((store) => store);

  // Prepare data for the chart
  const chartData = {
    options: {
      chart: {
        id: 'income-by-category-chart',
        toolbar: {
          show: false,
        },
        foreColor: '#A0AEC0', // Text color for the whole chart
        background: 'transparent'
      },
      xaxis: {
        categories: analytics.incomeByCategory.map(item => item.category),
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return "₹" + Math.round(value); // Format y-axis labels as currency
          }
        },
      },
      grid: {
        borderColor: '#2D3748',
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
        name: 'Total Income',
        data: analytics.incomeByCategory.map(item => item.totalAmount),
      },
    ],
  };

  return (
    <Card className="bg-gray-900 text-white">
        <CardHeader>
            <CardTitle>Income by Category</CardTitle>
        </CardHeader>
        <CardContent>
            {analytics.loading ? (
                <p>Loading chart data...</p>
            ) : analytics.incomeByCategory.length > 0 ? (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            ) : (
                <p>No income data available to display.</p>
            )}
        </CardContent>
    </Card>
  );
};

export default IncomeChart;
