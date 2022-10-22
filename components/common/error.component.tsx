import {
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

interface IErrorProps {
  errorCode?: string;
  message: string;
}

const ErrorComponent = ({ errorCode, message }: IErrorProps) => {
  return (
    <>
      <Center bgColor={"black"} h="100vh">
        <Container color={"gray"} bgColor={"black"}>
          <SimpleGrid columns={[1, 2]}>
            <Heading as={"h3"}>{errorCode ? errorCode : "ERROR"}</Heading>
            <Text>{message}</Text>
          </SimpleGrid>
          <Spacer h={"2rem"} />
          <Button colorScheme={"whiteAlpha"}>
            <Link href={"/"}>
              <a>REGRESAR</a>
            </Link>
          </Button>
        </Container>
      </Center>
    </>
  );
};

export default ErrorComponent;
