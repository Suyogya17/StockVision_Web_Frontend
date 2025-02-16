import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["REGISTER_USER"],
    mutationFn: (data: {
      fName: string;
      lName: string;
      email: string;
      image: any;
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
      return axios.post("http://localhost:3000/api/auth/login", data);
    },
  });
};
