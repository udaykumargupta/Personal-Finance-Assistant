import * as actionTypes from './ActionTypes';

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    // All request actions will set loading to true
    case actionTypes.CREATE_TRANSACTION_REQUEST:
    case actionTypes.GET_TRANSACTIONS_REQUEST:
    case actionTypes.UPLOAD_PDF_REQUEST:
    case actionTypes.UPLOAD_RECEIPT_REQUEST:
      return { ...state, loading: true, error: null };

    // Success actions
    case actionTypes.CREATE_TRANSACTION_SUCCESS:
      // Add the new transaction to the beginning of the list
      return {
        ...state,
        loading: false,
        transactions: [action.payload, ...state.transactions],
      };
    
    case actionTypes.GET_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };

    case actionTypes.UPLOAD_PDF_SUCCESS:
      // Add multiple new transactions from the PDF to the list
      return {
        ...state,
        loading: false,
        transactions: [...action.payload, ...state.transactions],
      };

    case actionTypes.UPLOAD_RECEIPT_SUCCESS:
      // Add the single new transaction from the receipt
      return {
        ...state,
        loading: false,
        transactions: [action.payload, ...state.transactions],
      };

    // All failure actions will set the error message
    case actionTypes.CREATE_TRANSACTION_FAILURE:
    case actionTypes.GET_TRANSACTIONS_FAILURE:
    case actionTypes.UPLOAD_PDF_FAILURE:
    case actionTypes.UPLOAD_RECEIPT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
