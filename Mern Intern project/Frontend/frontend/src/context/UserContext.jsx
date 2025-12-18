import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser, registerUser, fetchProfile } from "../api/auth";
import { fetchProducts } from "../api/products";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    {
      id: "TXN001",
      type: "Mobile Recharge",
      number: "9876543210",
      operator: "Airtel",
      amount: 299,
      status: "Success",
      date: "2024-12-20 14:30",
      method: "UPI",
    },
    {
      id: "TXN002",
      type: "DTH Recharge",
      number: "1234567890",
      operator: "Tata Sky",
      amount: 499,
      status: "Success",
      date: "2024-12-19 10:15",
      method: "Debit Card",
    },
    {
      id: "TXN003",
      type: "Electricity Bill",
      number: "EB123456789",
      operator: "BESCOM",
      amount: 2450,
      status: "Success",
      date: "2024-12-18 16:45",
      method: "Net Banking",
    },
    {
      id: "TXN004",
      type: "Mobile Recharge",
      number: "9876543210",
      operator: "Jio",
      amount: 199,
      status: "Failed",
      date: "2024-12-17 09:20",
      method: "UPI",
    },
    {
      id: "TXN005",
      type: "Water Bill",
      number: "WB987654321",
      operator: "Bangalore Water Supply",
      amount: 850,
      status: "Success",
      date: "2024-12-16 11:30",
      method: "Credit Card",
    },
  ]);

  const [userStats, setUserStats] = useState({
    totalRecharges: 0,
    totalSpent: 0,
    thisMonth: 0,
    savedAmount: 245,
    lastRecharge: null,
  });

  const [token, setToken] = useState(localStorage.getItem("livpay_token"));
  const [user, setUser] = useState(
    localStorage.getItem("livpay_user")
      ? JSON.parse(localStorage.getItem("livpay_user"))
      : null
  );
  const [products, setProducts] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);

  const persistUser = (userData) => {
    if (!userData) return;
    setUser(userData);
    localStorage.setItem("livpay_user", JSON.stringify(userData));
  };

  const clearSession = () => {
    localStorage.removeItem("livpay_token");
    localStorage.removeItem("livpay_user");
    setToken(null);
    setUser(null);
    setProducts([]);
  };

  useEffect(() => {
    const successfulTransactions = transactions.filter(
      (t) => t.status === "Success"
    );
    const totalSpent = successfulTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthTransactions = successfulTransactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });
    const thisMonthSpent = thisMonthTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const lastTransaction = successfulTransactions.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )[0];

    setUserStats({
      totalRecharges: successfulTransactions.length,
      totalSpent,
      thisMonth: thisMonthSpent,
      savedAmount: Math.floor(totalSpent * 0.02),
      lastRecharge: lastTransaction ? lastTransaction.date.split(" ")[0] : null,
    });
  }, [transactions]);

  const refreshProducts = useCallback(async (authToken = token) => {
    if (!authToken) return;
    try {
      setProductsLoading(true);
      const data = await fetchProducts(authToken);
      setProducts(data);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setProductsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refreshProducts(token);
    }
  }, [token, refreshProducts]);

  useEffect(() => {
    if (!token || user) {
      return;
    }
    const restoreSession = async () => {
      try {
        const profile = await fetchProfile(token);
        // Validate profile has required fields
        if (profile && profile.id && profile.username) {
          setUser(profile);
          localStorage.setItem("livpay_user", JSON.stringify(profile));
        } else {
          // Invalid profile - clear everything
          throw new Error("Invalid user profile");
        }
      } catch (error) {
        console.error("Failed to restore session", error);
        // Clear all invalid data
        localStorage.removeItem("livpay_token");
        localStorage.removeItem("livpay_user");
        setToken(null);
        setUser(null);
        setProducts([]);
      }
    };
    restoreSession();
  }, [token, user]);

  const login = async (loginIdentifier, password) => {
    try {
      setAuthLoading(true);
      setAuthError("");
      
      // Send login request with identifier (username, email, or phone)
      const data = await loginUser({ 
        identifier: loginIdentifier, 
        password 
      });
      
      setToken(data.token);
      localStorage.setItem("livpay_token", data.token);
      
      if (data.user) {
        persistUser(data.user);
      } else {
        const profile = await fetchProfile(data.token);
        persistUser(profile);
      }
      
      await refreshProducts(data.token);
      return data;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (payload) => {
    try {
      setAuthLoading(true);
      setAuthError("");
      
      // Register the user
      const data = await registerUser(payload);
      
      // Validate registration response
      if (!data || !data.success) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }
      
      // Auto-login after successful registration
      try {
        await login(payload.username || payload.email, payload.password);
      } catch (err) {
        console.warn("Auto-login after register failed:", err.message);
        // Don't throw - registration was successful, user can login manually
      }

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.message || "Registration failed. Please try again.";
      setAuthError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: `TXN${String(transactions.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      status: "Success",
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  const getRecentTransactions = (limit = 5) => {
    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const getMonthlyData = () => {
    const monthlySpending = {};
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    transactions.forEach((transaction) => {
      if (transaction.status === "Success") {
        const date = new Date(transaction.date);
        const monthKey = months[date.getMonth()];
        monthlySpending[monthKey] =
          (monthlySpending[monthKey] || 0) + transaction.amount;
      }
    });

    return months.slice(-5).map((month) => ({
      month,
      amount: monthlySpending[month] || 0,
    }));
  };

  return (
    <UserContext.Provider value={{
      transactions,
      userStats,
      addTransaction,
      getRecentTransactions,
      getMonthlyData,
      login,
      register,
      logout,
      token,
      user,
      authLoading,
      authError,
      products,
      productsLoading,
      refreshProducts,
    }}>
      {children}
    </UserContext.Provider>
  );
};