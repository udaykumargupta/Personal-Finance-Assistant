package com.uday.service;

import com.uday.domain.TransactionType;
import com.uday.model.Transaction;
import com.uday.model.User;
import com.uday.repository.TransactionRepository;
import com.uday.repository.UserRepository;
import com.uday.request.TransactionRequest;
import com.uday.response.ExpenseByCategoryResponse;
import com.uday.response.TransactionResponse;
import com.uday.response.TransactionSummaryByDateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public TransactionResponse createTransaction(TransactionRequest request, String username) {
        User user = userRepository.findByEmail(username);
        if (user == null) { throw new UsernameNotFoundException("User not found with username: " + username); }
        Transaction transaction = new Transaction();
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDate(request.getDate());
        transaction.setCategory(request.getCategory());
        transaction.setUser(user);
        return TransactionResponse.fromTransaction(transactionRepository.save(transaction));
    }

//    @Override
//    public List<TransactionResponse> getTransactionsForUser(String username) {
//        User user = userRepository.findByEmail(username);
//        if (user == null) { throw new UsernameNotFoundException("User not found with username: " + username); }
//        return transactionRepository.findByUser(user).stream()
//                .map(TransactionResponse::fromTransaction)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<TransactionResponse> getTransactionsForUserByDateRange(String username, LocalDate startDate, LocalDate endDate) {
//        User user = userRepository.findByEmail(username);
//        if (user == null) { throw new UsernameNotFoundException("User not found with username: " + username); }
//        return transactionRepository.findByUserAndDateBetween(user, startDate, endDate).stream()
//                .map(TransactionResponse::fromTransaction)
//                .collect(Collectors.toList());
//    }


    //    more powerful method that can handle all filtering combinations instead of above two.
    @Override
    public List<TransactionResponse> getTransactions(String username, LocalDate startDate, LocalDate endDate, String category) {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        List<Transaction> transactions;

        boolean hasDateRange = startDate != null && endDate != null;
        boolean hasCategory = category != null && !category.trim().isEmpty();

        if (hasDateRange && hasCategory) {
            transactions = transactionRepository.findByUserAndCategoryAndDateBetween(user, category, startDate, endDate);
        } else if (hasDateRange) {
            transactions = transactionRepository.findByUserAndDateBetween(user, startDate, endDate);
        } else if (hasCategory) {
            transactions = transactionRepository.findByUserAndCategory(user, category);
        } else {
            transactions = transactionRepository.findByUser(user);
        }

        return transactions.stream()
                .map(TransactionResponse::fromTransaction)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExpenseByCategoryResponse> getExpenseSummaryByCategory(String username, LocalDate startDate, LocalDate endDate) {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        // If dates are provided, use the new date-filtered query.
        if (startDate != null && endDate != null) {
            return transactionRepository.getSummaryByCategoryAndDateBetween(user, TransactionType.EXPENSE, startDate, endDate);
        } else {
            // Otherwise, use the original query.
            return transactionRepository.getSummaryByCategory(user, TransactionType.EXPENSE);
        }
    }

    @Override
    public List<ExpenseByCategoryResponse> getIncomeSummaryByCategory(String username, LocalDate startDate, LocalDate endDate) {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        // If dates are provided, use the new date-filtered query.
        if (startDate != null && endDate != null) {
            return transactionRepository.getSummaryByCategoryAndDateBetween(user, TransactionType.INCOME, startDate, endDate);
        } else {
            // Otherwise, use the original query.
            return transactionRepository.getSummaryByCategory(user, TransactionType.INCOME);
        }
    }

    @Override
    public List<TransactionSummaryByDateResponse> getExpenseSummaryByDate(String username) {
        User user = userRepository.findByEmail(username);
        if (user == null) { throw new UsernameNotFoundException("User not found with username: " + username); }
        return transactionRepository.getSummaryByDate(user, TransactionType.EXPENSE);
    }

    @Override
    public List<TransactionSummaryByDateResponse> getIncomeSummaryByDate(String username) {
        User user = userRepository.findByEmail(username);
        if (user == null) { throw new UsernameNotFoundException("User not found with username: " + username); }
        return transactionRepository.getSummaryByDate(user, TransactionType.INCOME);
    }
}
