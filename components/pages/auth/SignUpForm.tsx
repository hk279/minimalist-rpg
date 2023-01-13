import { Button, Divider, Input, Stack } from "@chakra-ui/react";

const SignUpForm = () => {
    return (
        <Stack spacing={4} height={250} justifyContent="center">
            <Input maxLength={24} placeholder="Username" />
            <Input maxLength={24} placeholder="Password" type="password" />
            <Input maxLength={24} placeholder="Repeat Password" type="password" />

            <Divider />

            <Button colorScheme="teal">Sign Up</Button>
        </Stack>
    );
};

export default SignUpForm;