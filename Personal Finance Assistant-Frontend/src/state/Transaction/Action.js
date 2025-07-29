import axios from 'axios';
import * as actionTypes from './ActionTypes';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Action to create a single transaction
export const createTransaction = (transactionData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_TRANSACTION_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.post(`${API_BASE_URL}/api/transactions`, transactionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: actionTypes.CREATE_TRANSACTION_SUCCESS, payload: data });
    console.log("Created transaction:", data);
  } catch (error) {
    console.error("Error creating transaction:", error);
    dispatch({ type: actionTypes.CREATE_TRANSACTION_FAILURE, payload: error.message });
  }
};

// Action to get a list of transactions with optional filters
export const getTransactions = (filters = {}) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_TRANSACTIONS_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(`${API_BASE_URL}/api/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
      params: filters, // Pass filters as query parameters
    });
    dispatch({ type: actionTypes.GET_TRANSACTIONS_SUCCESS, payload: data });
    console.log("Fetched transactions:", data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    dispatch({ type: actionTypes.GET_TRANSACTIONS_FAILURE, payload: error.message });
  }
};

// Action to upload a PDF statement
export const uploadPdfStatement = (file) => async (dispatch) => {
  dispatch({ type: actionTypes.UPLOAD_PDF_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post(`${API_BASE_URL}/api/transactions/upload-pdf`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: actionTypes.UPLOAD_PDF_SUCCESS, payload: data });
    console.log("PDF processed transactions:", data);
  } catch (error) {
    console.error("Error uploading PDF:", error);
    dispatch({ type: actionTypes.UPLOAD_PDF_FAILURE, payload: error.message });
  }
};

// Action to upload a receipt image
export const uploadReceipt = (file) => async (dispatch) => {
  dispatch({ type: actionTypes.UPLOAD_RECEIPT_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post(`${API_BASE_URL}/api/transactions/upload-receipt`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: actionTypes.UPLOAD_RECEIPT_SUCCESS, payload: data });
    console.log("Receipt processed transaction:", data);
  } catch (error) {
    console.error("Error uploading receipt:", error);
    dispatch({ type: actionTypes.UPLOAD_RECEIPT_FAILURE, payload: error.message });
  }
};
