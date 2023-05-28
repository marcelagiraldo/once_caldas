import axios from "axios";
import { useEffect, useState } from "react";

export const GetUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/admins");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return data;
};
