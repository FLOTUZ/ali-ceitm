import DatatableComponent from "@/common/datatable.component";
import LoaderComponent from "@/common/loader.component";
import DefaultLayout from "@/layouts/default-layout.component";
import {
  BecarioWithRelations,
  useGetAllBecariosQuery,
} from "gql/generated/graphql";
import {
  Box,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import { Persona } from "@prisma/client";
import { useRouter } from "next/router";
import NuevoBecarioForm from "./new";

function Becarios() {
  const toast = useToast();
  const router = useRouter();
  const {
    isOpen: isOpenModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure();

  const [becariosList, setBecariosList] = useState<[]>([]);

  const { loading } = useGetAllBecariosQuery({
    onCompleted: (data) => {
      if (data.allBecariosWithRelations != null) {
        const becarios = data.allBecariosWithRelations.map(
          (becario: BecarioWithRelations | null) => {
            const persona = becario?.persona as Persona;
            return {
              id: becario?.id,
              nombre: persona?.nombres,
              apellido_paterno: persona?.a_paterno,
              apellido_materno: persona?.a_materno,
              n_control: persona.n_control,
              telefono: persona.telefono,
              whatsapp: persona.whatsapp,
              en_lista_espera: becario?.en_lista_espera,
              puede_cobrar: becario?.puede_cobrar,
              turno: becario?.turno,
              semana_cobro: becario?.semana_cobro,
              createdAt: becario?.createdAt,
              updatedAt: becario?.updatedAt,
            };
          }
        );
        setBecariosList(becarios as []);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al recuperar becarios: ${error.message}`,
        colorScheme: "red",
      });
    },
  });

  if (loading) {
    <LoaderComponent />;
  }

  return (
    <>
      <DefaultLayout heading="Becarios" drawerTitle="Administrador">

        <Button colorScheme={"blue"} onClick={onOpenModal}>
          Agregar becario
        </Button>

        <Box mt={8} w={"100%"}>
          <DatatableComponent
            data={becariosList}
            onRowClicked={(row) => {
              router.push(`/admin/becarios/${row.id}`);
            }}
          />
        </Box>
      </DefaultLayout>

      <NuevoBecarioForm isOpenModal={isOpenModal} onCloseModal={onCloseModal} />
    </>
  );
}

export default Becarios;
