// src/contexts/PaymentContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// =======================
// 1️⃣ Cấu hình API
// =======================
const API = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

// =======================
// 2️⃣ Khai báo Initial State
// =======================
const initialState = {
  payments: [],
  filteredPayments: [],
  isLoading: false,
  error: null,
  filter: {
    search: "",
    semester: "",
    course: "",
    sortBy: "date_desc",
  },
  totalAmount: 0,
};

// =======================
// 3️⃣ Reducer
// =======================
const paymentReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        payments: action.payload,
        filteredPayments: action.payload,
        totalAmount: action.payload.reduce((sum, p) => sum + p.amount, 0),
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };

    case "ADD_PAYMENT":
      const newList = [...state.payments, action.payload];
      return {
        ...state,
        payments: newList,
        filteredPayments: newList,
        totalAmount: newList.reduce((sum, p) => sum + p.amount, 0),
      };

    case "UPDATE_PAYMENT":
      const updated = state.payments.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
      return {
        ...state,
        payments: updated,
        filteredPayments: updated,
        totalAmount: updated.reduce((sum, p) => sum + p.amount, 0),
      };

    case "DELETE_PAYMENT":
      const remaining = state.payments.filter((p) => p.id !== action.payload);
      return {
        ...state,
        payments: remaining,
        filteredPayments: remaining,
        totalAmount: remaining.reduce((sum, p) => sum + p.amount, 0),
      };

    case "SET_FILTER":
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case "APPLY_FILTER_SORT":
      let result = [...state.payments];

      // Search
      if (state.filter.search) {
        const s = state.filter.search.toLowerCase();
        result = result.filter(
          (p) =>
            p.semester.toLowerCase().includes(s) ||
            p.courseName.toLowerCase().includes(s)
        );
      }

      // Filter by semester
      if (state.filter.semester) {
        result = result.filter(
          (p) => p.semester === state.filter.semester
        );
      }

      // Filter by course
      if (state.filter.course) {
        result = result.filter(
          (p) => p.courseName === state.filter.course
        );
      }

      // Sorting
      switch (state.filter.sortBy) {
        case "course_asc":
          result.sort((a, b) =>
            a.courseName.localeCompare(b.courseName)
          );
          break;
        case "course_desc":
          result.sort((a, b) =>
            b.courseName.localeCompare(a.courseName)
          );
          break;
        case "date_asc":
          result.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "date_desc":
          result.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "amount_asc":
          result.sort((a, b) => a.amount - b.amount);
          break;
        case "amount_desc":
          result.sort((a, b) => b.amount - a.amount);
          break;
        default:
          break;
      }

      return {
        ...state,
        filteredPayments: result,
        totalAmount: result.reduce((sum, p) => sum + p.amount, 0),
      };

    default:
      return state;
  }
};

// =======================
// 4️⃣ Tạo Context
// =======================
const PaymentContext = createContext();

// =======================
// 5️⃣ Provider
// =======================
export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  // Hàm lấy danh sách payments
  const fetchPayments = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await API.get("/payments");
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // CRUD
  const addPayment = async (payment) => {
    try {
      const res = await API.post("/payments", payment);
      dispatch({ type: "ADD_PAYMENT", payload: res.data });
    } catch (err) {
      alert("Add payment failed!");
    }
  };

  const updatePayment = async (id, updatedPayment) => {
    try {
      const res = await API.put(`/payments/${id}`, updatedPayment);
      dispatch({ type: "UPDATE_PAYMENT", payload: res.data });
    } catch (err) {
      alert("Update payment failed!");
    }
  };

  const deletePayment = async (id) => {
    try {
      await API.delete(`/payments/${id}`);
      dispatch({ type: "DELETE_PAYMENT", payload: id });
    } catch (err) {
      alert("Delete payment failed!");
    }
  };

  // Lọc và sắp xếp
  const setFilter = (filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
    dispatch({ type: "APPLY_FILTER_SORT" });
  };

  // Tự động tải dữ liệu lần đầu
  useEffect(() => {
    fetchPayments();
  }, []);

  const contextValue = {
    ...state,
    fetchPayments,
    addPayment,
    updatePayment,
    deletePayment,
    setFilter,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

// =======================
// 6️⃣ Hook tùy chỉnh
// =======================
export const usePayment = () => useContext(PaymentContext);
