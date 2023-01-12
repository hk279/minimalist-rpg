import { CardBody, CardHeader } from "@chakra-ui/card";
import { Card, Center, Heading, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import LoginForm from "../components/pages/auth/AuthForm";

const Register = () => {
    return (
        <Center height="100vh" bgColor="teal.50">
            <Card width="96" align="center" shadow="2xl" bgColor="white" paddingTop={4}>
                <CardHeader textAlign="center" paddingBottom={0}>
                    <Heading size="md">Welcome to minimalist-rpg</Heading>
                </CardHeader>

                <CardBody>
                    <Tabs align="center">
                        <TabList>
                            <Tab>Login</Tab>
                            <Tab>Register</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <LoginForm />
                            </TabPanel>

                            <TabPanel>
                                <LoginForm />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>
        </Center>
    );
};

export default Register;