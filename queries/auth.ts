import { useToast } from "@chakra-ui/react";
import axios from "../axios";
import { useMutation } from "react-query";
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

const useAuth = () => {
    const router = useRouter();
    const toast = useToast();

    const { mutate: login, isLoading: isAuthenticating, isSuccess: isLoginSuccess } =
        useMutation<UserDetails, Error, LoginInput>(
            (input: LoginInput) => axios.post('/Auth/login', input).then(res => res.data.data),
            {
                onSuccess: (data) => {
                    toast({ title: "Welcome " + data.username, status: "success" });
                    localStorage.setItem("token", data.token);
                    router.push("/");
                },
                onError: () => {
                    toast({ title: "Login failed", status: "error" });
                }
            }
        );

    const { mutate: signUp } = useMutation<
        number,
        Error,
        SignUpInput
    >((input: SignUpInput) => axios.post('/Auth/register', input),
        {
            onSuccess: () => {
                toast({ title: "User created", status: "success" });
            },
            onError: () => {
                toast({ title: "Sign up failed", status: "error" });
            }
        });

    return { login, isAuthenticating, isLoginSuccess, signUp };
};

export default useAuth;