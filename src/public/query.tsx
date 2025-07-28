import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// ======================= REGISTER ==========================
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
    }) => axios.post("https://localhost:3000/api/auth/register", data),
  });
};

// ======================= LOGIN ==========================
export const useLogin = () => {
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (data: { email: string; password: string }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("email");

      return axios
        .post("https://localhost:3000/api/auth/login", data)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.user._id);
          localStorage.setItem("email", response.data.user.email);
          return response;
        });
    },
  });
};

// ======================= VERIFY OTP ==========================
export const useVerifyOTP = () => {
  return useMutation({
    mutationKey: ["VERIFY_OTP"],
    mutationFn: async (data: { email: string; otp: string }) => {
      const response = await axios.post(
        "https://localhost:3000/api/auth/verify-otp",
        data
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", data.email);
      return response.data;
    },
  });
};

// ======================= UPDATE USER ==========================
export const useUserUpdate = () => {
  return useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: (data: { formData: FormData; customerId: string }) => {
      const token = localStorage.getItem("token");
      return axios.put(
        `https://localhost:3000/api/auth/updateUser/${data.customerId}`,
        data.formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });
};

// ======================= GET USER PROFILE ==========================
export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["GET_USER_PROFILE"],
    enabled: !!localStorage.getItem("token"),
    queryFn: async () => {
      const token = localStorage.getItem("token");

      // ✅ Debug print the token being sent
      console.log("TOKEN BEING SENT:", token);

      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await axios.get(
        "https://localhost:3000/api/auth/userfindbyid",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.user;
    },
  });
};


// ======================= GET ALL USERS ==========================
export const useGetUser = () => {
  return useQuery({
    queryKey: ["GET_USER_LIST"],
    queryFn: async () => {
      const response = await axios.get(
        "https://localhost:3000/api/auth/getAllUser"
      );
      return response.data;
    },
  });
};

// ======== forget password =========

export const useForgotPassword = () => {
  return {
    forgotPassword: async (email: string) => {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://localhost:3000/api/auth/forgot-password",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token
          },
        }
      );

      return res.data;
    },
    isLoading: false,
    error: null,
    message: null,
  };
};



