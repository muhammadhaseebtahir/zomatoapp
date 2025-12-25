import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./authContext";
import { message } from "antd";

const DataContext = createContext();
export default function GetFoodContext({ children }) {
  const { isAuthenticated } = useAuthContext();
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const res = await axios.get("http://localhost:8000/reels", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("value", res.data.foodItems);
      setData(res.data.foodItems || []);
    } catch (err) {
      console.log("Error fetching data:", err.response?.data?.error);
      message.error(err.response?.data?.message || "Something went wrong.");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // console.log("Data",data)

  const reFetch = () => {
    fetchData();
  };

  return (
    <DataContext.Provider value={{ data, setData, reFetch }}>
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
