import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../api";

export const Prac = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const token = await getToken();

        const { data } = await api.get("/api/user/getuserCreation", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response:", token,data);
      } catch (error) {
        console.error("AError:", error.response?.data || error.message);
      }
    };

    getDashboardData();
  }, []); 

  return <div>hello this is title page</div>;
};
