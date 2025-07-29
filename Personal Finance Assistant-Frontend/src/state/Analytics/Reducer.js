import * as actionTypes from './ActionTypes';

const initialState = {
  expensesByCategory: [],
  incomeByCategory: [],
  expensesByDate: [],
  incomeByDate: [],
  loading: false,
  error: null,
};

export const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request cases
    case actionTypes.GET_EXPENSES_BY_CATEGORY_REQUEST:
    case actionTypes.GET_INCOME_BY_CATEGORY_REQUEST:
    case actionTypes.GET_EXPENSES_BY_DATE_REQUEST:
    case actionTypes.GET_INCOME_BY_DATE_REQUEST:
      return { ...state, loading: true, error: null };

    // Success cases
    case actionTypes.GET_EXPENSES_BY_CATEGORY_SUCCESS:
      return { ...state, loading: false, expensesByCategory: action.payload };
    case actionTypes.GET_INCOME_BY_CATEGORY_SUCCESS:
      return { ...state, loading: false, incomeByCategory: action.payload };
    case actionTypes.GET_EXPENSES_BY_DATE_SUCCESS:
      return { ...state, loading: false, expensesByDate: action.payload };
    case actionTypes.GET_INCOME_BY_DATE_SUCCESS:
      return { ...state, loading: false, incomeByDate: action.payload };

    // Failure cases
    case actionTypes.GET_EXPENSES_BY_CATEGORY_FAILURE:
    case actionTypes.GET_INCOME_BY_CATEGORY_FAILURE:
    case actionTypes.GET_EXPENSES_BY_DATE_FAILURE:
    case actionTypes.GET_INCOME_BY_DATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
