import Link from "next/link";
import Image from "next/image";

import Usuario from "../../assets/usuario.svg";

import {
  Center,
  Container,
  Heading,
  VStack,
  Text,
  CircularProgress,
  Box,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import LoaderComponent from "@/common/loader.component";
import ErrorComponent from "@/common/error.component";
import { useEffect, useState } from "react";
import { Cobro, Persona } from "@prisma/client";
import moment from "moment";

const GET_CURRENT_PERSONA = gql`
  query GET_CURRENT_PERSONA {
    currentPersona {
      id
      nombres
      a_paterno
      a_materno
      carreraId
    }
  }
`;

const GET_COBROS_BECARIO = gql`
  query GET_COBROS {
    cobrosRealizados {
      id
      codigo_cobro
      forma_cobro
      was_forced
      fecha_cobro
      cafeteriaId
    }
  }
`;

function Perfil() {
  const [currentPersona, setCurrentPersona] = useState<Persona>();
  const [cobrosBecarioList, setCobrosBecarioList] = useState<Cobro[]>();

  const {
    data: dataPersona,
    loading: loadingPersona,
    error: personaError,
  } = useQuery(GET_CURRENT_PERSONA);

  const {
    data: dataCobrosBecario,
    loading: loadingCobrosBecario,
    error: cobrosBecarioError,
  } = useQuery(GET_COBROS_BECARIO);

  useEffect(() => {
    if (dataPersona) {
      setCurrentPersona(dataPersona.currentPersona);
    }
  }, [dataPersona]);

  useEffect(() => {
    if (dataCobrosBecario) {
      setCobrosBecarioList(dataCobrosBecario.cobrosRealizados);
    }
  }, [dataCobrosBecario]);

  if (loadingPersona) {
    <LoaderComponent />;
  }

  if (personaError) {
    <ErrorComponent message={personaError?.message!} />;
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

        <Heading as={"h3"}>Cobros efectuados</Heading>
        {loadingCobrosBecario ? (
          <CircularProgress />
        ) : (
          <>
            <TableContainer>
              <Table variant="unstyled">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>CODIGO</Th>
                    <Th>FORMA COBRO</Th>
                    <Th>FORZADO</Th>
                    <Th>FECHA COBRO</Th>
                  </Tr>
                </Thead>
                <Tbody textAlign={"center"}>
                  {cobrosBecarioList?.map((value, index) => (
                    <Tr key={index}>
                      <Td>{value.id}</Td>
                      <Td>{value.codigo_cobro}</Td>
                      <Td>{value.forma_cobro}</Td>
                      <Td>{value.was_forced ? "SI" : "NO"}</Td>
                      <Td>{moment(value.fecha_cobro).format("LLL")}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </VStack>
    </VStack>
  );
}

export default Perfil;
