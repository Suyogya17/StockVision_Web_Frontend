import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetList = () => {
  return useQuery({
    queryKey: ["GET_PRODUCT_LIST"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/product/getAllproduct"
      );
      return response.data;
    },
  });
};

// export const useSaveProduct = () => {
//   return useMutation({
//     mutationKey: ["SAVE_PRODUCT_LIST"],
//     mutationFn: () => {
//       return axios.post("http://localhost:3000/api/product/createProduct");
//     },
//   });
// };
