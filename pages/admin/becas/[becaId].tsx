import moment from "moment";
import ErrorComponent from "@/common/error.component";
import LoaderComponent from "@/common/loader.component";
import DefaultLayout from "@/layouts/default-layout.component";
import TextFieldComponent from "@/forms/text.field";
import DatatableComponent from "@/common/datatable.component";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import {
  Beca,
  Persona,
  useBecaByIdLazyQuery,
  useUpdateBecaMutation,
} from "gql/generated/graphql";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";

function EditarBeca() {
  const router = useRouter();
  const toast = useToast();

  const { becaId } = router.query;
  const [beca, setBeca] = useState<Beca | null>();
  const [personasList, setPersonasList] = useState<Persona[]>([]);

  const [getBeca, { loading: loadingBeca, error: errorFetchBeca }] =
    useBecaByIdLazyQuery({
      onCompleted(data) {
        setBeca(data.becaById as Beca);
        setPersonasList(data.personasByBeca as Persona[]);
      },
    });

  const [updateBeca, { loading: loadingUpdate }] = useUpdateBecaMutation({
    onCompleted(data) {
      toast({
        title: "Beca actualizada",
        description: "La beca se actualizó correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.back();
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const formBeca = useFormik({
    initialValues: {
      nombre: undefined,
      descripcion: undefined,
      inicia: undefined,
      termina: undefined,
      is_active: undefined,
    },
    onSubmit: (values) => {
      const data = values as Beca;

      updateBeca({
        variables: {
          id: beca?.id!,
          nombre: data.nombre,
          descripcion: data.descripcion,
          inicia: data.inicia,
          termina: data.termina,
          is_active: data.is_active,
        },
      });
    },
  });

  useEffect(() => {
    getBeca({
      variables: {
        id: Number(becaId),
      },
    });
  }, [becaId, getBeca]);

  if (errorFetchBeca)
    return <ErrorComponent message={errorFetchBeca.message} />;

  if (!beca) return <ErrorComponent message="Beca no encontrada" />;

  if (loadingBeca) return <LoaderComponent />;

  return (
    <DefaultLayout heading="Editar Beca">
      <Container>
        <form onSubmit={formBeca.handleSubmit}>
          <TextFieldComponent
            name={"nombre"}
            type={"text"}
            label={"Nombre"}
            defaultValue={beca.nombre!}
            handleChange={formBeca.handleChange}
          />

          <TextFieldComponent
            name={"inicia"}
            type={"date"}
            label={"Inicia"}
            defaultValue={moment.utc(beca.inicia).format("YYYY-MM-DD")}
            handleChange={(e) =>
              formBeca.setFieldValue(
                "inicia",
                new Date(e.target.value).toISOString()
              )
            }
          />
          <TextFieldComponent
            name={"termina"}
            type={"date"}
            label={"Termina"}
            defaultValue={
              beca.termina ? moment.utc(beca.termina).format("YYYY-MM-DD") : ""
            }
            handleChange={(e) =>
              formBeca.setFieldValue(
                "termina",
                new Date(e.target.value).toISOString()
              )
            }
          />

          <TextFieldComponent
            name={"descripcion"}
            type={"text"}
            label={"Descripcion"}
            defaultValue={beca.descripcion!}
            handleChange={formBeca.handleChange}
          />

          <FormLabel htmlFor="is_active">Activo</FormLabel>
          <Switch
            name={"is_active"}
            size={"lg"}
            defaultChecked={beca.is_active!}
            onChange={formBeca.handleChange}
          />

          <Button
            w={"100%"}
            mt={4}
            colorScheme={"blue"}
            type={"submit"}
            isLoading={loadingUpdate}
          >
            Enviar
          </Button>
        </form>
        <Text mt={4}>
          Creada el:{" "}
          {moment(beca.createdAt).format("DD-MM-YYYY [a las] HH:mm [hrs]")}
        </Text>

        <Text mt={4}>
          Actualizada en:{" "}
          {moment(beca.updatedAt).format("DD-MM-YYYY [a las] HH:mm [hrs]")}
        </Text>
      </Container>
      <Box>
        <Heading as="h3" size="lg" mt={4}>
          Becarios
        </Heading>
        <DatatableComponent
          data={personasList!}
          onRowClicked={(row: Persona) => {
            row.becarios?.map((becario) => {
              router.push(`/admin/becarios/${becario?.id}`);
            });
          }}
        />
      </Box>
    </DefaultLayout>
  );
}

export default EditarBeca;
