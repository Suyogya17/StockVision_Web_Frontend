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
        const response = await axios.post(
          "http://localhost:3000/api/order/createOrder",
          orderData
        );
        return response.data;
      } catch (error) {
        console.error("Order creation failed:", error);
        throw error; // Rethrow error for handling in the component
      }
    },
  });
};

// Place Order Hook
// const usePlaceOrder = () => {
//   return useMutation({
//     mutationFn: async (orderData: OrderPayload) => {
//       const { data } = await axios.post("/api/orders/createOrder", orderData);
//       return data;
//     },
//   });
// };
