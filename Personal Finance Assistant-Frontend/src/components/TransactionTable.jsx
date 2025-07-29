import React, { useState } from 'react';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10; // You can adjust how many items you want per page

const TransactionTable = () => {
  const { transaction } = useSelector((store) => store);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(transaction.transactions.length / ITEMS_PER_PAGE);

  // Get the transactions for the current page
  const paginatedTransactions = transaction.transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers for changing the page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <>
      {/* Custom styles for the scrollbar */}
      <style>
        {`
          .scroll-container::-webkit-scrollbar {
            width: 8px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: #2d3748; /* Corresponds to gray-800 */
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background: #4a5568; /* Corresponds to gray-700 */
            border-radius: 4px;
          }
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #718096; /* Corresponds to gray-600 */
          }
        `}
      </style>
      <Card className="bg-gray-800 border-gray-700 text-white flex-grow flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        
        {transaction.loading ? (
          <CardContent><p>Loading transactions...</p></CardContent>
        ) : transaction.transactions.length > 0 ? (
          <>
            {/* This content area will grow and scroll internally */}
            <CardContent className="flex-grow overflow-y-auto scroll-container p-0">
              <Table>
                <TableHeader className="sticky top-0 bg-gray-800 z-10">
                  <TableRow className="hover:bg-gray-700 border-b border-gray-700">
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-700 border-b border-gray-700">
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
            </CardContent>
            
            {/* Pagination is moved outside the scrolling area */}
            <div className="p-4 border-t border-gray-700 flex-shrink-0">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePreviousPage(); }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      Page {currentPage} of {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleNextPage(); }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <CardContent><p>No transactions found.</p></CardContent>
        )}
      </Card>
    </>
  );
};

export default TransactionTable;
