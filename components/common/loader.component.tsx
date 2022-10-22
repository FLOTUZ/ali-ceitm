import { Center, CircularProgress } from "@chakra-ui/react";

const LoaderComponent = () => {
  return (
    <Center h={"100vh"} bgColor="black">
      <CircularProgress isIndeterminate color="green" />
    </Center>
  );
};

export default LoaderComponent;
