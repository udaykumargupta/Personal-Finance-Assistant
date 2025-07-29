import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CombinedCategoryChart = () => {
  const { analytics } = useSelector((store) => store);

  // This function processes and combines the expense and income data
  const processChartData = () => {
    const expenseMap = new Map(analytics.expensesByCategory.map(item => [item.category, item.totalAmount]));
    const incomeMap = new Map(analytics.incomeByCategory.map(item => [item.category, item.totalAmount]));

    // Get a unique list of all categories from both datasets
    const allCategories = [
        ...new Set([
            ...analytics.expensesByCategory.map(item => item.category),
            ...analytics.incomeByCategory.map(item => item.category)
        ])
    ];

    // Create data arrays that align with the unique categories
    const expenseData = allCategories.map(category => expenseMap.get(category) || 0);
    const incomeData = allCategories.map(category => incomeMap.get(category) || 0);

    return { categories: allCategories, expenseData, incomeData };
  };

  const { categories, expenseData, incomeData } = processChartData();

  const chartData = {
    options: {
      chart: {
        id: 'income-vs-expense-chart',
        type: 'bar',
        toolbar: { show: false },
        foreColor: '#A0AEC0',
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: { text: 'Amount (₹)' },
         labels: {
          formatter: function (value) {
            return "₹" + Math.round(value);
          }
        },
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: function (val) {
            return "₹ " + val;
          }
        }
      },
      theme: { mode: 'dark' },
      grid: { borderColor: '#2D3748' },
      colors: ['#ef4444', '#22c55e'] // Red for expenses, Green for income
    },
    series: [
      {
        name: 'Expense',
        data: expenseData,
      },
      {
        name: 'Income',
        data: incomeData,
      },
    ],
  };

  return (
    <Card className="bg-gray-900 text-white">
        <CardHeader>
            <CardTitle>Income vs. Expense by Category</CardTitle>
        </CardHeader>
        <CardContent>
            {analytics.loading ? (
                <p>Loading chart data...</p>
            ) : categories.length > 0 ? (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            ) : (
                <p>No data available to display.</p>
            )}
        </CardContent>
    </Card>
  );
};

export default CombinedCategoryChart;
