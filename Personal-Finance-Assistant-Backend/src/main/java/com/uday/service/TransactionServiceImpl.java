package com.uday.service;

import com.uday.model.Transaction;
import com.uday.model.User;
import com.uday.repository.TransactionRepository;
import com.uday.repository.UserRepository;
import com.uday.request.TransactionRequest;
import com.uday.response.TransactionResponse;
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
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        Transaction transaction = new Transaction();
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDate(request.getDate());
        transaction.setCategory(request.getCategory());
        transaction.setUser(user);

        Transaction savedTransaction = transactionRepository.save(transaction);
        return TransactionResponse.fromTransaction(savedTransaction);
    }

    @Override
    public List<TransactionResponse> getTransactionsForUser(String username) {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        List<Transaction> transactions = transactionRepository.findByUser(user);
        return transactions.stream()
                .map(TransactionResponse::fromTransaction)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransactionResponse> getTransactionsForUserByDateRange(String username, LocalDate startDate, LocalDate endDate) {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // Call the new repository method
        List<Transaction> transactions = transactionRepository.findByUserAndDateBetween(user, startDate, endDate);

        // Convert the list of entities to a list of response DTOs
        return transactions.stream()
                .map(TransactionResponse::fromTransaction)
                .collect(Collectors.toList());
    }
}
