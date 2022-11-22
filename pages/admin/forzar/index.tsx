import TextFieldComponent from "@/forms/text.field";
import DefaultLayout from "@/layouts/default-layout.component";
import {
  Button,
  Container,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useForzarCobroMutation } from "gql/generated/graphql";

function Forzar() {
  const toast = useToast();
  const [forzarCobro, { loading }] = useForzarCobroMutation({
    onCompleted(data) {
      toast({
        title: "Codigo forzado",
        description: data.forceCobroWithCode?.forma_cobro,
        colorScheme: "green",
      });
    },
    onError(error) {
      toast({
        title: "Codigo no encontrado",
        description: error.message,
        colorScheme: "red",
      });
    },
  });
  const formForzado = useFormik({
    initialValues: {
      codigo: "",
    },
    onSubmit: (values) => {
      forzarCobro({
        variables: {
          ...values,
        },
      });
    },
  });
  return (
    <DefaultLayout heading={"Forzar cobro"}>
      <Container>
        <form onSubmit={formForzado.handleSubmit}>
          <FormLabel htmlFor="codigo">
            Codigo de cobro del becario (Requerido)
          </FormLabel>
          <Input
            isRequired={true}
            name={"codigo"}
            type={"text"}
            onChange={formForzado.handleChange}
          ></Input>
          <Button
            mt={4}
            w={"100%"}
            colorScheme={"red"}
            type="submit"
            isLoading={loading}
          >
            Forzar cobro
          </Button>
        </form>
      </Container>
    </DefaultLayout>
  );
}

export default Forzar;
