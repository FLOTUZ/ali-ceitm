import SelectComponent from "@/forms/select.component";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  FormLabel,
  Box,
  Switch,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Beca, Persona } from "@prisma/client";
import { useFormik } from "formik";
import {
  NuevaBecaQuery,
  useNuevaBecaLazyQuery,
  useNuevaBecaQuery,
  useNuevoBecarioMutation,
} from "gql/generated/graphql";
import { useState } from "react";

interface NuevoBecarioFormProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
}
const NuevoBecarioForm = ({
  isOpenModal,
  onCloseModal,
}: NuevoBecarioFormProps) => {
  const toast = useToast();
  const [becasList, setBecasList] = useState<Beca[]>([]);
  const [personasList, setPersonasList] = useState<Persona[]>([]);

  const { loading, error, refetch } = useNuevaBecaQuery({
    onCompleted(data) {
      setBecasList(data.allBecas as Beca[]);
      setPersonasList(data.allPersonas as Persona[]);
    },
  });

  const [addBecario, { loading: loadingAddBecario }] = useNuevoBecarioMutation({
    onCompleted: (data) => {
      if (data) {
        toast({
          title: "Becario creado",
          description: "Se ha creado el becario correctamente",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        refetch();
        onCloseModal();
      }
    },
    onError: (error) => {
      toast({
        title: "Error al crear becario",
        description: `Es posible que el becario ya exista ${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const nuevoBecario = useFormik({
    initialValues: {
      becaId: 0,
      personaId: 0,
      turno: "",
      semana_cobro: "",
      en_lista_espera: false,
      puede_cobrar: false,
    },
    onSubmit: async (values) => {
      await addBecario({
        variables: {
          becaId: values.becaId,
          personaId: values.personaId,
          turno: values.turno,
          semana_cobro: values.semana_cobro,
          en_lista_espera: values.en_lista_espera,
          puede_cobrar: values.puede_cobrar,
        },
      });
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <Modal size={"xl"} isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={nuevoBecario.handleSubmit}>
          <ModalBody>
            <SelectComponent
              name={"becaId"}
              label={"Becas"}
              placeholder={"Seleccione"}
              handleChange={(e) =>
                nuevoBecario.setFieldValue("becaId", Number(e.target.value))
              }
            >
              {becasList.map((beca: Beca) => {
                return (
                  <option value={Number(beca.id)} key={beca.id}>
                    {beca.nombre}
                  </option>
                );
              })}
            </SelectComponent>

            <SelectComponent
              name={"personaId"}
              label={"Persona"}
              placeholder={"Seleccione"}
              handleChange={(e) =>
                nuevoBecario.setFieldValue("personaId", Number(e.target.value))
              }
            >
              {personasList.map((persona: Persona) => {
                return (
                  <option value={Number(persona.id)} key={persona.id}>
                    {persona.nombres} {persona.a_paterno} {persona.a_materno}
                  </option>
                );
              })}
            </SelectComponent>

            <SelectComponent
              name={"turno"}
              label={"Turno de cobro"}
              placeholder={"Seleccione"}
              handleChange={nuevoBecario.handleChange}
            >
              <option value="DESAYUNO">DESAYUNO</option>
              <option value="COMIDA">COMIDA</option>
            </SelectComponent>

            <Box height={4} />

            <SelectComponent
              name={"semana_cobro"}
              label={"Semana de cobro"}
              placeholder={"Seleccione"}
              handleChange={nuevoBecario.handleChange}
            >
              <option value="PAR">PAR</option>
              <option value="NON">NON</option>
            </SelectComponent>

            <Box height={4} />

            <SimpleGrid columns={[2, 2, 2]}>
              <Stack>
                <FormLabel htmlFor="en_lista_espera">
                  En lista de espera
                </FormLabel>
                <Switch
                  name="en_lista_espera"
                  size={"lg"}
                  onChange={nuevoBecario.handleChange}
                />
              </Stack>
              <Stack>
                <FormLabel htmlFor="puede_cobrar">Puede cobrar</FormLabel>
                <Switch
                  name="puede_cobrar"
                  size={"lg"}
                  onChange={nuevoBecario.handleChange}
                />
              </Stack>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button w={"100%"} mr={3} onClick={onCloseModal}>
              Cerrar
            </Button>
            <Button
              type="submit"
              w={"100%"}
              colorScheme={"blue"}
              isLoading={loadingAddBecario}
            >
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default NuevoBecarioForm;
