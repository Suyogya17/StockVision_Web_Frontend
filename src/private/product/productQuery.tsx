import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetList = () => {
  return useQuery({
    queryKey: ["GET_PRODUCT_LIST"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/product/getAllproduct");
      return res.data;
    },
  });
};

export const useSaveProduct = () => {
  return useMutation({
    mutationKey: ["SAVE_PRODUCT"],
    mutationFn: (formData: FormData) =>
      axios.post("http://localhost:3000/api/product/createProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: (id: string) =>
      axios.delete(`http://localhost:3000/api/product/${id}`),
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: ({ formData, productId }: { formData: FormData; productId: string }) =>
      axios.put(`http://localhost:3000/api/product/updateProduct/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  });
};
