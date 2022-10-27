import Image from "next/image";
import Usuario from "../../assets/usuario.svg";
import LoaderComponent from "@/common/loader.component";
import ErrorComponent from "@/common/error.component";

import { VStack, Heading, Text } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Persona } from "@prisma/client";

const GET_PERSONA = gql`
  query GET_PERSONA {
    currentPersona {
      id
      nombres
      a_paterno
      a_materno
      carreraId
    }
  }
`;

const CobrosCajeroComponent = () => {
  const [currentPersona, setCurrentPersona] = useState<Persona>();
  const { data: data, loading: loading, error: error } = useQuery(GET_PERSONA);

  useEffect(() => {
    if (data) {
      setCurrentPersona(data.currentPersona);
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
