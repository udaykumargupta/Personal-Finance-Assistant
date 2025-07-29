import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TransactionTable = () => {
  const { transaction } = useSelector((store) => store);

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <Card className="bg-gray-800 border-gray-700 text-white flex-grow">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transaction.loading ? (
          <p>Loading transactions...</p>
        ) : transaction.transactions.length > 0 ? (
          <div className="overflow-y-auto h-[60vh] scroll-container">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-700">
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction.transactions.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-700">
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === 'EXPENSE' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
                      }`}>
                        {item.type}
                      </span>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      item.type === 'EXPENSE' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {formatCurrency(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p>No transactions found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
