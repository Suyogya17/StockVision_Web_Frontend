import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (data: {
      fName: string;
      lName: string;
      email: string;
      image: string;
      phoneNo: string;
      username: string;
      address: string;
      password: string;
    }) => axios.post("http://localhost:3000/api/auth/register", data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (data: { username: string; password: string }) => {
      // Clear old token before making the request
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      return axios
        .post("http://localhost:3000/api/auth/login", data)
        .then((response) => {
          // Save new token after successful login
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.cred._id); // Assuming 'cred._id' is the user ID
          return response;
        });
    },
  });
};

// ================================== Update user ================================

export const useUserUpdate = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: (data: { formData: FormData; customerId: string }) => {
      const token = localStorage.getItem("token"); // Get token from storage
      return axios.put(
        `http://localhost:3000/api/auth/updateUser/${data.customerId}`,
        data.formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );
    },
  });
};

export const useGetUserProfile = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["GET_USER_PROFILE"],
    queryFn: async () => {
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const response = await axios.get(
        `http://localhost:3000/api/auth/userfindbyid`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Token being passed to API:", token);

      return response.data;
    },
  });
};
