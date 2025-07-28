package com.uday.service;

import com.uday.response.TransactionResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PdfService {

//     Extracts transactions from an uploaded PDF file and saves them for the user.
//     @param file The uploaded PDF statement.
//     @param username The username of the user who uploaded the file.
//     @return A list of TransactionResponse DTOs for the created transactions.
//     @throws IOException If there is an error reading the PDF file.
    List<TransactionResponse> processPdfStatement(MultipartFile file, String username) throws IOException;
}
