import axios from 'axios';
import * as actionTypes from './ActionTypes';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper function that returns a thunk for handling API requests
const apiRequest = (requestType, successType, failureType, endpoint, params = {}) => async (dispatch) => {
  dispatch({ type: requestType });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    dispatch({ type: successType, payload: data });
    console.log(`Successfully fetched data for ${successType}:`, data);
  } catch (error) {
    console.error(`Error fetching data for ${failureType}:`, error);
    dispatch({ type: failureType, payload: error.message });
  }
};

// Action for Expenses by Category
export const getExpensesByCategory = (startDate, endDate) =>
  apiRequest(
    actionTypes.GET_EXPENSES_BY_CATEGORY_REQUEST,
    actionTypes.GET_EXPENSES_BY_CATEGORY_SUCCESS,
    actionTypes.GET_EXPENSES_BY_CATEGORY_FAILURE,
    '/api/analytics/expenses/by-category',
    { startDate, endDate }
  );

// Action for Income by Category
export const getIncomeByCategory = (startDate, endDate) =>
  apiRequest(
    actionTypes.GET_INCOME_BY_CATEGORY_REQUEST,
    actionTypes.GET_INCOME_BY_CATEGORY_SUCCESS,
    actionTypes.GET_INCOME_BY_CATEGORY_FAILURE,
    '/api/analytics/income/by-category',
    { startDate, endDate }
  );

// Action for Expenses by Date
export const getExpensesByDate = () =>
  apiRequest(
    actionTypes.GET_EXPENSES_BY_DATE_REQUEST,
    actionTypes.GET_EXPENSES_BY_DATE_SUCCESS,
    actionTypes.GET_EXPENSES_BY_DATE_FAILURE,
    '/api/analytics/expenses/by-date'
  );

// Action for Income by Date
export const getIncomeByDate = () =>
  apiRequest(
    actionTypes.GET_INCOME_BY_DATE_REQUEST,
    actionTypes.GET_INCOME_BY_DATE_SUCCESS,
    actionTypes.GET_INCOME_BY_DATE_FAILURE,
    '/api/analytics/income/by-date'
  );
