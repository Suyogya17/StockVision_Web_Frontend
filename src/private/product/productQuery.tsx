import { useMutation, useQuery } from "@tanstack/react-query";
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
//     mutationKey: ["Save_Product"],
//     mutationFn: (data) => {
//       productName: string;
// //       lName: string;
// //       email: string;
// //       image: any;
// //       phoneNo: string;
// //       username: string;
// //       address: string;
// //       password: string;
//       return axios.post("http://localhost:3000/api/product/createProduct", {
//         data,
//       });
//     },
//   });
// };

export const useSaveProduct = () => {
  return useMutation({
    mutationKey: ["SAVE_PRODUCT"],
    mutationFn: (formData: FormData) =>
      axios.post("http://localhost:3000/api/product/createProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  });
};
