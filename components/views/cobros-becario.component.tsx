import moment from "moment";

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
} from "@chakra-ui/react";
import { Cobro } from "@prisma/client";
import { useState, useEffect } from "react";
import { useCobrosBecarioQuery } from "gql/generated/graphql";
import CurrentPersonaComponent from "components/logic/current-persona.component";

const CobrosBecarioComponent = () => {
  const [cobrosRealizadosList, setCobrosRealizadosList] = useState<Cobro[]>();
  const [cobrosNORealizadosList, setCobrosNORealizadosList] =
    useState<Cobro[]>();

  const {
    data: data,
    loading: loading,
    error: error,
  } = useCobrosBecarioQuery();

  useEffect(() => {
    if (data) {
      setCobrosRealizadosList(data.cobrosRealizados as Cobro[]);
      setCobrosNORealizadosList(data.cobrosNoRealizados as Cobro[]);
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
      <Heading as={"h1"} w={"100%"}>Perfil</Heading>

      <VStack h={"100%"} w="100%">
        <CurrentPersonaComponent />

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
