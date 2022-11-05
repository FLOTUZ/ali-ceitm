import ButtonIconComponent from "@/common/button-icon.component";
import DatatableComponent from "@/common/datatable.component";
import DrawerComponent from "@/common/drawer.component";
import LoaderComponent from "@/common/loader.component";
import DefaultLayout from "@/layouts/default-layout.component";
import {
  BecarioWithRelations,
  useGetAllBecariosQuery,
} from "gql/generated/graphql";
import {
  Box,
  Button,
  Container,
  DrawerHeader,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import { useState } from "react";
import { Persona } from "@prisma/client";
import { useRouter } from "next/router";
import Link from "next/link";
import NuevoBecarioForm from "./new";

function Becarios() {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
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
      <DefaultLayout>
        <ButtonIconComponent arialabel="open-drawer" onClick={onOpen}>
          <FiMenu size={40} />
        </ButtonIconComponent>
        <DrawerComponent
          title={"Administrador"}
          isOpen={isOpen}
          onClose={onClose}
        />

        <Heading as={"h1"} color="white" mb={"2rem"}>
          Becarios
        </Heading>

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
