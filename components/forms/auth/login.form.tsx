import TextField from "../text.field";

import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Center, Container, Heading } from "@chakra-ui/react";

function LoginForm() {
  const { handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("El usuario es requerido").nullable(),
      password: Yup.string().required("La contraseña es requerida").nullable(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Center height={"100vh"}>
        <Container>
          <Heading>Inicio de sesión</Heading>
          <form onSubmit={handleSubmit} autoSave={"on"}>
            <TextField
              name={"email"}
              type="email"
              label="Email"
              handleChange={handleChange}
              errors={errors.email}
              touched={touched.email}
            />

            <TextField
              name={"password"}
              type="password"
              label="Password"
              handleChange={handleChange}
              errors={errors.password}
              touched={touched.password}
            />

            <Button mt={8} w={"100%"} h={"3rem"} type="submit" colorScheme={"blue"} >
              Iniciar sesión
            </Button>
          </form>
        </Container>
      </Center>
    </>
  );
}

export default LoginForm;
