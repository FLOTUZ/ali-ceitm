import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import DefaultLayout from "@/layouts/default-layout.component";
import {
  Box,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Beca, useAllBecasQuery } from "gql/generated/graphql";
import { useState } from "react";
import moment from "moment";
import "moment/locale/es";

import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";

function Convocatorias() {
  moment.locale("es");
  const [allBecas, setAllBecas] = useState<Beca[]>([]);
  const { loading, error } = useAllBecasQuery({
    onCompleted(data) {
      setAllBecas(data.allBecas as Beca[]);
    },
  });

  if (loading) return <LoaderComponent />;
  if (error) return <ErrorComponent message={error.message} />;

  return (
    <DefaultLayout showMenu={false} heading="Convocatorias">
      <SimpleGrid columns={[1, 2, 4]} spacing={5}>
        {allBecas.map((beca, index) => (
          <Link href={`/convocatorias/${beca.id}`} key={index}>
            <a>
              <Box
                p={4}
                boxShadow={"sm"}
                border={"1px"}
                borderRadius={"0.5rem"}
                borderColor={"gray.200"}
                _hover={{
                  color: "white",
                  bgColor: "black",
                  boxShadow: "xl",
                }}
              >
                <Box h={200}>
                  <Box
                    p={3}
                    borderRadius={"0.5rem"}
                    bgColor={beca.is_active ? "green.500" : "red.500"}
                    fontSize={"sm"}
                  >
                    <Box bgColor={"white"} borderRadius={"0.5rem"} p={2}>
                      <Text color={"black"}>
                        {beca.is_active
                          ? `Abierta hasta el ${moment(beca.termina).format(
                              "LL"
                            )}`
                          : `Finalizada el ${moment(beca.termina).format(
                              "LL"
                            )}`}
                      </Text>
                    </Box>
                  </Box>
                  <Text mt={4} fontWeight={"bold"}>
                    {beca.nombre}
                  </Text>
                  <Text mt={2}>
                    {beca.descripcion?.length! > 50
                      ? beca.descripcion?.slice(0, 50) + "..."
                      : beca.descripcion}
                  </Text>
                </Box>

                <HStack w={"100%"} placeContent="center">
                  <Text>Ver detalles</Text>
                  <BsChevronRight size={25} />
                </HStack>
              </Box>
            </a>
          </Link>
        ))}
      </SimpleGrid>
    </DefaultLayout>
  );
}

export default Convocatorias;
