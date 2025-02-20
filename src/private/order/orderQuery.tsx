import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["GET_ORDERS"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/order/getAllOrder`
      );
      console.log("API Response:", response.data);
      return response.data.data ?? [];
    },
  });
};

export const usePlaceOrder = () => {
  return useMutation({
    mutationKey: ["CREATE_ORDER"],
    mutationFn: async (orderData: any) => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error(" No token found. Redirecting to login.");
          throw new Error("No token found. Please log in.");
        }

        console.log("📢 Token being sent in request:", token); // Debugging

        const response = await axios.post(
          "http://localhost:3000/api/order/createOrder",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Order creation failed:", error);
        throw error;
      }
    },
  });
};

// ========= find order by user id ==============================

export const useFindOrdersByCustomerId = (userId: string | null) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["GET_USER_ORDER", userId],
    queryFn: async () => {
      if (!token) throw new Error("No token found in localStorage");
      if (!userId) throw new Error("Customer ID is missing!");
      const response = await axios.get(
        `http://localhost:3000/api/order/getuserorders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Orders fetched from API:", response.data);

      return response.data;
    },
  });
};

// ========= delete order by user id ==============================

