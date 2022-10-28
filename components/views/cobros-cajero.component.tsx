import ErrorComponent from "@/common/error.component";

import {
  VStack,
  Heading,
  CircularProgress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Cobro } from "@prisma/client";
import { useCobrosCajeroQuery } from "gql/generated/graphql";
import moment from "moment";
import CurrentPersonaComponent from "components/logic/current-persona.component";

const CobrosCajeroComponent = () => {
  const [cobrosList, setCobrosList] = useState<Cobro[]>([]);

  const {
    data: dataCobros,
    loading: loadingCobros,
    error: errorCobros,
  } = useCobrosCajeroQuery({});

  useEffect(() => {
    if (dataCobros) {
      setCobrosList(dataCobros.cobrosRegistradosPorCajero as Cobro[]);
    }
  }, [dataCobros]);

  if (errorCobros) {
    <ErrorComponent message={errorCobros?.message!} />;
  }

  return (
    <VStack h="100vh" color={"white"} bgColor={"black"} padding="3rem">
      <Heading as={"h1"}>Perfil</Heading>

      <VStack h={"100%"} w="100%">
        <CurrentPersonaComponent />

        {loadingCobros ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table variant="unstyled">
              <Thead>
                <Tr>
                  <Th>ID COBRO</Th>
                  <Th>ID BECARIO</Th>
                  <Th>CODIGO</Th>
                  <Th>GENERADO</Th>
                  <Th>COBRADO EN CAJA</Th>
                </Tr>
              </Thead>
              <Tbody textAlign={"center"}>
                {cobrosList?.map((value, index) => (
                  <Tr key={index}>
                    <Td>{value.id}</Td>
                    <Td>{value.becarioId}</Td>
                    <Td>{value.codigo_cobro}</Td>
                    <Td>
                      {moment(value.fecha_cobro).startOf("hour").fromNow()}
                    </Td>
                    <Td>{moment(value.updatedAt).format("LLLL")}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
    </VStack>
  );
};

export default CobrosCajeroComponent;
