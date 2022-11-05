import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import DefaultLayout from "@/layouts/default-layout.component";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Beca, Becario, Persona } from "@prisma/client";
import {
  BecarioWithRelations,
  useBecarioByIdWithRelationsQuery,
  useEditBecarioMutation,
  useNuevaBecaQuery,
} from "gql/generated/graphql";

const BecarioId = () => {
  const router = useRouter();
  const toast = useToast();
  const [becasList, setBecasList] = useState<Beca[]>([]);
  const [becario, setBecario] = useState<BecarioWithRelations | null>();

  const { becarioId } = router.query;

  const becas = useNuevaBecaQuery({
    onCompleted(data) {
      setBecasList(data.allBecas as Beca[]);
    },
  });

  const { data, loading, error } = useBecarioByIdWithRelationsQuery({
    variables: {
      id: Number(becarioId),
    },

    onCompleted(data) {
      setBecario(data.becarioByIdWithRelations);
    },
  });

  const [editBecario, { loading: loadingEditBecario }] = useEditBecarioMutation(
    {
      onCompleted(data) {
        if (data.updateBecario) {
          toast({
            title: "Becario editado",
            description: "El becario ha sido editado correctamente",
            status: "success",
          });
        }
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  const formBecario = useFormik({
    initialValues: {
      nombres: undefined,
      a_paterno: undefined,
      a_materno: undefined,
      n_control: undefined,
      telefono: undefined,
      whatsapp: undefined,
      turno: undefined,
      semana_cobro: undefined,
      puede_cobrar: undefined,
      en_lista_espera: undefined,
      becaId: undefined,
    },
    onSubmit: async (values) => {
      const newBecario = { id: Number(becarioId), ...values };

      const newPersona = { id: becario?.personaId, ...values };

      console.log({ newBecario, newPersona });

      await editBecario({
        variables: {
          idBecario: becario?.id!,
          idPersona: becario?.persona?.id!,
          becaId: newBecario.becaId!,
          nombres: newPersona.nombres!,
          a_paterno: newPersona.a_paterno!,
          a_materno: newPersona.a_materno!,
          n_control: newPersona.n_control!,
          telefono: newPersona.telefono!,
          whatsapp: newPersona.whatsapp!,
          turno: newBecario.turno!,
          semana_cobro: newBecario.semana_cobro!,
          puede_cobrar: newBecario.puede_cobrar!,
          en_lista_espera: newBecario.en_lista_espera!,
        },
      });
    },
  });

  if (loading) {
    return <LoaderComponent />;
  }

  if (data?.becarioByIdWithRelations == null) {
    return (
      <ErrorComponent
        message={`Not found - Becario ${becarioId} no encontrado`}
      />
    );
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <DefaultLayout>
      <Head>
        <title>
          Becario | {becario?.persona?.nombres!} {becario?.persona?.a_paterno!}{" "}
          {becario?.persona?.a_materno!}
        </title>
      </Head>
      <Heading as={"h1"} size="2xl" color={"white"}>
        Editar Becario
      </Heading>

      <Container color={"white"} mt={5}>
        <form onSubmit={formBecario.handleSubmit}>
          <FormLabel htmlFor="becaId">Beca del becario</FormLabel>
          <Select
            name="becaId"
            placeholder="Beca del becario"
            size="lg"
            defaultValue={becario?.beca?.id!}
            bgColor={"black"}
          >
            {becasList.map((beca: Beca) => {
              return (
                <option
                  key={beca.id}
                  style={{ backgroundColor: "black" }}
                  value={Number(beca.id)}
                >
                  {beca.nombre}
                </option>
              );
            })}
          </Select>

          <FormLabel htmlFor="nombres">Nombre</FormLabel>
          <Input
            type="text"
            name="nombres"
            placeholder="Nombres"
            defaultValue={becario?.persona?.nombres!}
            onChange={formBecario.handleChange}
          />

          <FormLabel htmlFor="a_paterno">Apellido Paterno</FormLabel>
          <Input
            type="text"
            name="a_paterno"
            placeholder="Apellido paterno"
            defaultValue={becario?.persona?.a_paterno!}
            onChange={formBecario.handleChange}
          />

          <FormLabel htmlFor="a_materno">Apellido Materno</FormLabel>
          <Input
            type="text"
            name="a_materno"
            placeholder="Apellido materno"
            defaultValue={becario?.persona?.a_materno!}
            onChange={formBecario.handleChange}
          />

          <FormLabel htmlFor="n_control">Numero de control</FormLabel>
          <Input
            type="text"
            name="n_control"
            placeholder="Numero de control"
            defaultValue={becario?.persona?.n_control!}
            onChange={formBecario.handleChange}
          />

          <FormLabel htmlFor="telefono">Telefono</FormLabel>
          <Input
            type="text"
            name="telefono"
            placeholder="Telefono"
            defaultValue={becario?.persona?.telefono!}
            onChange={formBecario.handleChange}
          />

          <FormLabel htmlFor="whatsapp">Whatsapp</FormLabel>
          <Input
            type="text"
            name="whatsapp"
            placeholder="Whatsapp"
            defaultValue={becario?.persona?.whatsapp!}
            onChange={formBecario.handleChange}
          />

          <FormLabel htmlFor="turno">Turno</FormLabel>
          <Select
            name="turno"
            placeholder="Seleccione turno"
            size="lg"
            defaultValue={becario?.turno!}
            bgColor={"black"}
          >
            <option style={{ backgroundColor: "black" }} value="DESAYUNO">
              DESAYUNO
            </option>
            <option style={{ backgroundColor: "black" }} value="COMIDA">
              COMIDA
            </option>
          </Select>

          <FormLabel htmlFor="semana">Semana de cobro</FormLabel>
          <Select
            name="semana"
            placeholder="Seleccione semana de cobro"
            size="lg"
            defaultValue={becario?.semana_cobro!}
            bgColor={"black"}
          >
            <option style={{ backgroundColor: "black" }} value="PAR">
              PAR
            </option>
            <option style={{ backgroundColor: "black" }} value="NON">
              NON
            </option>
          </Select>

          <SimpleGrid columns={[2, 2, 2]}>
            <Stack>
              <FormLabel htmlFor="en_lista_espera">
                En lista de espera
              </FormLabel>
              <Switch
                name="en_lista_espera"
                size={"lg"}
                defaultChecked={becario?.en_lista_espera!}
                onChange={formBecario.handleChange}
              />
            </Stack>
            <Stack>
              <FormLabel htmlFor="puede_cobrar">Puede cobrar</FormLabel>
              <Switch
                name="puede_cobrar"
                size={"lg"}
                defaultChecked={becario?.puede_cobrar!}
                onChange={formBecario.handleChange}
              />
            </Stack>
          </SimpleGrid>

          <Button
            w={"100%"}
            mt={8}
            colorScheme={"blue"}
            type="submit"
            isLoading={loading}
          >
            Actualizar
          </Button>
        </form>
      </Container>
    </DefaultLayout>
  );
};

export default BecarioId;
