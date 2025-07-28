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

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository

    @Override
    public TransactionResponse createTransaction(TransactionRequest request, String username) {
        // Find the user by username. Handle case where user is not found.
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // Create a new Transaction entity from the request
        Transaction transaction = new Transaction();
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDate(request.getDate());
        transaction.setCategory(request.getCategory());
        transaction.setUser(user);

        // Save the transaction to the database
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Convert the saved entity to a response DTO and return it
        return TransactionResponse.fromTransaction(savedTransaction);
    }

    @Override
    public List<TransactionResponse> getTransactionsForUser(String username) {
        // Find the user by username. Handle case where user is not found.
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // Fetch all transactions for the user
        List<Transaction> transactions = transactionRepository.findByUser(user);

        // Convert the list of entities to a list of response DTOs
        return transactions.stream()
                .map(TransactionResponse::fromTransaction)
                .collect(Collectors.toList());
    }
}
