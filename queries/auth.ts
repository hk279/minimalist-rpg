import axios from "../axios";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

type LoginInput = {
  username: string;
  password: string;
};

type SignUpInput = {
  username: string;
  password: string;
  // repeatPassword: string;
};

type UserDetails = {
  username: string;
  token: string;
};

export const useLogin = () => {
  const router = useRouter();
  const toast = useToast();

  return useMutation(
    (input: LoginInput) =>
      axios.post("/Auth/login", input).then((res) => res.data.data),
    {
      onSuccess: (data: UserDetails) => {
        localStorage.setItem("token", data.token);
        router.push("/");
        toast({ title: "Welcome " + data.username, status: "success" });
      },
      onError: () => {
        toast({ title: "Login failed", status: "error" });
      },
    }
  );
};

export const useSignUp = () => {
  const toast = useToast();

  return useMutation(
    (input: SignUpInput) => axios.post("/Auth/register", input),
    {
      onSuccess: () => {
        toast({ title: "User created", status: "success" });
      },
      onError: () => {
        toast({ title: "Sign up failed", status: "error" });
      },
    }
  );
};
