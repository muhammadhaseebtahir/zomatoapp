import { message } from "antd";
import axios from "axios";
import React, {
  useReducer,
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Auth = createContext();
const initialState = {
  user: {},
  isAuthenticated: false,
  role: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        role: payload.role,
      };
    case "SET_LOGOUT":
      return { isAuthenticated: false, user: {}, role: "" };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const navigate = useNavigate();
 
  const handleLogout = useCallback(() => {
    try {
      dispatch({ type: "SET_LOGOUT" });
      localStorage.removeItem("token");
      message.success("Successfully Logout.");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log("Logout error", err);
      message.error("Something went wrong while logging out");
    }
  }, [dispatch, navigate]);

  const fetchUser = useCallback(async () => {
    //  setIsAppLoading(true)
    try {
      const res = await axios.get("http://localhost:8000/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        const userData = res.data.user;
        if (!userData || !userData.role) {
          console.log("User not found or role missing");
          handleLogout();
          return;
        }
        if (
          userData.role.includes("user") ||
          userData.role.includes("admin") ||
          userData.role.includes("superAdim")
        ) {
          dispatch({
            type: "SET_LOGIN",
            payload: { user: userData, role: userData.role },
          });
        }
        // navigate("/blog")
      } else {
        handleLogout();
      }
    } catch (err) {
      console.log("Fetch user", err.response?.data?.error);
        // console.log(err.response?.data?.message || "Something went wrong.");
      dispatch({ type: "SET_LOGOUT" });
      message.error("Session expired, please login again.");
      navigate("/auth/login");
      localStorage.removeItem("token");
    } finally {
      setIsAppLoading(false);
    }
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        message.error("Session expired, please log in again.");
        handleLogout();
      }
    } catch (err) {
      console.log("Token decode error:", err);
      handleLogout();
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5000);
    const fetchTokenAndFindUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await fetchUser();
      } else {
        setIsAppLoading(false);
      }
    };

    fetchTokenAndFindUser();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Auth.Provider
      value={{
        ...state,
        isAppLoading,
        setIsAppLoading,
        dispatch,
        fetchUser,
        handleLogout,
      }}
    >
      {children}
    </Auth.Provider>
  );
}

export const useAuthContext = () => useContext(Auth);
