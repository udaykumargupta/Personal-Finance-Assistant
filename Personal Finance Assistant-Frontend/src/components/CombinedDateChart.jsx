import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CombinedDateChart = () => {
  const { analytics } = useSelector((store) => store);

  // Process and combine the date-based data
  const processChartData = () => {
    const expenseMap = new Map(analytics.expensesByDate.map(item => [item.date, item.totalAmount]));
    const incomeMap = new Map(analytics.incomeByDate.map(item => [item.date, item.totalAmount]));

    // Get a unique list of all dates and sort them
    const allDates = [
        ...new Set([
            ...analytics.expensesByDate.map(item => item.date),
            ...analytics.incomeByDate.map(item => item.date)
        ])
    ].sort((a, b) => new Date(a) - new Date(b));

    // Create data arrays that align with the unique, sorted dates
    const expenseData = allDates.map(date => expenseMap.get(date) || 0);
    const incomeData = allDates.map(date => incomeMap.get(date) || 0);

    return { dates: allDates, expenseData, incomeData };
  };

  const { dates, expenseData, incomeData } = processChartData();

  const chartData = {
    options: {
      chart: {
        id: 'income-vs-expense-by-date-chart',
        type: 'bar',
        toolbar: { show: false },
        foreColor: '#A0AEC0',
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '80%',
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: dates,
        type: 'datetime',
        labels: {
          datetimeUTC: false,
        }
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
            <CardTitle>Daily Income vs. Expense</CardTitle>
        </CardHeader>
        <CardContent>
            {analytics.loading ? (
                <p>Loading chart data...</p>
            ) : dates.length > 0 ? (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            ) : (
                <p>No daily data available to display.</p>
            )}
        </CardContent>
    </Card>
  );
};

export default CombinedDateChart;
