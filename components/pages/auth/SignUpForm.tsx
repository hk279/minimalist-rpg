import { Button, Divider, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useSignUp } from "../../../queries/auth";

const SignUpForm = () => {
    const { mutate: signUp, isLoading } = useSignUp();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Stack spacing={4} height={250} justifyContent="center">
            <Input maxLength={24} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input maxLength={24} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input maxLength={24} placeholder="Repeat Password" type="password" disabled />

            <Divider />

            <Button colorScheme="teal" onClick={() => signUp({ username, password })} isLoading={isLoading}>Sign Up</Button>
        </Stack>
    );
};

export default SignUpForm;