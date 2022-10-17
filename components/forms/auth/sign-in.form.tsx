import {
  Button,
  Center,
  CircularProgress,
  Container,
  Heading,
  Toast,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useFormik } from "formik";

import SelectComponent from "../select.component";
import TextField from "../text.field";
import { SignupSchema } from "./auth.validators";

import { useMutation, useQuery } from "@apollo/client";
import { Carrera, Persona, User } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  GET_CARRERAS_ACTION,
  REGISTRO_PERSONA_ACTION,
  REGISTRO_USUARIO_ACTION,
} from "./auth.actions";
import { useRouter } from "next/router";

function SignInForm() {
  const {
    loading: loadingCarreras,
    error: errorCarreras,
    data: dataCarreras,
  } = useQuery(GET_CARRERAS_ACTION);

  const [
    createUser,
    { data: dataUser, loading: loadingUser, error: errorUser },
  ] = useMutation(REGISTRO_USUARIO_ACTION);

  const [
    createPersona,
    { data: dataPersona, loading: loadingPersona, error: errorPersona },
  ] = useMutation(REGISTRO_PERSONA_ACTION);

  const toast = useToast();
  const router = useRouter();

  const [carrerasList, setCarrerasList] = useState<Carrera[]>([]);

  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    validationSchema: SignupSchema,
    initialValues: {
      username: null,
      password: null,
      email: null,
      nombres: null,
      a_paterno: null,
      a_materno: null,
      n_control: null,
      telefono: null,
      whatsapp: null,
      email_institucional: null,
      campus: null,
      carreraId: null,
    },
    onSubmit: async (values: any) => {
      const user = values as User;
      const persona = values as Persona;

      const { data: resultUser } = await createUser({
        variables: {
          ...user,
        },
      });

      const { data: resultPersona } = await createPersona({
        variables: {
          ...persona,
          userId: resultUser?.createUser?.id,
        },
      });
      toast({
        title: "Usuario creado",
        description: "Se ha creado el usuario correctamente",
        status: "success",
        isClosable: true,
        duration: 7000,
        position: "top-right",
      });

      router.push("/auth/login");
    },
  });

  useEffect(() => {
    if (dataCarreras) {
      setCarrerasList(dataCarreras.allCarreras);
    }
  }, [dataCarreras]);

  if (loadingCarreras) {
    return (
      <Center h={"100vh"}>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (errorCarreras) {
    return <div>Error: ${errorCarreras.message}</div>;
  }

  return (
    <Container>
      <Head>
        <title>Registro de usuario | CEITM</title>
      </Head>

      <Heading mb={8} mt={8}>
        Registro de usuario
      </Heading>

      <form onSubmit={handleSubmit} autoSave={"on"}>
        <TextField
          name={"username"}
          type="text"
          label="Usuario (Requerido)"
          handleChange={handleChange}
          errors={errors.username}
          touched={touched.username}
        />

        <TextField
          name={"email"}
          type="text"
          label="Email Personal (Requerido)"
          handleChange={handleChange}
          errors={errors.email}
          touched={touched.email}
        />

        <TextField
          name={"password"}
          type="password"
          label="Contraseña (Requerido)"
          handleChange={handleChange}
          errors={errors.password}
          touched={touched.password}
        />

        <TextField
          name={"nombres"}
          type="text"
          label="Nombre (s) (Requerido)"
          handleChange={handleChange}
          errors={errors.nombres}
          touched={touched.nombres}
        />

        <TextField
          name={"a_paterno"}
          type="text"
          label="Apellido Paterno (Requerido)"
          handleChange={handleChange}
          errors={errors.a_paterno}
          touched={touched.a_paterno}
        />

        <TextField
          name={"a_materno"}
          type="text"
          label="Apellido Materno (Requerido)"
          handleChange={handleChange}
          errors={errors.a_paterno}
          touched={touched.a_materno}
        />

        <TextField
          name={"n_control"}
          type="text"
          label="Numero de control (Requerido)"
          handleChange={handleChange}
          errors={errors.n_control}
          touched={touched.n_control}
        />

        <TextField
          name={"telefono"}
          type="tel"
          label="Telefono (Requerido)"
          handleChange={handleChange}
          errors={errors.telefono}
          touched={touched.telefono}
        />

        <TextField
          name={"whatsapp"}
          type="tel"
          label="Whatsapp (Requerido)"
          handleChange={handleChange}
          errors={errors.whatsapp}
          touched={touched.whatsapp}
        />

        <TextField
          name={"email_institucional"}
          type="email"
          label="Email Institucional (Requerido)"
          handleChange={handleChange}
          errors={errors.email_institucional}
          touched={touched.email}
        />

        <SelectComponent
          name={"campus"}
          label={"Campus (Requerido)"}
          placeholder={"Selecciona campus"}
          touched={touched.campus}
          errors={errors.campus}
          handleChange={(e) =>
            setFieldValue("campus", parseInt(e.target.value))
          }
        >
          <option value={1}>Campus 1</option>
          <option value={2}>Campus 2</option>
        </SelectComponent>

        <SelectComponent
          name={"carreraId"}
          label={"Carerra (Requerido)"}
          placeholder={"Selecciona carrera"}
          touched={touched.carreraId}
          errors={errors.carreraId}
          handleChange={(e) =>
            setFieldValue("carreraId", parseInt(e.target.value))
          }
        >
          {carrerasList.map((carrera) => (
            <option key={carrera.id} value={carrera.id}>
              {carrera.nombre}
            </option>
          ))}
        </SelectComponent>

        <Center mt={8} mb={8}>
          <Button
            type="submit"
            w={"100%"}
            height={"3rem"}
            bgColor="black"
            color={"white"}
            _hover={{ bgColor: "blueviolet" }}
          >
            {isSubmitting ? "Loading..." : "Registrar"}
          </Button>
        </Center>
      </form>
    </Container>
  );
}

export default SignInForm;
