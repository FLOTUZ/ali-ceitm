import { Center, CircularProgress } from "@chakra-ui/react";

const LoaderComponent = () => {
  return (
    <Center h={"100vh"}>
      <CircularProgress isIndeterminate color="blue" />
    </Center>
  );
};

export default LoaderComponent;
