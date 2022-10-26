import TextFieldComponent from "../text.field";

import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Center, Container, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { healthAction, loginAction } from "./auth.actions";
import { AuthContext } from "providers/auth.provider";
import { useContext } from "react";

function LoginForm() {
  const toast = useToast();
  const { user, logout, refetchUser } = useContext(AuthContext);

  
  const router = useRouter();


  const { handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("El correo es requerido").nullable(),
      password: Yup.string().required("La contraseña es requerida").nullable(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginAction(values.email!, values.password!);

        if (response.status === 200) {
          window.localStorage.setItem(
            "access-token",
            response.data["access-token"]
          );
          toast({
            title: "Inicio de sesión exitoso",
            description: "Bienvenido al sistema",
            status: "success",
            isClosable: true,
            duration: 7000,
          });
          await healthAction();
          router.push("/");
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <>
      <Center height={"100vh"}>
        <Container>
          <Heading>Inicio de sesión</Heading>
          <form onSubmit={handleSubmit} autoSave={"on"}>
            <TextFieldComponent
              name={"email"}
              type="email"
              label="Email"
              handleChange={handleChange}
              errors={errors.email}
              touched={touched.email}
            />

            <TextFieldComponent
              name={"password"}
              type="password"
              label="Password"
              handleChange={handleChange}
              errors={errors.password}
              touched={touched.password}
            />

            <Button
              mt={8}
              w={"100%"}
              h={"3rem"}
              type="submit"
              colorScheme={"blue"}
            >
              Iniciar sesión
            </Button>
          </form>
        </Container>
      </Center>
    </>
  );
}

export default LoginForm;
