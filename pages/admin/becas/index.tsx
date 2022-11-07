import DatatableComponent from "@/common/datatable.component";
import DefaultLayout from "@/layouts/default-layout.component";
import router from "next/router";
import { Badge, Box, SimpleGrid, Spacer } from "@chakra-ui/react";
import { useAllBecasQuery } from "gql/generated/graphql";
import { useState } from "react";
import LoaderComponent from "@/common/loader.component";
import ErrorComponent from "@/common/error.component";
import ButtonIconComponent from "@/common/button-icon.component";
import { FiGrid, FiList } from "react-icons/fi";
import { Beca } from "@prisma/client";

function Becas() {
  const [becasList, setBecasList] = useState<Beca[]>([]);
  const [toggleView, settoggleView] = useState<Boolean>(true);
  const { loading, error } = useAllBecasQuery({
    onCompleted: (data) => {
      setBecasList(data.allBecas as Beca[]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (loading) return <LoaderComponent />;
  if (error) return <ErrorComponent message={error.message} />;

  return (
    <DefaultLayout drawerTitle="Admin" heading="Becas">
      <ButtonIconComponent
        arialabel={"toggle"}
        onClick={() => {
          settoggleView(!toggleView);
        }}
      >
        {toggleView ? <FiGrid /> : <FiList />}
      </ButtonIconComponent>
      {toggleView ? (
        <Box mt={8} w={"100%"}>
          <DatatableComponent
            data={becasList}
            onRowClicked={(row) => {
              router.push(`/admin/becas/${row.id}`);
            }}
          />
        </Box>
      ) : (
        <Box mt={8} w={"100%"}>
          <SimpleGrid columns={[1, 3, 5]}>
            {becasList?.map((beca, index) => (
              <Box
                key={index}
                onClick={() => {
                  router.push(`/admin/becas/${beca.id}`);
                }}
                p={4}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                cursor="pointer"
                _hover={{
                  color: "black",
                  bg: "gray.100",
                  shadow: "md",
                }}
              >
                <Box fontWeight={"bold"}>{beca.nombre}</Box>
                <Badge colorScheme={beca.is_active ? "green" : "red"}>
                  {beca.is_active ? "Activa" : "Inactiva"}
                </Badge>

                <Box>{beca.descripcion}</Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </DefaultLayout>
  );
}

export default Becas;
