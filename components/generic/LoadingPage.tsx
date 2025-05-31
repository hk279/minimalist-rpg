import { Center, Spinner } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Center bgColor="teal.50" height="100vh" width="100%">
      <Spinner size="xl" color="teal.500" thickness="4px" />
    </Center>
  );
};

export default LoadingPage;
