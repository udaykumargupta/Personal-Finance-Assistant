import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  getExpensesByCategory, 
  getIncomeByCategory,
  getExpensesByDate,
  getIncomeByDate
} from '@/state/Analytics/Action';
import ExpenseChart from '@/components/ExpenseChart';
import IncomeChart from '@/components/IncomeChart';
import ExpenseLineChart from '@/components/ExpenseLineChart';
import IncomeLineChart from '@/components/IncomeLineChart';
import CombinedCategoryChart from '@/components/CombinedCategoryChart';
import CombinedDateChart from '@/components/CombinedDateChart'; // Import the new daily chart
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const dispatch = useDispatch();
  const [chartType, setChartType] = useState('income_vs_expense_daily'); // Default to the new daily chart
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch initial data for all charts when the component loads
  useEffect(() => {
    dispatch(getExpensesByCategory());
    dispatch(getIncomeByCategory());
    dispatch(getExpensesByDate());
    dispatch(getIncomeByDate());
  }, [dispatch]);

  // Handler for applying the date filter for category charts
  const handleFilter = () => {
    // When filtering, we need data for all category charts
    dispatch(getExpensesByCategory(startDate, endDate));
    dispatch(getIncomeByCategory(startDate, endDate));
  };

  // Check if the current chart type is one that uses the date filter
  const isCategoryChart = chartType === 'expense_vs_category' 
                          || chartType === 'income_vs_category' 
                          || chartType === 'income_vs_expense_category';

  return (
    <div className="lg:flex h-screen bg-gray-900 text-white">
      {/* Left Half: Placeholder for future content */}
      <div className="lg:w-1/3 lg:border-r lg:border-gray-700 p-5">
        <Card className="bg-gray-800 border-gray-700 h-full">
          <CardHeader>
            <CardTitle>Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">This area can be used for summary widgets or other controls.</p>
          </CardContent>
        </Card>
      </div>

      {/* Right Half: Analytics & Graphs */}
      <div className="lg:w-2/3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          {/* Chart Type Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button 
              variant={chartType === 'income_vs_expense_daily' ? 'default' : 'outline'}
              onClick={() => setChartType('income_vs_expense_daily')}
            >
              Daily Income vs Expense
            </Button>
            <Button 
              variant={chartType === 'income_vs_expense_category' ? 'default' : 'outline'}
              onClick={() => setChartType('income_vs_expense_category')}
            >
              Income vs Expense (Category)
            </Button>
            <Button 
              variant={chartType === 'expense_vs_category' ? 'default' : 'outline'}
              onClick={() => setChartType('expense_vs_category')}
            >
              Expenses by Category
            </Button>
            <Button 
              variant={chartType === 'income_vs_category' ? 'default' : 'outline'}
              onClick={() => setChartType('income_vs_category')}
            >
              Income by Category
            </Button>
            <Button 
              variant={chartType === 'expense_vs_date' ? 'default' : 'outline'}
              onClick={() => setChartType('expense_vs_date')}
            >
              Expenses Over Time
            </Button>
            <Button 
              variant={chartType === 'income_vs_date' ? 'default' : 'outline'}
              onClick={() => setChartType('income_vs_date')}
            >
              Income Over Time
            </Button>
          </div>
          
          {/* Date Filter Section - shown only for category charts */}
          {isCategoryChart && (
            <div className="flex items-center gap-4">
              <Input
                id="startDate"
                type="date"
                className="bg-gray-700 border-gray-600 text-white"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                id="endDate"
                type="date"
                className="bg-gray-700 border-gray-600 text-white"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Button onClick={handleFilter}>Filter</Button>
            </div>
          )}
        </div>
        
        {/* Conditionally render the charts */}
        {chartType === 'income_vs_expense_daily' && <CombinedDateChart />}
        {chartType === 'income_vs_expense_category' && <CombinedCategoryChart />}
        {chartType === 'expense_vs_category' && <ExpenseChart />}
        {chartType === 'income_vs_category' && <IncomeChart />}
        {chartType === 'expense_vs_date' && <ExpenseLineChart />}
        {chartType === 'income_vs_date' && <IncomeLineChart />}
      </div>
    </div>
  );
};

export default Home;
