import { Button, Divider, Input, Stack } from "@chakra-ui/react";

const LoginForm = () => {
    return (
        <Stack spacing={4} height={250} justifyContent="center">
            <Input maxLength={24} placeholder="Username" />
            <Input maxLength={24} placeholder="Password" type="password" />

            <Divider />

            <Button colorScheme="teal">Login</Button>
        </Stack>
    );
};

export default LoginForm;