import { Button, Divider, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useLogin } from "../../queries/auth";

const LoginForm = () => {
  const { mutate: login, isLoading } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack spacing={4} height={250} justifyContent="center">
      <Input
        maxLength={24}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        maxLength={24}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Divider />

      <Button
        colorScheme="teal"
        onClick={() => login({ username, password })}
        isLoading={isLoading}
      >
        Login
      </Button>
    </Stack>
  );
};

export default LoginForm;
