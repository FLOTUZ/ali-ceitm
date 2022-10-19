import { useRouter } from "next/router";
import { Button, Center, SimpleGrid } from "@chakra-ui/react";

const Alumnos = () => {
  const router = useRouter();
  const botones = [
    {
      nombre: "Cobrador",
      ruta: "/cobrador",
    },
  ];

  return (
    <Center height={"100vh"}>
      <SimpleGrid columns={2} spacing={10}>
        <Button h={100} w={100} bgColor={"black"} color="white">
          Cobrador
        </Button>
      </SimpleGrid>
    </Center>
  );
};

export default Alumnos;
