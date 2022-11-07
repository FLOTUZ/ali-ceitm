import TextFieldComponent from "@/forms/text.field";
import DefaultLayout from "@/layouts/default-layout.component";
import {
  Container,
  FormLabel,
  Switch,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Beca, useNewBecaMutation } from "gql/generated/graphql";
import { useRouter } from "next/router";

function NuevaBeca() {
  const toast = useToast();
  const router = useRouter();

  const [uploadBeca, { loading: loadingUpload }] = useNewBecaMutation({
    onCompleted(data) {
      toast({
        title: "Beca creada",
        description: "La beca se creó correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.back();
    },
    onError(error) {
      console.log(error);
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
      const beca = values as Beca;

      uploadBeca({
        variables: {
          nombre: beca.nombre!,
          descripcion: beca.descripcion!,
          inicia: beca.inicia,
          termina: beca.termina,
          is_active: beca.is_active!,
        },
      });
    },
  });
  return (
    <DefaultLayout heading="Editar Beca">
      <Container>
        <form onSubmit={formBeca.handleSubmit}>
          <TextFieldComponent
            name={"nombre"}
            isRequired={true}
            type={"text"}
            label={"Nombre"}
            handleChange={formBeca.handleChange}
          />

          <TextFieldComponent
            name={"descripcion"}
            type={"text"}
            isRequired={true}
            label={"Descripcion"}
            handleChange={formBeca.handleChange}
          />

          <TextFieldComponent
            name={"inicia"}
            type={"date"}
            isRequired={true}
            label={"Fecha de inicio"}
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
            isRequired={true}
            label={"Fecha de en que termina"}
            handleChange={(e) =>
              formBeca.setFieldValue(
                "termina",
                new Date(e.target.value).toISOString()
              )
            }
          />

          <FormLabel htmlFor="is_active">Activo</FormLabel>
          <Switch
            name={"is_active"}
            size={"lg"}
            onChange={formBeca.handleChange}
          />

          <Button
            w={"100%"}
            mt={4}
            colorScheme={"blue"}
            type={"submit"}
            isLoading={loadingUpload}
          >
            Enviar
          </Button>
        </form>
      </Container>
    </DefaultLayout>
  );
}

export default NuevaBeca;
