package com.uday.service;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import com.uday.domain.TransactionType;
import com.uday.model.Transaction;
import com.uday.model.User;
import com.uday.repository.TransactionRepository;
import com.uday.repository.UserRepository;
import com.uday.response.TransactionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ReceiptServiceImpl implements ReceiptService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public TransactionResponse processReceipt(MultipartFile file, String username) throws IOException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        try (ImageAnnotatorClient vision = ImageAnnotatorClient.create()) {
            ByteString imgBytes = ByteString.copyFrom(file.getBytes());
            List<AnnotateImageRequest> requests = new ArrayList<>();
            Image img = Image.newBuilder().setContent(imgBytes).build();
            Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
            AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
            requests.add(request);

            BatchAnnotateImagesResponse response = vision.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            if (responses.isEmpty() || responses.get(0).getTextAnnotationsList().isEmpty()) {
                throw new IOException("Could not extract text from receipt.");
            }

            String fullText = responses.get(0).getFullTextAnnotation().getText();

            // Extract details using improved parsing logic
            BigDecimal totalAmount = extractTotalAmount(fullText);
            String vendorName = extractVendorName(fullText);
            LocalDate transactionDate = LocalDate.now(); // Date extraction is complex, using today for now.

            Transaction transaction = new Transaction();
            transaction.setDescription("Purchase from " + vendorName);
            transaction.setAmount(totalAmount);
            transaction.setDate(transactionDate);
            transaction.setCategory("Uncategorized");
            transaction.setType(TransactionType.EXPENSE);
            transaction.setUser(user);

            Transaction savedTransaction = transactionRepository.save(transaction);
            return TransactionResponse.fromTransaction(savedTransaction);
        }
    }

    /**
     * Extracts the total amount from the receipt text.
     * This version handles currency symbols and commas, and is more flexible with line breaks.
     */
    private BigDecimal extractTotalAmount(String text) {
        // This more flexible regex looks for "TOTAL" and then finds the first number-like value after it,
        // even across multiple lines. The (?s) flag allows '.' to match newline characters.
        Pattern pattern = Pattern.compile("(?is)TOTAL.*?([\\d,]+\\.\\d{2})");
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            try {
                // Get the matched number string, remove commas
                String amountString = matcher.group(1).replaceAll(",", "");
                return new BigDecimal(amountString);
            } catch (Exception e) {
                // Log the error in a real application
                System.err.println("Failed to parse amount: " + e.getMessage());
            }
        }
        return BigDecimal.ZERO;
    }

    /**
     * Extracts the vendor name from the receipt text.
     * This version tries to find the first meaningful line that isn't just "RECEIPT".
     */
    private String extractVendorName(String text) {
        if (text == null || text.isEmpty()) {
            return "Unknown Vendor";
        }
        // Split text into lines
        String[] lines = text.split("\n");
        // Find the first meaningful line that is not just "RECEIPT" or "INVOICE".
        for (String line : lines) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty() && !trimmedLine.equalsIgnoreCase("RECEIPT") && !trimmedLine.equalsIgnoreCase("INVOICE")) {
                return trimmedLine;
            }
        }
        return "Unknown Vendor";
    }
}
