import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";

interface IErrorProps {
  errorCode?: string;
  message: string;
  children?: React.ReactNode;
}

const ErrorComponent = ({ errorCode, message, children }: IErrorProps) => {
  return (
    <>
      <Center h="100vh">
        <Container color={"gray"}>
          <SimpleGrid columns={[1, 2]}>
            <Heading as={"h3"}>{errorCode ? errorCode : "ERROR"}</Heading>
            <Text>{message}</Text>
            {children}
          </SimpleGrid>
          <Spacer h={"2rem"} />
        </Container>
      </Center>
    </>
  );
};

export default ErrorComponent;
