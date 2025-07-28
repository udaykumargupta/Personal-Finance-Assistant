package com.uday.service;

import com.uday.domain.TransactionType;
import com.uday.model.Transaction;
import com.uday.model.User;
import com.uday.repository.TransactionRepository;
import com.uday.repository.UserRepository;
import com.uday.response.TransactionResponse;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PdfServiceImpl implements PdfService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<TransactionResponse> processPdfStatement(MultipartFile file, String username) throws IOException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        List<Transaction> createdTransactions = new ArrayList<>();

        // Use PDFBox to load the PDF document from the uploaded file
        try (PDDocument document = Loader.loadPDF(file.getInputStream().readAllBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);

            // Split the text into lines and process each one
            String[] lines = text.split("\\r?\\n");
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

            for (String line : lines) {
                // This is a simplified parser. It assumes a CSV-like format:
                // "DD-MM-YYYY,Description,Amount"
                // Example: "28-07-2025,Salary,2500.00"
                // Example: "29-07-2025,Groceries,-75.50"
                String[] parts = line.split(",");
                if (parts.length == 3) {
                    try {
                        LocalDate date = LocalDate.parse(parts[0].trim(), formatter);
                        String description = parts[1].trim();
                        BigDecimal amount = new BigDecimal(parts[2].trim());

                        Transaction transaction = new Transaction();
                        transaction.setDate(date);
                        transaction.setDescription(description);
                        transaction.setAmount(amount.abs()); // Store amount as a positive number
                        // Determine type based on whether the amount is positive or negative
                        transaction.setType(amount.compareTo(BigDecimal.ZERO) >= 0 ? TransactionType.INCOME : TransactionType.EXPENSE);
                        transaction.setCategory("Uncategorized");
                        transaction.setUser(user);

                        createdTransactions.add(transaction);
                    } catch (Exception e) {
                        // Log the error or skip the malformed line
                        System.err.println("Could not parse line: " + line);
                    }
                }
            }
        }

        // Save all newly created transactions to the database in one go
        List<Transaction> savedTransactions = transactionRepository.saveAll(createdTransactions);

        return savedTransactions.stream()
                .map(TransactionResponse::fromTransaction)
                .collect(Collectors.toList());
    }
}
