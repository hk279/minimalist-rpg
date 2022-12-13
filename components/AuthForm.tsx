import { Button, Input, Stack, StackDivider } from "@chakra-ui/react";

const LoginForm = () => {
    return (
        <Stack divider={<StackDivider />} spacing={4}>
            <Stack spacing={2}>
                <Input maxLength={24} placeholder="Username" />
                <Input maxLength={24} placeholder="Password" type="password" />
            </Stack>
            <Button colorScheme="teal">Submit</Button>
        </Stack>
    );
};

export default LoginForm;