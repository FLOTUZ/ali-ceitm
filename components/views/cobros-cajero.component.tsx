import Image from "next/image";
import Usuario from "../../assets/usuario.svg";
import LoaderComponent from "@/common/loader.component";
import ErrorComponent from "@/common/error.component";

import { VStack, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Persona } from "@prisma/client";
import { usePersonaSessionQuery } from "gql/generated/graphql";

const CobrosCajeroComponent = () => {
  const [currentPersona, setCurrentPersona] = useState<Persona | null>();
  const {
    data: data,
    loading: loading,
    error: error,
  } = usePersonaSessionQuery();

  useEffect(() => {
    if (data) {
      const p = data.currentPersona as Persona;
      setCurrentPersona(p);
    }
  }, [data]);

  if (loading) {
    <LoaderComponent />;
  }

  if (error) {
    <ErrorComponent message={error?.message!} />;
  }

  return (
    <VStack h="100vh" color={"white"} bgColor={"black"} padding="3rem">
      <Heading as={"h1"}>Perfil</Heading>

      <VStack h={"100%"} w="100%">
        <Image src={Usuario} alt="Perfil" height={150} width={150} />

        <Text textAlign={"center"} w="100%">
          {currentPersona?.nombres} {currentPersona?.a_paterno}{" "}
          {currentPersona?.a_materno}
        </Text>
      </VStack>
    </VStack>
  );
};

export default CobrosCajeroComponent;
