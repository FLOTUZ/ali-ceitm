import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import Image from "next/image";

import Usuario from "../../assets/usuario.svg";

import { Avatar, Text, VStack } from "@chakra-ui/react";
import { Persona } from "@prisma/client";
import { usePersonaSessionQuery } from "gql/generated/graphql";
import { useState, useEffect } from "react";

const CurrentPersonaComponent = () => {
  const [currentPersona, setCurrentPersona] = useState<Persona>();

  const {
    data: data,
    loading: loading,
    error: error,
  } = usePersonaSessionQuery();

  useEffect(() => {
    if (data) {
      setCurrentPersona(data.currentPersona as Persona);
    }
  }, [data]);

  if (loading) {
    <LoaderComponent />;
  }

  if (error) {
    <ErrorComponent message={error?.message!} />;
  }

  return (
    <>
      <VStack h={"100%"} w="100%">
        <Avatar
          size="2xl"
          bg="red.500"
          name={`${currentPersona?.nombres} ${currentPersona?.a_paterno}`}
          src=""
        />

        <Text textAlign={"center"} w="100%" color={"white"}>
          {currentPersona?.nombres} {currentPersona?.a_paterno}{" "}
          {currentPersona?.a_materno}
        </Text>
      </VStack>
    </>
  );
};

export default CurrentPersonaComponent;
