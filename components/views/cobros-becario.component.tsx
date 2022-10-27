import Image from "next/image";
import moment from "moment";
import Usuario from "../../assets/usuario.svg";

import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import {
  VStack,
  Heading,
  CircularProgress,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from "@chakra-ui/react";
import { Persona, Cobro } from "@prisma/client";
import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const GET_COBROS_BECARIO = gql`
  query GET_COBROS {
    currentPersona {
      id
      nombres
      a_paterno
      a_materno
      carreraId
    }

    cobrosRealizados {
      id
      codigo_cobro
      forma_cobro
      was_forced
      fecha_cobro
      cafeteriaId
      createdAt
    }

    cobrosNoRealizados {
      id
      codigo_cobro
      forma_cobro
      was_forced
      fecha_cobro
      cafeteriaId
      createdAt
    }
  }
`;

const CobrosBecarioComponent = () => {
  const [currentPersona, setCurrentPersona] = useState<Persona>();
  const [cobrosRealizadosList, setCobrosRealizadosList] = useState<Cobro[]>();
  const [cobrosNORealizadosList, setCobrosNORealizadosList] =
    useState<Cobro[]>();

  const {
    data: data,
    loading: loading,
    error: error,
  } = useQuery(GET_COBROS_BECARIO);

  useEffect(() => {
    if (data) {
      setCobrosRealizadosList(data.cobrosRealizados);
      setCobrosNORealizadosList(data.cobrosNoRealizados);
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

        <Heading as={"h3"}>Cobros efectuados</Heading>
        {loading ? (
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
                  {cobrosRealizadosList?.map((value, index) => (
                    <Tr key={index}>
                      <Td>{value.id}</Td>
                      <Td>{value.codigo_cobro}</Td>
                      <Td>{value.forma_cobro}</Td>
                      <Td>{value.was_forced ? "SI" : "NO"}</Td>
                      <Td>
                        {moment(value.fecha_cobro).startOf("hour").fromNow()}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* COBROS NO RELIZADOS POR BECARIO */}

        <Heading as={"h3"}>Cobros NO efectuados</Heading>
        {loading ? (
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
                    <Th>GENERADO</Th>
                  </Tr>
                </Thead>
                <Tbody textAlign={"center"}>
                  {cobrosNORealizadosList?.map((value, index) => (
                    <Tr key={index}>
                      <Td>{value.id}</Td>
                      <Td>{value.codigo_cobro}</Td>
                      <Td>
                        {value.forma_cobro == null
                          ? "AUN NO COBRADO"
                          : value.forma_cobro}
                      </Td>
                      <Td>{value.was_forced ? "SI" : "NO"}</Td>
                      <Td>
                        {moment(value.createdAt).startOf("hour").fromNow()}
                      </Td>
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
};

export default CobrosBecarioComponent;
