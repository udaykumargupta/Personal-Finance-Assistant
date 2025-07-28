package com.uday.service;

import com.uday.response.TransactionResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ReceiptService {


    //Processes an uploaded receipt file, extracts transaction details,and saves it for the user.
    //     @param file The uploaded receipt file (image or PDF).
    //     @param username The username of the user who uploaded the receipt.
    //     @return A TransactionResponse DTO of the created transaction.
    //     @throws IOException If there is an error reading the file.

    TransactionResponse processReceipt(MultipartFile file, String username) throws IOException;
}
