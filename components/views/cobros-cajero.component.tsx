import Image from "next/image";
import Usuario from "../../assets/usuario.svg";
import LoaderComponent from "@/common/loader.component";
import ErrorComponent from "@/common/error.component";

import {
  VStack,
  Heading,
  Text,
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
import { Cobro, Persona } from "@prisma/client";
import {
  useCobrosCajeroQuery,
  usePersonaSessionQuery,
} from "gql/generated/graphql";
import moment from "moment";

const CobrosCajeroComponent = () => {
  const [currentPersona, setCurrentPersona] = useState<Persona | null>();
  const [cobrosList, setCobrosList] = useState<Cobro[]>([]);
  const {
    data: dataPersona,
    loading: loadingPersona,
    error: errorPersona,
  } = usePersonaSessionQuery();

  const {
    data: dataCobros,
    loading: loadingCobros,
    error: errorCobros,
  } = useCobrosCajeroQuery({});

  useEffect(() => {
    if (dataPersona) {
      setCurrentPersona(dataPersona.currentPersona as Persona);
    }

    if (dataCobros) {
      setCobrosList(dataCobros.cobrosRegistradosPorCajero as Cobro[]);
    }
  }, [dataPersona, dataCobros]);

  if (loadingPersona || loadingCobros) {
    <LoaderComponent />;
  }

  if (errorPersona) {
    <ErrorComponent message={errorPersona?.message!} />;
  }

  if (errorCobros) {
    <ErrorComponent message={errorCobros?.message!} />;
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
